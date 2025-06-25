import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

export default function DashboardScreen() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);

  return (
    <View>
      <Text style={styles.pageTitle}>Painel Inicial</Text>
      <Text style={styles.description}>Resumo geral do e-commerce:</Text>

      {/* Gráficos rápidos */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total de Vendas no Mês:</Text>
        <Text style={styles.cardValue}>R$ 12.500,00</Text>

        <Text style={styles.subText}>Evolução de Pedidos: +15%</Text>
        <Text style={styles.subText}>Produto Mais Vendido: Camiseta X</Text>
      </View>

      {/* Últimos pedidos */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Últimos 5 Pedidos:</Text>
        <Text style={styles.listItem}>#1001 - R$ 250,00 - João Silva</Text>
        <Text style={styles.listItem}>#1002 - R$ 130,00 - Maria Souza</Text>
        <Text style={styles.listItem}>#1003 - R$ 400,00 - Pedro Lima</Text>
        <Text style={styles.listItem}>#1004 - R$ 90,00 - Carla Santos</Text>
        <Text style={styles.listItem}>#1005 - R$ 320,00 - Bruno Costa</Text>
      </View>

      {/* Estoque crítico */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Estoque Crítico:</Text>
        <Text style={styles.listItem}>Produto A - 2 unidades</Text>
        <Text style={styles.listItem}>Produto B - 5 unidades</Text>
      </View>

      {/* Total de faturamento */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Total Faturado no Mês:</Text>
        <Text style={styles.cardValue}>R$ 12.500,00</Text>
      </View>

      {/* Orçamentos pendentes */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Orçamentos Pendentes:</Text>
        <Text style={styles.listItem}>Total aguardando aprovação: 4</Text>
      </View>

      {/* Notas a Vencer */}
      <View style={styles.card}>
        <Text style={styles.cardTitle}>Notas a Vencer:</Text>
        <Text style={styles.listItem}>Nota Fiscal 001 - Vence em: 25/06/2025</Text>
        <Text style={styles.listItem}>Nota Fiscal 002 - Vence em: 28/06/2025</Text>
        <Text style={styles.listItem}>Nota Fiscal 003 - Vence em: 30/06/2025</Text>
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
      marginBottom: 6,
    },

    subText: {
      fontSize: 14,
      color: isDark ? '#aaa' : '#666',
    },

    listItem: {
      fontSize: 14,
      color: isDark ? '#ccc' : '#555',
      marginBottom: 4,
    },
  });
