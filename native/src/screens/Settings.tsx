import React from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { colors } from '../theme/colors';
import { typography, spacing, borderRadius } from '../theme/typography';

interface SettingsProps {
  navigation: any;
}

export const Settings: React.FC<SettingsProps> = ({ navigation }) => {
  const settingsItems = [
    {
      icon: '📍',
      title: 'Location Services',
      description: 'Always allowed',
    },
    {
      icon: '🔔',
      title: 'Notifications',
      description: 'Enabled',
    },
    {
      icon: '🛡️',
      title: 'Privacy & Security',
      description: 'Manage your data',
    },
    {
      icon: '❓',
      title: 'Help & Feedback',
      description: 'Get support',
    },
  ];

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
        <Text style={styles.title}>Settings</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Content */}
      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Privacy Notice */}
        <View style={styles.privacyCard}>
          <View style={styles.privacyHeader}>
            <Text style={styles.shieldIcon}>🛡️</Text>
            <Text style={styles.privacyTitle}>Privacy First</Text>
          </View>
          <Text style={styles.privacyDescription}>
            CardChooser never stores your card numbers. We only save:
          </Text>
          <View style={styles.privacyList}>
            <Text style={styles.listItem}>• Card brand (Visa, Mastercard, etc.)</Text>
            <Text style={styles.listItem}>• Issuing bank name</Text>
            <Text style={styles.listItem}>• Card artwork and custom name</Text>
            <Text style={styles.listItem}>• A secure reference token</Text>
          </View>
        </View>

        {/* Settings List */}
        <View style={styles.settingsList}>
          {settingsItems.map((item, index) => (
            <TouchableOpacity
              key={index}
              style={styles.settingItem}
              activeOpacity={0.7}
            >
              <View style={styles.settingIcon}>
                <Text style={styles.settingEmoji}>{item.icon}</Text>
              </View>
              <View style={styles.settingContent}>
                <Text style={styles.settingTitle}>{item.title}</Text>
                <Text style={styles.settingDescription}>{item.description}</Text>
              </View>
              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* App Info */}
        <View style={styles.appInfo}>
          <Text style={styles.appVersion}>CardChooser v1.0.0</Text>
          <Text style={styles.appTagline}>Made with privacy in mind</Text>
        </View>
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
  privacyCard: {
    backgroundColor: colors.light.secondary,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing.lg,
  },
  privacyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: spacing.sm,
    marginBottom: spacing.md,
  },
  shieldIcon: {
    fontSize: 20,
  },
  privacyTitle: {
    ...typography.headline,
    fontWeight: '700',
  },
  privacyDescription: {
    ...typography.subhead,
    color: colors.light.mutedForeground,
    marginBottom: spacing.md,
    lineHeight: 20,
  },
  privacyList: {
    gap: spacing.xs,
  },
  listItem: {
    ...typography.subhead,
    color: colors.light.mutedForeground,
    lineHeight: 20,
  },
  settingsList: {
    gap: spacing.sm,
    marginBottom: spacing.lg,
  },
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: colors.light.secondary,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    gap: spacing.md,
  },
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: `${colors.light.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  settingEmoji: {
    fontSize: 20,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    ...typography.headline,
    fontWeight: '600',
    marginBottom: 2,
  },
  settingDescription: {
    ...typography.footnote,
    color: colors.light.mutedForeground,
  },
  chevron: {
    fontSize: 24,
    color: colors.light.mutedForeground,
  },
  appInfo: {
    alignItems: 'center',
    paddingVertical: spacing.lg,
  },
  appVersion: {
    ...typography.subhead,
    color: colors.light.mutedForeground,
  },
  appTagline: {
    ...typography.footnote,
    color: colors.light.mutedForeground,
    marginTop: spacing.xs,
  },
});

