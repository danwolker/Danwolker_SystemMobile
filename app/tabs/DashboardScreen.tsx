import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

export default function DashboardScreen() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);

  return (
    <View>
      <Text style={styles.pageTitle}>📊 Painel Inicial</Text>
      <Text style={styles.description}>
        Aqui você pode mostrar métricas do sistema:
      </Text>

      {/* Blocos de Dados */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total de Produtos:</Text>
        <Text style={styles.cardValue}>120</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Pedidos Pendentes:</Text>
        <Text style={styles.cardValue}>8</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Orçamentos Abertos:</Text>
        <Text style={styles.cardValue}>5</Text>
      </View>

      <View style={styles.card}>
        <Text style={styles.cardTitle}>Notas a Vencer:</Text>
        <Text style={styles.cardValue}>3</Text>
      </View>
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    pageTitle: {
      fontSize: 22,
      fontWeight: 'bold',
      marginBottom: 10,
      color: isDark ? '#fff' : '#000',
    },

    description: {
      fontSize: 16,
      marginBottom: 15,
      color: isDark ? '#ccc' : '#555',
    },

    card: {
      backgroundColor: isDark ? '#333' : '#fff',
      padding: 15,
      borderRadius: 8,
      marginBottom: 12,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 2,
      elevation: 2,
    },

    cardTitle: {
      fontSize: 16,
      fontWeight: 'bold',
      marginBottom: 6,
      color: isDark ? '#ddd' : '#333',
    },

    cardValue: {
      fontSize: 20,
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000',
    },
  });
