import React, { useState, useEffect, useCallback } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
  TouchableOpacity,
  RefreshControl,
} from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import { EnhancedWalletCard } from '../components/EnhancedWalletCard';
import { LocationChip } from '../components/LocationChip';
import { IOSButton } from '../components/IOSButton';
import { Card } from '../types/card';
import { mockCards } from '../data/mockCards';
import { storage } from '../utils/storage';
import { useLocation } from '../hooks/useLocation';
import { colors, shadows } from '../theme/colors';
import { typography, spacing, borderRadius } from '../theme/typography';

interface WalletProps {
  navigation: any;
}

export const Wallet: React.FC<WalletProps> = ({ navigation }) => {
  const [cards, setCards] = useState<Card[]>([]);
  const [refreshing, setRefreshing] = useState(false);
  const { location } = useLocation();

  const loadCards = async () => {
    const storedCards = await storage.getCards();
    if (storedCards.length > 0) {
      setCards(storedCards);
    } else {
      // Initialize with mock data
      await storage.saveCards(mockCards);
      setCards(mockCards);
    }
  };

  useFocusEffect(
    useCallback(() => {
      loadCards();
    }, [])
  );

  const onRefresh = async () => {
    setRefreshing(true);
    await loadCards();
    setRefreshing(false);
  };

  const handleCardPress = (card: Card) => {
    navigation.navigate('CardDetail', { card });
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <Text style={styles.title}>Wallet</Text>
          <View style={styles.headerIcons}>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('Notifications')}
            >
              <Text style={styles.iconText}>🔔</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.iconButton}
              onPress={() => navigation.navigate('Settings')}
            >
              <Text style={styles.iconText}>⚙️</Text>
            </TouchableOpacity>
          </View>
        </View>

        <LocationChip
          location={location ? `${location.city || 'Unknown'}, ${location.state || ''}` : 'Getting location...'}
          isLive={!!location}
        />
      </View>

      {/* Cards */}
      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      >
        {cards.length === 0 ? (
          <View style={styles.emptyState}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>➕</Text>
            </View>
            <Text style={styles.emptyTitle}>No cards yet</Text>
            <Text style={styles.emptyDescription}>
              Add your first card to start tracking rewards and getting smart recommendations
            </Text>
            <IOSButton
              variant="primary"
              onPress={() => navigation.navigate('AddCard')}
            >
              ➕ Add Your First Card
            </IOSButton>
          </View>
        ) : (
          <View style={styles.cardsContainer}>
            <View
              style={[
                styles.cardStack,
                { height: (cards.length - 1) * 32 + 260 },
              ]}
            >
              {cards.map((card, index) => (
                <View
                  key={card.id}
                  style={[styles.cardWrapper, { zIndex: cards.length - index }]}
                >
                  <EnhancedWalletCard
                    card={card}
                    index={index}
                    totalCards={cards.length}
                    onPress={() => handleCardPress(card)}
                  />
                </View>
              ))}
            </View>

            {/* Add Card Button */}
            <View style={styles.addButtonContainer}>
              <TouchableOpacity
                style={styles.addButton}
                onPress={() => navigation.navigate('AddCard')}
                activeOpacity={0.8}
              >
                <Text style={styles.addButtonText}>➕</Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  header: {
    paddingHorizontal: spacing.lg,
    paddingTop: spacing.md,
    paddingBottom: spacing.lg,
    gap: spacing.md,
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  title: {
    ...typography.title1,
    fontWeight: '700',
  },
  headerIcons: {
    flexDirection: 'row',
    gap: spacing.sm,
  },
  iconButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.light.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  scrollView: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: spacing.lg,
    paddingBottom: 100,
  },
  emptyState: {
    alignItems: 'center',
    paddingVertical: spacing['3xl'],
    backgroundColor: colors.light.secondary,
    borderRadius: borderRadius['3xl'],
    padding: spacing['2xl'],
    marginTop: spacing.lg,
  },
  emptyIcon: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: `${colors.light.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: spacing.lg,
  },
  emptyIconText: {
    fontSize: 40,
  },
  emptyTitle: {
    ...typography.title3,
    fontWeight: '700',
    marginBottom: spacing.sm,
  },
  emptyDescription: {
    ...typography.subhead,
    color: colors.light.mutedForeground,
    textAlign: 'center',
    marginBottom: spacing.lg,
    maxWidth: 300,
  },
  cardsContainer: {
    alignItems: 'center',
    paddingTop: spacing.lg,
  },
  cardStack: {
    width: '100%',
    position: 'relative',
  },
  cardWrapper: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    alignItems: 'center',
  },
  addButtonContainer: {
    marginTop: spacing['2xl'],
    alignItems: 'center',
  },
  addButton: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
    ...shadows.large,
  },
  addButtonText: {
    fontSize: 28,
  },
});

