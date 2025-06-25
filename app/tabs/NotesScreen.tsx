import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

export default function NotesScreen() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);

  const [selectedSubMenu, setSelectedSubMenu] = useState<'todas' | 'nova' | 'excluir'>('todas');

  const mockNotas = [
    {
      id: 1,
      numero: '001',
      fornecedor: 'Fornecedor A',
      valor: 'R$ 500,00',
      emissao: '2025-06-01',
      vencimento: '2025-06-30',
      descricao: 'Compra de materiais de escritório',
    },
    {
      id: 2,
      numero: '002',
      fornecedor: 'Fornecedor B',
      valor: 'R$ 1.200,00',
      emissao: '2025-06-05',
      vencimento: '2025-07-05',
      descricao: 'Equipamentos de TI',
    },
  ];

  const renderContent = () => {
    switch (selectedSubMenu) {
      case 'todas':
        return (
          <View>
            <Text style={styles.title}>Todas as Notas:</Text>
            {mockNotas.map((nota) => (
              <View key={nota.id} style={styles.card}>
                <Text style={styles.cardTitle}>Nota {nota.numero} - {nota.fornecedor}</Text>
                <Text style={styles.cardText}>Valor: {nota.valor}</Text>
                <Text style={styles.cardText}>Emissão: {nota.emissao}</Text>
                <Text style={styles.cardText}>Vencimento: {nota.vencimento}</Text>
                <Text style={styles.cardText}>Descrição: {nota.descricao}</Text>
              </View>
            ))}
          </View>
        );
      case 'nova':
        return (
          <View>
            <Text style={styles.title}>Nova Nota:</Text>
            <TextInput placeholder="Número da Nota" placeholderTextColor={isDark ? '#999' : '#888'} style={styles.input} />
            <TextInput placeholder="Fornecedor" placeholderTextColor={isDark ? '#999' : '#888'} style={styles.input} />
            <TextInput placeholder="Valor" placeholderTextColor={isDark ? '#999' : '#888'} style={styles.input} keyboardType="numeric" />
            <TextInput placeholder="Data de Emissão" placeholderTextColor={isDark ? '#999' : '#888'} style={styles.input} />
            <TextInput placeholder="Data de Vencimento" placeholderTextColor={isDark ? '#999' : '#888'} style={styles.input} />
            <TextInput placeholder="Descrição" placeholderTextColor={isDark ? '#999' : '#888'} style={styles.input} multiline />
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.buttonText}>Salvar Nota</Text>
            </TouchableOpacity>
          </View>
        );
      case 'excluir':
        return (
          <View>
            <Text style={styles.title}>Excluir Nota:</Text>
            <TextInput placeholder="Buscar nota para excluir..." placeholderTextColor={isDark ? '#999' : '#888'} style={styles.input} />
            <TouchableOpacity style={[styles.primaryButton, styles.deleteButton]}>
              <Text style={styles.buttonText}>Excluir Nota</Text>
            </TouchableOpacity>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => setSelectedSubMenu('todas')}>
          <Text style={styles.buttonTextSmall}>Listar Notas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setSelectedSubMenu('nova')}>
          <Text style={styles.buttonTextSmall}>Nova Nota</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setSelectedSubMenu('excluir')}>
          <Text style={styles.buttonTextSmall}>Excluir Nota</Text>
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

    deleteButton: {
      backgroundColor: '#D32F2F',
      marginTop: 8,
    },

    buttonText: { color: '#fff', fontWeight: 'bold' },
  });
