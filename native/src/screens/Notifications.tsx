import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { mockCards } from '../data/mockCards';
import { NotificationData } from '../types/card';
import { colors } from '../theme/colors';
import { typography, spacing, borderRadius } from '../theme/typography';

interface NotificationsProps {
  navigation: any;
}

const mockNotifications: NotificationData[] = [
  {
    id: '1',
    merchantName: 'Whole Foods Market',
    suggestedCard: mockCards[0],
    reason: 'Your Chase Freedom Unlimited offers 5% cashback on groceries this quarter',
    timestamp: new Date(Date.now() - 1000 * 60 * 15),
    location: { lat: 37.7749, lng: -122.4194 },
  },
  {
    id: '2',
    merchantName: 'Shell Gas Station',
    suggestedCard: mockCards[1],
    reason: 'American Express Gold gives 3% back on gas purchases',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 2),
    location: { lat: 37.7849, lng: -122.4094 },
  },
  {
    id: '3',
    merchantName: 'Target',
    suggestedCard: mockCards[2],
    reason: 'Discover it matches all cashback in your first year',
    timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24),
    location: { lat: 37.7649, lng: -122.4294 },
  },
];

export const Notifications: React.FC<NotificationsProps> = ({ navigation }) => {
  const formatTimestamp = (timestamp: Date) => {
    const now = Date.now();
    const diff = now - timestamp.getTime();
    const minutes = Math.floor(diff / 60000);
    const hours = Math.floor(diff / 3600000);
    const days = Math.floor(diff / 86400000);

    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    return `${days}d ago`;
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        <View style={styles.headerInfo}>
          <Text style={styles.countText}>
            🔔 {mockNotifications.length} recent alerts
          </Text>
        </View>

        {mockNotifications.map((notification) => (
          <TouchableOpacity
            key={notification.id}
            style={styles.notificationCard}
            onPress={() => navigation.navigate('Map')}
            activeOpacity={0.7}
          >
            <View style={styles.cardHeader}>
              <View style={styles.merchantBadge}>
                <Text style={styles.merchantIcon}>🏪</Text>
              </View>
              <Text style={styles.timestamp}>
                {formatTimestamp(notification.timestamp)}
              </Text>
            </View>

            <Text style={styles.merchantName}>{notification.merchantName}</Text>

            <View style={styles.cardRecommendation}>
              <View style={styles.cardIconSmall}>
                <Text style={styles.cardIconText}>💳</Text>
              </View>
              <Text style={styles.recommendationText}>
                Use{' '}
                <Text style={styles.cardNameBold}>
                  {notification.suggestedCard.cardName}
                </Text>
              </Text>
            </View>

            <Text style={styles.reason}>{notification.reason}</Text>

            <TouchableOpacity style={styles.actionButton}>
              <Text style={styles.actionButtonText}>View on Map</Text>
            </TouchableOpacity>
          </TouchableOpacity>
        ))}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.light.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  backIcon: {
    fontSize: 24,
  },
  title: {
    ...typography.title3,
    fontWeight: '700',
  },
  content: {
    flex: 1,
    paddingHorizontal: spacing.lg,
  },
  headerInfo: {
    marginBottom: spacing.lg,
  },
  countText: {
    ...typography.subhead,
    color: colors.light.mutedForeground,
  },
  notificationCard: {
    backgroundColor: colors.light.secondary,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.md,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: spacing.md,
  },
  merchantBadge: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.light.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  merchantIcon: {
    fontSize: 20,
  },
  timestamp: {
    ...typography.footnote,
    color: colors.light.mutedForeground,
  },
  merchantName: {
    ...typography.title3,
    fontWeight: '700',
    marginBottom: spacing.md,
  },
  cardRecommendation: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.sm,
  },
  cardIconSmall: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: `${colors.light.primary}20`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  cardIconText: {
    fontSize: 12,
  },
  recommendationText: {
    ...typography.subhead,
    color: colors.light.mutedForeground,
  },
  cardNameBold: {
    fontWeight: '600',
    color: colors.light.foreground,
  },
  reason: {
    ...typography.subhead,
    color: colors.light.mutedForeground,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  actionButton: {
    backgroundColor: colors.light.primary,
    borderRadius: borderRadius.md,
    paddingVertical: spacing.sm,
    alignItems: 'center',
  },
  actionButtonText: {
    ...typography.subhead,
    color: colors.light.primaryForeground,
    fontWeight: '600',
  },
});

