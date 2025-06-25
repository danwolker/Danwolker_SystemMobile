import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

export default function BudgetsScreen() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);

  const [selectedSubMenu, setSelectedSubMenu] = useState<'listar' | 'novo' | 'fornecedores'>('listar');

  const mockBudgets = [
    { id: 1, fornecedor: 'Fornecedor X', valor: 'R$ 800,00', status: 'Aberto' },
    { id: 2, fornecedor: 'Fornecedor Y', valor: 'R$ 1.500,00', status: 'Em análise' },
  ];

  const renderContent = () => {
    switch (selectedSubMenu) {
      case 'listar':
        return (
          <View>
            <Text style={styles.title}>Orçamentos Salvos:</Text>
            {mockBudgets.map((budget) => (
              <View key={budget.id} style={styles.card}>
                <Text style={styles.cardTitle}>Fornecedor: {budget.fornecedor}</Text>
                <Text style={styles.cardText}>Valor: {budget.valor}</Text>
                <Text style={styles.cardText}>Status: {budget.status}</Text>
              </View>
            ))}
          </View>
        );
      case 'novo':
        return (
          <View>
            <Text style={styles.title}>Novo Orçamento:</Text>
            <TextInput placeholder="Fornecedor" placeholderTextColor={isDark ? '#999' : '#888'} style={styles.input} />
            <TextInput placeholder="Valor" placeholderTextColor={isDark ? '#999' : '#888'} style={styles.input} keyboardType="numeric" />
            <TextInput placeholder="Descrição" placeholderTextColor={isDark ? '#999' : '#888'} style={styles.input} multiline />
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.buttonText}>Salvar Orçamento</Text>
            </TouchableOpacity>
          </View>
        );
      case 'fornecedores':
        return (
          <View>
            <Text style={styles.title}>Lista de Fornecedores:</Text>
            <Text style={styles.cardText}>Fornecedor X</Text>
            <Text style={styles.cardText}>Fornecedor Y</Text>
            <Text style={styles.cardText}>Fornecedor Z</Text>
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
          style={[styles.button, selectedSubMenu === 'listar' && styles.buttonSelected]}
          onPress={() => setSelectedSubMenu('listar')}
        >
          <Text style={styles.buttonTextSmall}>Listar Orçamentos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, selectedSubMenu === 'novo' && styles.buttonSelected]}
          onPress={() => setSelectedSubMenu('novo')}
        >
          <Text style={styles.buttonTextSmall}>Novo Orçamento</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, selectedSubMenu === 'fornecedores' && styles.buttonSelected]}
          onPress={() => setSelectedSubMenu('fornecedores')}
        >
          <Text style={styles.buttonTextSmall}>Fornecedores</Text>
        </TouchableOpacity>
      </View>

      {renderContent()}
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
      marginBottom: 10,
      color: isDark ? '#fff' : '#000',
    },

    input: {
      borderWidth: 1,
      borderColor: isDark ? '#555' : '#ccc',
      padding: 10,
      borderRadius: 6,
      marginBottom: 10,
      backgroundColor: isDark ? '#222' : '#fff',
      color: isDark ? '#fff' : '#000',
    },

    card: {
      backgroundColor: isDark ? '#333' : '#fff',
      borderRadius: 6,
      padding: 12,
      marginBottom: 10,
      shadowColor: '#000',
      shadowOpacity: 0.1,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 2,
    },

    cardTitle: {
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000',
      marginBottom: 4,
    },

    cardText: {
      color: isDark ? '#ccc' : '#444',
      marginBottom: 2,
    },

    primaryButton: {
      backgroundColor: '#0D47A1',
      paddingVertical: 12,
      borderRadius: 6,
      alignItems: 'center',
    },

    buttonText: { color: '#fff', fontWeight: 'bold' },
  });
