import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from 'react-native';
import * as Haptics from 'expo-haptics';
import { IOSButton } from '../components/IOSButton';
import { Card } from '../types/card';
import { storage } from '../utils/storage';
import { colors } from '../theme/colors';
import { typography, spacing, borderRadius } from '../theme/typography';

interface AddCardProps {
  navigation: any;
}

export const AddCard: React.FC<AddCardProps> = ({ navigation }) => {
  const [scanning, setScanning] = useState(false);
  const [scanned, setScanned] = useState(false);

  const handleScan = async () => {
    Haptics.impactAsync(Haptics.ImpactFeedbackStyle.Medium);
    setScanning(true);

    // Simulate scanning delay
    await new Promise(resolve => setTimeout(resolve, 2000));

    setScanning(false);
    setScanned(true);
    Haptics.notificationAsync(Haptics.NotificationFeedbackType.Success);

    // Mock scan result
    const mockScanResult = {
      brand: 'visa' as const,
      bank: 'Chase',
      artStyle: 'blue' as const,
      tokenId: `tok_${Date.now()}`,
      cardName: 'Chase Freedom Flex',
    };

    await saveCard(mockScanResult);
  };

  const saveCard = async (scanResult: {
    brand: 'visa' | 'mastercard' | 'amex' | 'discover';
    bank: string;
    artStyle: 'blue' | 'purple' | 'teal' | 'orange' | 'pink';
    tokenId: string;
    cardName: string;
  }) => {
    try {
      const cards = await storage.getCards();
      
      const newCard: Card = {
        id: `card_${Date.now()}`,
        tokenId: scanResult.tokenId,
        brand: scanResult.brand,
        bankName: scanResult.bank,
        cardName: scanResult.cardName,
        gradient: scanResult.artStyle,
        isDefault: cards.length === 0,
        addedAt: new Date(),
      };

      await storage.addCard(newCard);
      
      Alert.alert('Success!', 'Card added to your wallet', [
        {
          text: 'OK',
          onPress: () => navigation.navigate('Wallet'),
        },
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save card. Please try again.');
      setScanned(false);
    }
  };

  const handleBack = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBack} style={styles.backButton}>
          <Text style={styles.backIcon}>←</Text>
        </TouchableOpacity>
        <Text style={styles.title}>Add Card</Text>
        <View style={{ width: 40 }} />
      </View>

      {/* Content */}
      <View style={styles.content}>
        {!scanned ? (
          <>
            {/* Scan Frame */}
            <View style={styles.scanFrame}>
              {scanning ? (
                <View style={styles.scanningState}>
                  <ActivityIndicator size="large" color={colors.light.primary} />
                  <Text style={styles.scanningText}>Scanning card...</Text>
                </View>
              ) : (
                <View style={styles.idleState}>
                  <Text style={styles.cameraIcon}>📷</Text>
                  <Text style={styles.idleText}>Position card inside frame</Text>
                </View>
              )}
            </View>

            {/* Privacy Notice */}
            <View style={styles.privacyCard}>
              <Text style={styles.privacyText}>
                <Text style={styles.privacyBold}>Privacy first:</Text> We only
                extract brand and bank information. Your card number is never
                stored or transmitted.
              </Text>
            </View>

            {/* Buttons */}
            <View style={styles.buttonGroup}>
              <IOSButton
                variant="primary"
                fullWidth
                onPress={handleScan}
                disabled={scanning}
                loading={scanning}
              >
                📷 Scan Card
              </IOSButton>

              <IOSButton variant="outline" fullWidth onPress={() => {}}>
                📤 Upload Image
              </IOSButton>

              <TouchableOpacity onPress={handleBack}>
                <Text style={styles.manualLink}>Enter manually instead</Text>
              </TouchableOpacity>
            </View>
          </>
        ) : (
          /* Success State */
          <View style={styles.successState}>
            <View style={styles.successIcon}>
              <Text style={styles.successCheck}>✓</Text>
            </View>

            <Text style={styles.successTitle}>Card Detected!</Text>
            <Text style={styles.successSubtitle}>Adding to your wallet...</Text>

            {/* Mock Card Info */}
            <View style={styles.cardInfo}>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Brand</Text>
                <Text style={styles.infoValue}>Visa</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Bank</Text>
                <Text style={styles.infoValue}>Chase</Text>
              </View>
              <View style={styles.infoRow}>
                <Text style={styles.infoLabel}>Card Name</Text>
                <Text style={styles.infoValue}>Freedom Flex</Text>
              </View>
            </View>
          </View>
        )}
      </View>
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
    padding: spacing.lg,
    gap: spacing['2xl'],
  },
  scanFrame: {
    aspectRatio: 1.586,
    borderRadius: borderRadius.xl,
    borderWidth: 4,
    borderColor: colors.light.primary,
    borderStyle: 'dashed',
    backgroundColor: `${colors.light.muted}50`,
    alignItems: 'center',
    justifyContent: 'center',
  },
  scanningState: {
    alignItems: 'center',
    gap: spacing.lg,
  },
  scanningText: {
    ...typography.subhead,
    fontWeight: '600',
  },
  idleState: {
    alignItems: 'center',
    gap: spacing.sm,
  },
  cameraIcon: {
    fontSize: 48,
  },
  idleText: {
    ...typography.subhead,
    color: colors.light.mutedForeground,
  },
  privacyCard: {
    backgroundColor: colors.light.secondary,
    borderRadius: borderRadius.xl,
    padding: spacing.lg,
  },
  privacyText: {
    ...typography.subhead,
    color: colors.light.mutedForeground,
  },
  privacyBold: {
    fontWeight: '600',
    color: colors.light.foreground,
  },
  buttonGroup: {
    gap: spacing.md,
  },
  manualLink: {
    ...typography.subhead,
    color: colors.light.mutedForeground,
    textAlign: 'center',
    paddingVertical: spacing.sm,
  },
  successState: {
    alignItems: 'center',
    paddingTop: spacing['3xl'],
    gap: spacing.lg,
  },
  successIcon: {
    width: 96,
    height: 96,
    borderRadius: 48,
    backgroundColor: colors.light.primary,
    alignItems: 'center',
    justifyContent: 'center',
  },
  successCheck: {
    fontSize: 48,
    color: colors.light.primaryForeground,
  },
  successTitle: {
    ...typography.title2,
    fontWeight: '700',
  },
  successSubtitle: {
    ...typography.body,
    color: colors.light.mutedForeground,
  },
  cardInfo: {
    width: '100%',
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
});

