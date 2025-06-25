import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

export default function ProductScreen() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);

  const [selectedSubMenu, setSelectedSubMenu] = useState<'listar' | 'editar' | 'novo'>('listar');

  const mockProdutos = [
    {
      nome: 'Produto A',
      fabricante: 'Empresa X',
      validade: '2026-01-10',
      custo: 'R$ 10,00',
      venda: 'R$ 20,00',
      quantidade: 100,
      codBarras: '7890001234567',
    },
    {
      nome: 'Produto B',
      fabricante: 'Empresa Y',
      validade: '2025-12-05',
      custo: 'R$ 15,00',
      venda: 'R$ 30,00',
      quantidade: 50,
      codBarras: '7890007654321',
    },
  ];

  const renderContent = () => {
    switch (selectedSubMenu) {
      case 'listar':
        return (
          <View>
            <Text style={styles.title}>Lista de Produtos:</Text>
            {mockProdutos.map((produto, index) => (
              <View key={index} style={styles.card}>
                <Text style={styles.cardText}>Nome: {produto.nome}</Text>
                <Text style={styles.cardText}>Fabricante: {produto.fabricante}</Text>
                <Text style={styles.cardText}>Validade: {produto.validade}</Text>
                <Text style={styles.cardText}>Preço de Custo: {produto.custo}</Text>
                <Text style={styles.cardText}>Preço de Venda: {produto.venda}</Text>
                <Text style={styles.cardText}>Quantidade: {produto.quantidade}</Text>
                <Text style={styles.cardText}>Código de Barras: {produto.codBarras}</Text>
              </View>
            ))}
          </View>
        );
      case 'editar':
        return (
          <View>
            <Text style={styles.title}>Editar Produto:</Text>
            <TextInput placeholder="Digite nome ou código" style={styles.input} placeholderTextColor={isDark ? '#ccc' : '#888'} />
          </View>
        );
      case 'novo':
        return (
          <View>
            <Text style={styles.title}>Novo Produto:</Text>
            <TextInput placeholder="Nome do Produto" style={styles.input} placeholderTextColor={isDark ? '#ccc' : '#888'} />
            <TextInput placeholder="Fabricante" style={styles.input} placeholderTextColor={isDark ? '#ccc' : '#888'} />
            <TextInput placeholder="Data de Validade" style={styles.input} placeholderTextColor={isDark ? '#ccc' : '#888'} />
            <TextInput placeholder="Preço de Custo" style={styles.input} placeholderTextColor={isDark ? '#ccc' : '#888'} />
            <TextInput placeholder="Preço de Venda" style={styles.input} placeholderTextColor={isDark ? '#ccc' : '#888'} />
            <TextInput placeholder="Quantidade" style={styles.input} placeholderTextColor={isDark ? '#ccc' : '#888'} />
            <TextInput placeholder="Código de Barras" style={styles.input} placeholderTextColor={isDark ? '#ccc' : '#888'} />
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
          <Text style={styles.buttonText}>Listar Produtos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setSelectedSubMenu('editar')}>
          <Text style={styles.buttonText}>Editar Produto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setSelectedSubMenu('novo')}>
          <Text style={styles.buttonText}>Novo Produto</Text>
        </TouchableOpacity>
      </View>

      {renderContent()}
    </View>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  buttonRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  button: {
    padding: 10,
    backgroundColor: isDark ? '#444' : '#BBDEFB',
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 6,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 10, color: isDark ? '#fff' : '#000' },
  input: {
    borderWidth: 1,
    borderColor: isDark ? '#555' : '#ccc',
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
    color: isDark ? '#fff' : '#000',
  },
  primaryButton: {
    backgroundColor: '#0D47A1',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 10,
  },
  buttonText: { color: isDark ? '#fff' : '#000', fontWeight: 'bold' },
  card: {
    backgroundColor: isDark ? '#333' : '#fff',
    padding: 10,
    marginBottom: 8,
    borderRadius: 6,
    elevation: 1,
  },
  cardText: { color: isDark ? '#ddd' : '#333', marginBottom: 2 },
});
