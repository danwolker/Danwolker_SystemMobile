import React, { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

export default function GraphsScreen() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);

  const [selectedGraph, setSelectedGraph] = useState<'vendas' | 'clientes' | 'financeiro'>('vendas');

  const renderGraphContent = () => {
    switch (selectedGraph) {
      case 'vendas':
        return (
          <View>
            <Text style={styles.title}>📈 Gráfico de Vendas</Text>
            <Text style={styles.description}>Exemplo: Gráfico de vendas dos últimos 30 dias.</Text>
          </View>
        );
      case 'clientes':
        return (
          <View>
            <Text style={styles.title}>👥 Gráfico de Clientes</Text>
            <Text style={styles.description}>Exemplo: Crescimento de clientes ao longo dos meses.</Text>
          </View>
        );
      case 'financeiro':
        return (
          <View>
            <Text style={styles.title}>💰 Gráfico Financeiro</Text>
            <Text style={styles.description}>Exemplo: Faturamento x Despesas.</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View>
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, selectedGraph === 'vendas' && styles.buttonSelected]}
          onPress={() => setSelectedGraph('vendas')}
        >
          <Text style={styles.buttonTextSmall}>Vendas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, selectedGraph === 'clientes' && styles.buttonSelected]}
          onPress={() => setSelectedGraph('clientes')}
        >
          <Text style={styles.buttonTextSmall}>Clientes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, selectedGraph === 'financeiro' && styles.buttonSelected]}
          onPress={() => setSelectedGraph('financeiro')}
        >
          <Text style={styles.buttonTextSmall}>Financeiro</Text>
        </TouchableOpacity>
      </View>

      {renderGraphContent()}
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    buttonRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 12 },

    button: {
      paddingVertical: 10,
      paddingHorizontal: 15,
      backgroundColor: isDark ? '#555' : '#BBDEFB',
      borderRadius: 6,
      marginRight: 8,
      marginBottom: 8,
    },

    buttonSelected: {
      backgroundColor: isDark ? '#777' : '#2196F3',
    },

    buttonTextSmall: {
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000',
    },

    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginBottom: 8,
      color: isDark ? '#fff' : '#000',
    },

    description: {
      fontSize: 16,
      color: isDark ? '#ccc' : '#555',
    },
  });
