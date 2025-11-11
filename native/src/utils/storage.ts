import AsyncStorage from '@react-native-async-storage/async-storage';
import { Card } from '../types/card';

const STORAGE_KEYS = {
  CARDS: 'wallet_cards',
  BANK_CONNECTED: 'bank_connected',
};

export const storage = {
  // Card operations
  async getCards(): Promise<Card[]> {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.CARDS);
      if (stored) {
        const cards = JSON.parse(stored);
        return cards.map((card: any) => ({
          ...card,
          addedAt: new Date(card.addedAt),
        }));
      }
      return [];
    } catch (error) {
      console.error('Error getting cards:', error);
      return [];
    }
  },

  async saveCards(cards: Card[]): Promise<void> {
    try {
      await AsyncStorage.setItem(STORAGE_KEYS.CARDS, JSON.stringify(cards));
    } catch (error) {
      console.error('Error saving cards:', error);
    }
  },

  async addCard(card: Card): Promise<void> {
    const cards = await this.getCards();
    cards.unshift(card);
    await this.saveCards(cards);
  },

  async deleteCard(cardId: string): Promise<void> {
    const cards = await this.getCards();
    const filtered = cards.filter(card => card.id !== cardId);
    await this.saveCards(filtered);
  },

  async setDefaultCard(cardId: string): Promise<void> {
    const cards = await this.getCards();
    const updated = cards.map(card => ({
      ...card,
      isDefault: card.id === cardId,
    }));
    await this.saveCards(updated);
  },

  // Bank connection operations
  async getBankConnection(): Promise<any | null> {
    try {
      const stored = await AsyncStorage.getItem(STORAGE_KEYS.BANK_CONNECTED);
      return stored ? JSON.parse(stored) : null;
    } catch (error) {
      console.error('Error getting bank connection:', error);
      return null;
    }
  },

  async saveBankConnection(connection: any): Promise<void> {
    try {
      await AsyncStorage.setItem(
        STORAGE_KEYS.BANK_CONNECTED,
        JSON.stringify(connection)
      );
    } catch (error) {
      console.error('Error saving bank connection:', error);
    }
  },

  async removeBankConnection(): Promise<void> {
    try {
      await AsyncStorage.removeItem(STORAGE_KEYS.BANK_CONNECTED);
    } catch (error) {
      console.error('Error removing bank connection:', error);
    }
  },

  // Clear all data
  async clearAll(): Promise<void> {
    try {
      await AsyncStorage.multiRemove([
        STORAGE_KEYS.CARDS,
        STORAGE_KEYS.BANK_CONNECTED,
      ]);
    } catch (error) {
      console.error('Error clearing storage:', error);
    }
  },
};

