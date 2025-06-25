import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

export default function BudgetsScreen() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);

  const [selectedSubMenu, setSelectedSubMenu] = useState<'listar' | 'novo'>('listar');

  const mockBudgets = [
    {
      id: 1,
      fornecedor: 'Fornecedor X',
      descricao: 'Compra de materiais',
      valor: 'R$ 1.200,00',
      status: 'Aguardando Aprovação',
    },
    {
      id: 2,
      fornecedor: 'Fornecedor Y',
      descricao: 'Equipamentos',
      valor: 'R$ 2.500,00',
      status: 'Aprovado',
    },
  ];

  const renderContent = () => {
    switch (selectedSubMenu) {
      case 'listar':
        return (
          <View>
            <Text style={styles.title}>Orçamentos Cadastrados:</Text>
            {mockBudgets.map((budget) => (
              <View key={budget.id} style={styles.card}>
                <Text style={styles.cardText}>Fornecedor: {budget.fornecedor}</Text>
                <Text style={styles.cardText}>Descrição: {budget.descricao}</Text>
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
            <TextInput placeholder="Fornecedor" style={styles.input} placeholderTextColor={isDark ? '#aaa' : '#666'} />
            <TextInput placeholder="Descrição" style={styles.input} placeholderTextColor={isDark ? '#aaa' : '#666'} />
            <TextInput placeholder="Valor" style={styles.input} placeholderTextColor={isDark ? '#aaa' : '#666'} />
            <TextInput placeholder="Status" style={styles.input} placeholderTextColor={isDark ? '#aaa' : '#666'} />
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.buttonText}>Salvar Orçamento</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View>
      <View style={styles.topButtonRow}>
        <TouchableOpacity style={styles.listButton} onPress={() => setSelectedSubMenu('listar')}>
          <Text style={styles.buttonText}>Listar Orçamentos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.newButton} onPress={() => setSelectedSubMenu('novo')}>
          <Text style={styles.buttonText}>Novo Orçamento</Text>
        </TouchableOpacity>
      </View>

      {renderContent()}
    </View>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  topButtonRow: { flexDirection: 'row', marginBottom: 10 },
  listButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: isDark ? '#444' : '#BBDEFB',
    borderTopLeftRadius: 6,
    borderBottomLeftRadius: 6,
    alignItems: 'center',
    marginRight: 4,
  },
  newButton: {
    flex: 1,
    paddingVertical: 10,
    backgroundColor: isDark ? '#444' : '#BBDEFB',
    borderTopRightRadius: 6,
    borderBottomRightRadius: 6,
    alignItems: 'center',
    marginLeft: 4,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: isDark ? '#fff' : '#000' },
  input: {
    borderWidth: 1,
    borderColor: isDark ? '#555' : '#ccc',
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
    color: isDark ? '#fff' : '#000',
    backgroundColor: isDark ? '#222' : '#fff',
  },
  card: {
    backgroundColor: isDark ? '#333' : '#fff',
    padding: 10,
    marginBottom: 8,
    borderRadius: 6,
  },
  cardText: { color: isDark ? '#ddd' : '#333', marginBottom: 2 },
  primaryButton: {
    backgroundColor: '#0D47A1',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: isDark ? '#fff' : '#000', fontWeight: 'bold' },
});
