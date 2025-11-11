import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { BlurView } from 'expo-blur';
import { LocationChip } from '../components/LocationChip';
import { useLocation } from '../hooks/useLocation';
import { useNearbyPlaces } from '../hooks/useNearbyPlaces';
import { storage } from '../utils/storage';
import { Card } from '../types/card';
import { colors, shadows } from '../theme/colors';
import { typography, spacing, borderRadius } from '../theme/typography';

interface MapProps {
  navigation: any;
}

export const Map: React.FC<MapProps> = ({ navigation }) => {
  const { location } = useLocation();
  const [userCards, setUserCards] = useState<Card[]>([]);
  const [refreshing, setRefreshing] = useState(false);

  // Load user's cards
  const loadCards = async () => {
    const cards = await storage.getCards();
    setUserCards(cards);
  };

  useFocusEffect(
    useCallback(() => {
      loadCards();
    }, [])
  );

  // Fetch nearby places with reward recommendations
  const { places, loading, error, refresh } = useNearbyPlaces(
    location?.latitude || null,
    location?.longitude || null,
    userCards,
    500 // 500 meter radius
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await Promise.all([loadCards(), refresh()]);
    setRefreshing(false);
  };

  // Get the closest/best place
  const topPlace = places.length > 0 ? places[0] : null;

  return (
    <SafeAreaView style={styles.container}>
      {/* Mock Map Background */}
      <View style={styles.mapBackground}>
        {/* User Location Marker */}
        <View style={styles.userMarker}>
          <View style={styles.userMarkerInner}>
            <Text style={styles.navigationIcon}>📍</Text>
          </View>
          <View style={styles.pulseRing} />
        </View>

        {/* Merchant Markers - show first 5 places */}
        {places.slice(0, 5).map((place, index) => {
          const positions = [
            { top: '30%', left: '25%' },
            { top: '50%', right: '30%' },
            { bottom: '35%', left: '50%' },
            { top: '40%', left: '60%' },
            { bottom: '45%', right: '25%' },
          ];
          const position = positions[index] || positions[0];
          
          return (
            <View key={place.placeId} style={[styles.merchantMarker, position]}>
              <Text style={styles.markerIcon}>📍</Text>
            </View>
          );
        })}
      </View>

      {/* Header */}
      <View style={styles.header}>
        {location ? (
          <LocationChip
            location={`${location.city || 'Unknown'}, ${location.state || ''}`}
            isLive={true}
          />
        ) : (
          <LocationChip location="Getting location..." isLive={false} />
        )}
      </View>

      {/* Loading State */}
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color={colors.light.primary} />
        </View>
      )}

      {/* Top Place Card */}
      {topPlace && topPlace.bestCard && (
        <View style={styles.merchantCardContainer}>
          <BlurView intensity={80} tint="light" style={styles.merchantCard}>
            <View style={styles.merchantIcon}>
              <Text style={styles.merchantEmoji}>
                {getCategoryEmoji(topPlace.categories[0])}
              </Text>
            </View>
            <View style={styles.merchantInfo}>
              <Text style={styles.merchantName}>{topPlace.name}</Text>
              <Text style={styles.merchantRecommendation}>
                Use <Text style={styles.cardName}>{topPlace.bestCard.card.cardName}</Text> •{' '}
                {topPlace.bestCard.rewardRate}% cashback
              </Text>
              {topPlace.bestCard.rewardText && (
                <Text style={styles.rewardDetails}>{topPlace.bestCard.rewardText}</Text>
              )}
            </View>
          </BlurView>
        </View>
      )}

      {/* Places List */}
      <View style={styles.placesListContainer}>
        <ScrollView
          style={styles.placesList}
          showsVerticalScrollIndicator={false}
          refreshControl={
            <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
          }
        >
          {places.length === 0 && !loading && (
            <View style={styles.emptyState}>
              <Text style={styles.emptyText}>
                {location
                  ? 'No nearby places found'
                  : 'Enable location to see nearby places'}
              </Text>
            </View>
          )}

          {places.map((place) => (
            <TouchableOpacity
              key={place.placeId}
              style={styles.placeCard}
              activeOpacity={0.7}
            >
              <View style={styles.placeIconContainer}>
                <Text style={styles.placeEmoji}>
                  {getCategoryEmoji(place.categories[0])}
                </Text>
              </View>
              <View style={styles.placeContent}>
                <Text style={styles.placeName}>{place.name}</Text>
                <Text style={styles.placeAddress} numberOfLines={1}>
                  {place.formattedAddress}
                </Text>
                {place.bestCard && (
                  <Text style={styles.placeReward}>
                    💳 {place.bestCard.card.cardName} • {place.bestCard.rewardRate}%
                  </Text>
                )}
              </View>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Settings FAB */}
      <TouchableOpacity
        style={styles.settingsFAB}
        onPress={() => navigation.navigate('Settings')}
      >
        <Text style={styles.settingsIcon}>⚙️</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

// Helper function to get emoji for category
function getCategoryEmoji(category?: string): string {
  if (!category) return '🏪';
  
  const categoryLower = category.toLowerCase();
  if (categoryLower.includes('restaurant') || categoryLower.includes('food')) return '🍽️';
  if (categoryLower.includes('gas')) return '⛽';
  if (categoryLower.includes('grocery')) return '🛒';
  if (categoryLower.includes('target')) return '🎯';
  if (categoryLower.includes('coffee') || categoryLower.includes('starbucks')) return '☕';
  if (categoryLower.includes('hotel')) return '🏨';
  if (categoryLower.includes('travel')) return '✈️';
  if (categoryLower.includes('transit')) return '🚇';
  if (categoryLower.includes('shopping')) return '🛍️';
  if (categoryLower.includes('drugstore') || categoryLower.includes('pharmacy')) return '💊';
  return '🏪';
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  mapBackground: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: '#E8F4F8',
    justifyContent: 'center',
    alignItems: 'center',
  },
  userMarker: {
    width: 60,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userMarkerInner: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.light.primary,
    borderWidth: 4,
    borderColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.large,
    zIndex: 2,
  },
  navigationIcon: {
    fontSize: 24,
  },
  pulseRing: {
    ...StyleSheet.absoluteFillObject,
    borderRadius: 30,
    backgroundColor: `${colors.light.primary}30`,
  },
  merchantMarker: {
    position: 'absolute',
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.medium,
  },
  markerIcon: {
    fontSize: 20,
  },
  header: {
    position: 'absolute',
    top: 60,
    left: spacing.lg,
    right: spacing.lg,
    zIndex: 10,
  },
  loadingContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -20 }, { translateY: -20 }],
    zIndex: 5,
  },
  merchantCardContainer: {
    position: 'absolute',
    bottom: 280,
    left: spacing.lg,
    right: spacing.lg,
    zIndex: 10,
  },
  merchantCard: {
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.md,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    overflow: 'hidden',
    ...shadows.large,
  },
  merchantIcon: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.light.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  merchantEmoji: {
    fontSize: 24,
  },
  merchantInfo: {
    flex: 1,
  },
  merchantName: {
    ...typography.headline,
    fontWeight: '700',
    marginBottom: 2,
  },
  merchantRecommendation: {
    ...typography.subhead,
    color: colors.light.mutedForeground,
  },
  cardName: {
    fontWeight: '600',
    color: colors.light.foreground,
  },
  rewardDetails: {
    ...typography.caption1,
    color: colors.light.mutedForeground,
    marginTop: 2,
  },
  placesListContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: 240,
    zIndex: 10,
  },
  placesList: {
    flex: 1,
    backgroundColor: colors.light.background,
    borderTopLeftRadius: borderRadius['2xl'],
    borderTopRightRadius: borderRadius['2xl'],
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.lg,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing['2xl'],
  },
  emptyText: {
    ...typography.subhead,
    color: colors.light.mutedForeground,
  },
  placeCard: {
    flexDirection: 'row',
    backgroundColor: colors.light.secondary,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  placeIconContainer: {
    width: 48,
    height: 48,
    borderRadius: borderRadius.md,
    backgroundColor: colors.light.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  placeEmoji: {
    fontSize: 24,
  },
  placeContent: {
    flex: 1,
  },
  placeName: {
    ...typography.headline,
    fontWeight: '600',
    marginBottom: 2,
  },
  placeAddress: {
    ...typography.caption1,
    color: colors.light.mutedForeground,
    marginBottom: 4,
  },
  placeReward: {
    ...typography.subhead,
    color: colors.light.primary,
    fontWeight: '600',
  },
  settingsFAB: {
    position: 'absolute',
    top: 60,
    right: spacing.lg,
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.large,
    zIndex: 10,
  },
  settingsIcon: {
    fontSize: 24,
  },
});

