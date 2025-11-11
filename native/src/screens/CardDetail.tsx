import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Alert,
} from 'react-native';
import { EnhancedWalletCard } from '../components/EnhancedWalletCard';
import { IOSButton } from '../components/IOSButton';
import { Card } from '../types/card';
import { storage } from '../utils/storage';
import { colors, shadows } from '../theme/colors';
import { typography, spacing, borderRadius } from '../theme/typography';

interface CardDetailProps {
  navigation: any;
  route: {
    params: {
      card: Card;
    };
  };
}

export const CardDetail: React.FC<CardDetailProps> = ({ navigation, route }) => {
  const { card } = route.params;
  const [activeTab, setActiveTab] = useState<'details' | 'transactions'>('details');

  const mockTransactions = [
    { id: 1, merchant: 'Starbucks', amount: -4.95, date: '2025-01-20', category: 'Dining' },
    { id: 2, merchant: 'Whole Foods', amount: -67.32, date: '2025-01-19', category: 'Groceries' },
    { id: 3, merchant: 'Shell Gas', amount: -45.00, date: '2025-01-18', category: 'Gas' },
  ];

  const handleSetDefault = async () => {
    await storage.setDefaultCard(card.id);
    Alert.alert('Success', 'Default card updated', [
      { text: 'OK', onPress: () => navigation.goBack() },
    ]);
  };

  const handleDelete = () => {
    Alert.alert(
      'Delete Card',
      'Are you sure you want to remove this card from your wallet?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: async () => {
            await storage.deleteCard(card.id);
            navigation.goBack();
          },
        },
      ]
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.closeButton}>
          <Text style={styles.closeIcon}>✕</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Card Details</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Card Preview */}
        <View style={styles.cardPreview}>
          <EnhancedWalletCard card={card} isExpanded />
        </View>

        {/* Stats */}
        <View style={styles.stats}>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📈</Text>
            <Text style={styles.statValue}>2.5%</Text>
            <Text style={styles.statLabel}>Cash Back</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>💰</Text>
            <Text style={styles.statValue}>$127</Text>
            <Text style={styles.statLabel}>Earned</Text>
          </View>
          <View style={styles.statCard}>
            <Text style={styles.statIcon}>📅</Text>
            <Text style={styles.statValue}>24</Text>
            <Text style={styles.statLabel}>Uses</Text>
          </View>
        </View>

        {/* Tabs */}
        <View style={styles.tabs}>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'details' && styles.activeTab]}
            onPress={() => setActiveTab('details')}
          >
            <Text style={[styles.tabText, activeTab === 'details' && styles.activeTabText]}>
              Details
            </Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={[styles.tab, activeTab === 'transactions' && styles.activeTab]}
            onPress={() => setActiveTab('transactions')}
          >
            <Text
              style={[styles.tabText, activeTab === 'transactions' && styles.activeTabText]}
            >
              Transactions
            </Text>
          </TouchableOpacity>
        </View>

        {/* Tab Content */}
        {activeTab === 'details' ? (
          <View style={styles.detailsContent}>
            <View style={styles.infoCard}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Bank</Text>
                <Text style={styles.infoValue}>{card.bankName}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Card Name</Text>
                <Text style={styles.infoValue}>{card.cardName}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Brand</Text>
                <Text style={styles.infoValue}>{card.brand.toUpperCase()}</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Added</Text>
                <Text style={styles.infoValue}>
                  {card.addedAt.toLocaleDateString('en-US', {
                    month: 'short',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </Text>
              </View>
            </View>

            <View style={styles.actions}>
              {!card.isDefault && (
                <IOSButton variant="primary" fullWidth onPress={handleSetDefault}>
                  ⭐ Set as Default Card
                </IOSButton>
              )}
              <IOSButton variant="outline" fullWidth onPress={handleDelete}>
                <Text style={{ color: colors.light.destructive }}>🗑️ Remove Card</Text>
              </IOSButton>
            </View>
          </View>
        ) : (
          <View style={styles.transactionsContent}>
            {mockTransactions.map((txn) => (
              <View key={txn.id} style={styles.transactionItem}>
                <View style={styles.transactionIcon}>
                  <Text style={styles.transactionEmoji}>💳</Text>
                </View>
                <View style={styles.transactionDetails}>
                  <Text style={styles.merchantName}>{txn.merchant}</Text>
                  <Text style={styles.transactionCategory}>{txn.category}</Text>
                </View>
                <View style={styles.transactionAmount}>
                  <Text style={styles.amount}>${Math.abs(txn.amount).toFixed(2)}</Text>
                  <Text style={styles.date}>{txn.date}</Text>
                </View>
              </View>
            ))}
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
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
  },
  closeButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: colors.light.secondary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  closeIcon: {
    fontSize: 20,
    fontWeight: '300',
  },
  title: {
    ...typography.title3,
    fontWeight: '700',
  },
  content: {
    flex: 1,
  },
  cardPreview: {
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.lg,
    alignItems: 'center',
  },
  stats: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    gap: spacing.md,
    marginBottom: spacing.lg,
  },
  statCard: {
    flex: 1,
    backgroundColor: colors.light.secondary,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    alignItems: 'center',
  },
  statIcon: {
    fontSize: 24,
    marginBottom: spacing.sm,
  },
  statValue: {
    ...typography.title2,
    fontWeight: '700',
  },
  statLabel: {
    ...typography.caption1,
    color: colors.light.mutedForeground,
    marginTop: spacing.xs,
  },
  tabs: {
    flexDirection: 'row',
    paddingHorizontal: spacing.lg,
    marginBottom: spacing.lg,
    gap: spacing.sm,
    backgroundColor: colors.light.secondary,
    marginHorizontal: spacing.lg,
    borderRadius: borderRadius.xl,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.sm,
    alignItems: 'center',
    borderRadius: borderRadius.md,
  },
  activeTab: {
    backgroundColor: colors.light.primary,
  },
  tabText: {
    ...typography.subhead,
    color: colors.light.mutedForeground,
    fontWeight: '600',
  },
  activeTabText: {
    color: colors.light.primaryForeground,
  },
  detailsContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.lg,
    paddingBottom: spacing['2xl'],
  },
  infoCard: {
    backgroundColor: colors.light.secondary,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    gap: spacing.md,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoLabel: {
    ...typography.subhead,
    color: colors.light.mutedForeground,
  },
  infoValue: {
    ...typography.headline,
    fontWeight: '600',
  },
  actions: {
    gap: spacing.md,
  },
  transactionsContent: {
    paddingHorizontal: spacing.lg,
    gap: spacing.sm,
    paddingBottom: spacing['2xl'],
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light.secondary,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    gap: spacing.md,
  },
  transactionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.light.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionEmoji: {
    fontSize: 20,
  },
  transactionDetails: {
    flex: 1,
  },
  merchantName: {
    ...typography.headline,
    fontWeight: '600',
  },
  transactionCategory: {
    ...typography.caption1,
    color: colors.light.mutedForeground,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amount: {
    ...typography.headline,
    fontWeight: '700',
  },
  date: {
    ...typography.caption1,
    color: colors.light.mutedForeground,
  },
});

