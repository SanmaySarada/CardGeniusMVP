import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Card } from '../types/card';
import { cardGradients, shadows } from '../theme/colors';
import { typography, borderRadius } from '../theme/typography';

interface EnhancedWalletCardProps {
  card: Card;
  onPress?: () => void;
  index?: number;
  totalCards?: number;
  isExpanded?: boolean;
}

const SCREEN_WIDTH = Dimensions.get('window').width;
const CARD_WIDTH = SCREEN_WIDTH - 48; // 24px padding on each side
const CARD_HEIGHT = CARD_WIDTH / 1.586; // Credit card aspect ratio

export const EnhancedWalletCard: React.FC<EnhancedWalletCardProps> = ({
  card,
  onPress,
  index = 0,
  totalCards = 1,
  isExpanded = false,
}) => {
  const last4 = card.tokenId.slice(-4).padStart(4, '0');
  const gradient = cardGradients[card.gradient] || cardGradients.blue;
  
  const stackOffset = index * 32;
  const scaleOffset = 1 - (index * 0.04);
  const opacity = 1 - (index * 0.08);

  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.9}
      style={[
        styles.container,
        {
          transform: [
            { translateY: isExpanded ? 0 : stackOffset },
            { scale: isExpanded ? 1 : scaleOffset },
          ],
          opacity: isExpanded ? 1 : opacity,
          zIndex: totalCards - index,
        },
      ]}
    >
      <LinearGradient
        colors={gradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
        style={styles.gradient}
      >
        {/* Top section */}
        <View style={styles.topSection}>
          <View style={styles.bankInfo}>
            <View style={styles.iconContainer}>
              <Text style={styles.iconText}>💳</Text>
            </View>
            {card.isDefault && (
              <View style={styles.defaultBadge}>
                <Text style={styles.defaultText}>Default</Text>
              </View>
            )}
          </View>
          <View style={styles.contactlessIcons}>
            <Text style={styles.contactlessIcon}>📡</Text>
            <Text style={styles.contactlessIcon}>📱</Text>
          </View>
        </View>

        <View style={styles.cardDetails}>
          <Text style={styles.cardName}>{card.cardName}</Text>
          <Text style={styles.bankName}>{card.bankName}</Text>
        </View>

        {/* Bottom section */}
        <View style={styles.bottomSection}>
          {/* EMV Chip */}
          <View style={styles.chip}>
            <LinearGradient
              colors={['#F5D665', '#F7C948', '#F0B90B']}
              style={styles.chipGradient}
            >
              <View style={styles.chipGrid}>
                {[...Array(12)].map((_, i) => (
                  <View key={i} style={styles.chipCell} />
                ))}
              </View>
            </LinearGradient>
          </View>

          {/* Card number */}
          <Text style={styles.cardNumber}>•••• {last4}</Text>

          {/* Brand and year */}
          <View style={styles.footer}>
            <Text style={styles.brand}>{card.brand.toUpperCase()}</Text>
            <Text style={styles.year}>{card.addedAt.getFullYear()}</Text>
          </View>
        </View>
      </LinearGradient>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: CARD_WIDTH,
    height: CARD_HEIGHT,
    ...shadows.large,
  },
  gradient: {
    flex: 1,
    borderRadius: borderRadius['2xl'],
    padding: 24,
    justifyContent: 'space-between',
  },
  topSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  bankInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    fontSize: 20,
  },
  defaultBadge: {
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: borderRadius.full,
    backgroundColor: 'rgba(255, 255, 255, 0.25)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  defaultText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: '700',
  },
  contactlessIcons: {
    alignItems: 'flex-end',
    gap: 4,
  },
  contactlessIcon: {
    fontSize: 18,
    opacity: 0.8,
  },
  cardDetails: {
    marginTop: 8,
  },
  cardName: {
    ...typography.headline,
    color: '#fff',
    fontWeight: '700',
  },
  bankName: {
    ...typography.footnote,
    color: 'rgba(255, 255, 255, 0.8)',
    marginTop: 2,
  },
  bottomSection: {
    gap: 12,
  },
  chip: {
    width: 48,
    height: 40,
    borderRadius: 6,
    overflow: 'hidden',
  },
  chipGradient: {
    flex: 1,
    padding: 4,
  },
  chipGrid: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 1,
  },
  chipCell: {
    width: '23%',
    height: '31%',
    backgroundColor: 'rgba(139, 92, 0, 0.4)',
    borderRadius: 1,
  },
  cardNumber: {
    ...typography.title3,
    color: '#fff',
    fontWeight: '600',
    letterSpacing: 4,
    fontFamily: 'monospace',
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  brand: {
    ...typography.caption1,
    color: 'rgba(255, 255, 255, 0.8)',
    fontWeight: '700',
    letterSpacing: 1,
  },
  year: {
    ...typography.caption2,
    color: 'rgba(255, 255, 255, 0.6)',
    fontFamily: 'monospace',
  },
});

