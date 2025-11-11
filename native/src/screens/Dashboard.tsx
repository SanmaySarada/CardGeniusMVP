import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Dimensions,
} from 'react-native';
import { PieChart } from 'react-native-chart-kit';
import { storage } from '../utils/storage';
import { mockTransactions, categoryColors, categoryLabels } from '../data/mockTransactions';
import { colors } from '../theme/colors';
import { typography, spacing, borderRadius } from '../theme/typography';
import { format, isToday, isYesterday } from 'date-fns';

interface DashboardProps {
  navigation: any;
}

export const Dashboard: React.FC<DashboardProps> = ({ navigation }) => {
  const [bankConnection, setBankConnection] = useState<any>(null);
  const [activeTab, setActiveTab] = useState<'transactions' | 'spending'>('transactions');

  useEffect(() => {
    loadBankConnection();
  }, []);

  const loadBankConnection = async () => {
    const connection = await storage.getBankConnection();
    setBankConnection(connection);
  };

  const handleDisconnect = async () => {
    await storage.removeBankConnection();
    navigation.replace('Wallet');
  };

  // Calculate spending by category
  const categoryTotals = mockTransactions.reduce((acc, transaction) => {
    if (transaction.amount < 0) {
      const category = transaction.category;
      acc[category] = (acc[category] || 0) + Math.abs(transaction.amount);
    }
    return acc;
  }, {} as Record<string, number>);

  const chartData = Object.entries(categoryTotals).map(([category, value]) => ({
    name: categoryLabels[category],
    amount: Math.round(value),
    color: categoryColors[category],
    legendFontColor: colors.light.foreground,
    legendFontSize: 12,
  }));

  const renderTransactions = () => {
    const grouped = mockTransactions.reduce((groups, transaction) => {
      let dateLabel = format(transaction.date, 'MMM d, yyyy');
      if (isToday(transaction.date)) {
        dateLabel = 'Today';
      } else if (isYesterday(transaction.date)) {
        dateLabel = 'Yesterday';
      }
      
      if (!groups[dateLabel]) {
        groups[dateLabel] = [];
      }
      groups[dateLabel].push(transaction);
      return groups;
    }, {} as Record<string, typeof mockTransactions>);

    return Object.entries(grouped).map(([date, txns]) => (
      <View key={date} style={styles.transactionGroup}>
        <Text style={styles.dateHeader}>{date}</Text>
        {txns.map((txn) => (
          <View key={txn.id} style={styles.transactionItem}>
            <View style={styles.transactionIcon}>
              <Text style={styles.transactionEmoji}>{txn.icon}</Text>
            </View>
            <View style={styles.transactionDetails}>
              <Text style={styles.merchantName}>{txn.merchant}</Text>
              <Text style={styles.transactionCategory}>
                {categoryLabels[txn.category]} • •••• {txn.cardLast4}
              </Text>
            </View>
            <View style={styles.transactionAmount}>
              <Text style={styles.amount}>
                -${Math.abs(txn.amount).toFixed(2)}
              </Text>
              {txn.status === 'pending' && (
                <Text style={styles.pending}>Pending</Text>
              )}
            </View>
          </View>
        ))}
      </View>
    ));
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
        <View style={styles.headerTitle}>
          <Text style={styles.title}>Dashboard</Text>
          <Text style={styles.subtitle}>
            {bankConnection?.bankName} •••• 4532
          </Text>
        </View>
        <TouchableOpacity onPress={handleDisconnect} style={styles.logoutButton}>
          <Text style={styles.logoutIcon}>🚪</Text>
        </TouchableOpacity>
      </View>

      {/* Tabs */}
      <View style={styles.tabs}>
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
        <TouchableOpacity
          style={[styles.tab, activeTab === 'spending' && styles.activeTab]}
          onPress={() => setActiveTab('spending')}
        >
          <Text
            style={[styles.tabText, activeTab === 'spending' && styles.activeTabText]}
          >
            Spending
          </Text>
        </TouchableOpacity>
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {activeTab === 'transactions' ? (
          renderTransactions()
        ) : (
          <View style={styles.spendingContent}>
            <PieChart
              data={chartData}
              width={Dimensions.get('window').width - 48}
              height={220}
              chartConfig={{
                color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
              }}
              accessor="amount"
              backgroundColor="transparent"
              paddingLeft="15"
              absolute
            />
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
    paddingHorizontal: spacing.lg,
    paddingVertical: spacing.md,
    gap: spacing.md,
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
  headerTitle: {
    flex: 1,
  },
  title: {
    ...typography.title3,
    fontWeight: '700',
  },
  subtitle: {
    ...typography.footnote,
    color: colors.light.mutedForeground,
  },
  logoutButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.light.destructive}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoutIcon: {
    fontSize: 20,
  },
  tabs: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: colors.light.border,
  },
  tab: {
    flex: 1,
    paddingVertical: spacing.md,
    alignItems: 'center',
    borderBottomWidth: 2,
    borderBottomColor: 'transparent',
  },
  activeTab: {
    borderBottomColor: colors.light.primary,
  },
  tabText: {
    ...typography.subhead,
    color: colors.light.mutedForeground,
  },
  activeTabText: {
    color: colors.light.primary,
    fontWeight: '600',
  },
  content: {
    flex: 1,
  },
  transactionGroup: {
    paddingVertical: spacing.lg,
    paddingHorizontal: spacing.lg,
  },
  dateHeader: {
    ...typography.footnote,
    color: colors.light.mutedForeground,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  transactionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light.secondary,
    borderRadius: borderRadius.xl,
    padding: spacing.md,
    marginBottom: spacing.sm,
    gap: spacing.md,
  },
  transactionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: colors.light.background,
    alignItems: 'center',
    justifyContent: 'center',
  },
  transactionEmoji: {
    fontSize: 24,
  },
  transactionDetails: {
    flex: 1,
  },
  merchantName: {
    ...typography.headline,
    fontWeight: '600',
  },
  transactionCategory: {
    ...typography.footnote,
    color: colors.light.mutedForeground,
  },
  transactionAmount: {
    alignItems: 'flex-end',
  },
  amount: {
    ...typography.headline,
    fontWeight: '700',
  },
  pending: {
    ...typography.caption1,
    color: colors.light.mutedForeground,
  },
  spendingContent: {
    padding: spacing.lg,
  },
});

