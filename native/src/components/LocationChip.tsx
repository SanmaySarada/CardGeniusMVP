import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BlurView } from 'expo-blur';
import { colors } from '../theme/colors';
import { typography, borderRadius, spacing } from '../theme/typography';

interface LocationChipProps {
  location: string;
  isLive?: boolean;
}

export const LocationChip: React.FC<LocationChipProps> = ({ location, isLive = false }) => {
  return (
    <BlurView intensity={80} tint="light" style={styles.container}>
      <View style={styles.content}>
        <View style={[styles.dot, isLive && styles.dotLive]} />
        <Text style={styles.text}>{location}</Text>
      </View>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: 'flex-start',
    borderRadius: borderRadius.full,
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    paddingHorizontal: spacing.md,
    gap: spacing.sm,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: colors.light.mutedForeground,
  },
  dotLive: {
    backgroundColor: '#34C759',
  },
  text: {
    ...typography.footnote,
    fontWeight: '600',
    color: colors.light.foreground,
  },
});

