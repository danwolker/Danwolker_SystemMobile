import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

export default function ProductScreen() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);

  const [selectedSubMenu, setSelectedSubMenu] = useState<'listar' | 'editar' | 'novo'>('listar');
  const mockProducts = ['Produto A', 'Produto B', 'Produto C'];

  const renderContent = () => {
    switch (selectedSubMenu) {
      case 'listar':
        return (
          <View>
            <Text style={styles.title}>Lista de Produtos:</Text>
            {mockProducts.map((product, index) => (
              <Text key={index} style={styles.item}>{product}</Text>
            ))}
          </View>
        );
      case 'editar':
        return (
          <View>
            <Text style={styles.title}>Editar Produto:</Text>
            <TextInput
              placeholder="Buscar produto para editar..."
              placeholderTextColor={isDark ? '#999' : '#888'}
              style={styles.input}
            />
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.buttonText}>Editar</Text>
            </TouchableOpacity>
          </View>
        );
      case 'novo':
        return (
          <View>
            <Text style={styles.title}>Adicionar Novo Produto:</Text>
            <TextInput
              placeholder="Nome do Produto..."
              placeholderTextColor={isDark ? '#999' : '#888'}
              style={styles.input}
            />
            <TextInput
              placeholder="Descrição..."
              placeholderTextColor={isDark ? '#999' : '#888'}
              style={styles.input}
            />
            <TextInput
              placeholder="Preço..."
              placeholderTextColor={isDark ? '#999' : '#888'}
              style={styles.input}
              keyboardType="numeric"
            />
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.buttonText}>Salvar Produto</Text>
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
        <TouchableOpacity style={styles.button} onPress={() => setSelectedSubMenu('listar')}>
          <Text style={styles.buttonTextSmall}>Listar Produtos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setSelectedSubMenu('editar')}>
          <Text style={styles.buttonTextSmall}>Editar Produto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setSelectedSubMenu('novo')}>
          <Text style={styles.buttonTextSmall}>Novo Produto</Text>
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

    item: {
      borderBottomWidth: 1,
      borderBottomColor: isDark ? '#444' : '#ccc',
      paddingVertical: 6,
      color: isDark ? '#ccc' : '#333',
    },

    primaryButton: {
      backgroundColor: '#0D47A1',
      paddingVertical: 12,
      borderRadius: 6,
      alignItems: 'center',
    },

    buttonText: { color: '#fff', fontWeight: 'bold' },
  });
