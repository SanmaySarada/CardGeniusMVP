import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  ScrollView,
} from 'react-native';
import * as Location from 'expo-location';
import { IOSButton } from '../components/IOSButton';
import { colors } from '../theme/colors';
import { typography, spacing, borderRadius } from '../theme/typography';

interface OnboardingProps {
  navigation: any;
}

type OnboardingStep = 'welcome' | 'location' | 'notifications';

export const Onboarding: React.FC<OnboardingProps> = ({ navigation }) => {
  const [step, setStep] = useState<OnboardingStep>('welcome');

  const handleLocationPermission = async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
    console.log('Location permission:', status);
    setStep('notifications');
  };

  const handleNotificationPermission = () => {
    // In production, request notification permissions here
    console.log('Notification permission requested');
    navigation.replace('Wallet');
  };

  if (step === 'welcome') {
    return (
      <SafeAreaView style={styles.container}>
        <ScrollView
          contentContainerStyle={styles.scrollContent}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.content}>
            {/* Icon */}
            <View style={styles.iconWrapper}>
              <View style={styles.iconContainer}>
                <Text style={styles.icon}>💳</Text>
              </View>
            </View>

            {/* Title */}
            <View style={styles.titleSection}>
              <Text style={styles.title}>CardChooser</Text>
              <Text style={styles.subtitle}>
                The smart way to maximize your cashback rewards
              </Text>
            </View>

            {/* Features */}
            <View style={styles.features}>
              <View style={styles.feature}>
                <Text style={styles.featureIcon}>🛡️</Text>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>Privacy First</Text>
                  <Text style={styles.featureDescription}>
                    No card numbers stored. Ever. We only save card metadata like brand and bank name.
                  </Text>
                </View>
              </View>

              <View style={styles.feature}>
                <Text style={styles.featureIcon}>📍</Text>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>Location-Aware</Text>
                  <Text style={styles.featureDescription}>
                    Get automatic card recommendations when you're at a store.
                  </Text>
                </View>
              </View>

              <View style={styles.feature}>
                <Text style={styles.featureIcon}>🔔</Text>
                <View style={styles.featureText}>
                  <Text style={styles.featureTitle}>Smart Alerts</Text>
                  <Text style={styles.featureDescription}>
                    Timely notifications help you never miss a cashback opportunity.
                  </Text>
                </View>
              </View>
            </View>

            {/* CTA */}
            <IOSButton
              variant="primary"
              fullWidth
              onPress={() => setStep('location')}
            >
              Get Started
            </IOSButton>
          </View>
        </ScrollView>
      </SafeAreaView>
    );
  }

  if (step === 'location') {
    return (
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          <View style={styles.permissionIcon}>
            <Text style={styles.permissionIconText}>📍</Text>
          </View>

          <View style={styles.titleSection}>
            <Text style={styles.title}>Enable Location</Text>
            <Text style={styles.subtitle}>
              CardChooser needs your location to recommend the best card when you're at a store.
            </Text>
          </View>

          <View style={styles.detailsCard}>
            <Text style={styles.detailsTitle}>How we use location:</Text>
            <View style={styles.detailsList}>
              <Text style={styles.detailsItem}>
                • Match your location with nearby merchant categories
              </Text>
              <Text style={styles.detailsItem}>
                • Send timely card recommendations
              </Text>
              <Text style={styles.detailsItem}>
                • Location data is not stored permanently
              </Text>
            </View>
          </View>

          <View style={styles.buttonGroup}>
            <IOSButton
              variant="primary"
              fullWidth
              onPress={handleLocationPermission}
            >
              Allow Location Access
            </IOSButton>
            <Text
              style={styles.skipButton}
              onPress={() => setStep('notifications')}
            >
              Skip for now
            </Text>
          </View>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.content}>
        <View style={styles.permissionIcon}>
          <Text style={styles.permissionIconText}>🔔</Text>
        </View>

        <View style={styles.titleSection}>
          <Text style={styles.title}>Enable Notifications</Text>
          <Text style={styles.subtitle}>
            Get notified when you're near a store where one of your cards offers better rewards.
          </Text>
        </View>

        <View style={styles.detailsCard}>
          <Text style={styles.detailsTitle}>You'll receive alerts for:</Text>
          <View style={styles.detailsList}>
            <Text style={styles.detailsItem}>
              • Best card recommendations at nearby merchants
            </Text>
            <Text style={styles.detailsItem}>
              • Bonus category reminders
            </Text>
            <Text style={styles.detailsItem}>
              • New cashback opportunities
            </Text>
          </View>
        </View>

        <View style={styles.buttonGroup}>
          <IOSButton
            variant="primary"
            fullWidth
            onPress={handleNotificationPermission}
          >
            Enable Notifications
          </IOSButton>
          <Text
            style={styles.skipButton}
            onPress={() => navigation.replace('Wallet')}
          >
            Maybe later
          </Text>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.light.background,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    padding: spacing.lg,
    justifyContent: 'center',
  },
  iconWrapper: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  iconContainer: {
    width: 96,
    height: 96,
    borderRadius: 28,
    backgroundColor: colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  icon: {
    fontSize: 48,
  },
  titleSection: {
    alignItems: 'center',
    marginBottom: spacing['2xl'],
  },
  title: {
    ...typography.title1,
    fontWeight: '700',
    textAlign: 'center',
    marginBottom: spacing.sm,
  },
  subtitle: {
    ...typography.body,
    color: colors.light.mutedForeground,
    textAlign: 'center',
  },
  features: {
    gap: spacing.lg,
    marginBottom: spacing['2xl'],
  },
  feature: {
    flexDirection: 'row',
    gap: spacing.md,
  },
  featureIcon: {
    fontSize: 24,
    marginTop: 4,
  },
  featureText: {
    flex: 1,
  },
  featureTitle: {
    ...typography.headline,
    fontWeight: '600',
    marginBottom: spacing.xs,
  },
  featureDescription: {
    ...typography.subhead,
    color: colors.light.mutedForeground,
  },
  permissionIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: `${colors.light.primary}15`,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    marginBottom: spacing['2xl'],
  },
  permissionIconText: {
    fontSize: 48,
  },
  detailsCard: {
    backgroundColor: colors.light.secondary,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
    marginBottom: spacing['2xl'],
  },
  detailsTitle: {
    ...typography.headline,
    fontWeight: '600',
    marginBottom: spacing.md,
  },
  detailsList: {
    gap: spacing.sm,
  },
  detailsItem: {
    ...typography.subhead,
    color: colors.light.mutedForeground,
    lineHeight: 20,
  },
  buttonGroup: {
    gap: spacing.md,
  },
  skipButton: {
    ...typography.subhead,
    color: colors.light.mutedForeground,
    textAlign: 'center',
    paddingVertical: spacing.sm,
  },
});

