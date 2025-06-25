import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

export default function ProductScreen() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);

  const [selectedSubMenu, setSelectedSubMenu] = useState<'listar' | 'editar' | 'adicionar'>('listar');
  const [loading, setLoading] = useState(false);

  const mockProducts = [
    { id: 1, nome: 'Produto A', fabricante: 'Fornecedor X', validade: '2025-12-31', custo: 'R$ 10,00', venda: 'R$ 15,00', quantidade: 30, codigo: '123456789' },
    { id: 2, nome: 'Produto B', fabricante: 'Fornecedor Y', validade: '2026-03-20', custo: 'R$ 20,00', venda: 'R$ 30,00', quantidade: 50, codigo: '987654321' },
  ];

  const handleSubMenuChange = (menu: typeof selectedSubMenu) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedSubMenu(menu);
      setLoading(false);
    }, 1000);
  };

  const handleSave = () => {
    Alert.alert('Sucesso', 'Produto adicionado com sucesso!');
  };

  const renderContent = () => {
    if (loading) return <ActivityIndicator size="large" color={isDark ? '#fff' : '#000'} />;

    switch (selectedSubMenu) {
      case 'listar':
        return (
          <View>
            <Text style={styles.title}>Lista de Produtos:</Text>
            {mockProducts.map((prod) => (
              <View key={prod.id} style={styles.card}>
                <Text style={styles.cardText}>Nome: {prod.nome}</Text>
                <Text style={styles.cardText}>Fabricante: {prod.fabricante}</Text>
                <Text style={styles.cardText}>Validade: {prod.validade}</Text>
                <Text style={styles.cardText}>Custo: {prod.custo}</Text>
                <Text style={styles.cardText}>Venda: {prod.venda}</Text>
                <Text style={styles.cardText}>Quantidade: {prod.quantidade}</Text>
                <Text style={styles.cardText}>Código de Barras: {prod.codigo}</Text>
              </View>
            ))}
          </View>
        );
      case 'editar':
        return (
          <View>
            <Text style={styles.title}>Editar Produto:</Text>
            <TextInput placeholder="Buscar produto..." style={styles.input} placeholderTextColor={isDark ? '#aaa' : '#666'} />
          </View>
        );
      case 'adicionar':
        return (
          <View>
            <Text style={styles.title}>Novo Produto:</Text>
            <TextInput placeholder="Nome" style={styles.input} placeholderTextColor={isDark ? '#aaa' : '#666'} />
            <TextInput placeholder="Fabricante" style={styles.input} placeholderTextColor={isDark ? '#aaa' : '#666'} />
            <TextInput placeholder="Validade" style={styles.input} placeholderTextColor={isDark ? '#aaa' : '#666'} />
            <TextInput placeholder="Preço de Custo" style={styles.input} placeholderTextColor={isDark ? '#aaa' : '#666'} />
            <TextInput placeholder="Preço de Venda" style={styles.input} placeholderTextColor={isDark ? '#aaa' : '#666'} />
            <TextInput placeholder="Quantidade" style={styles.input} placeholderTextColor={isDark ? '#aaa' : '#666'} />
            <TextInput placeholder="Código de Barras" style={styles.input} placeholderTextColor={isDark ? '#aaa' : '#666'} />
            <TouchableOpacity style={styles.primaryButton} onPress={handleSave}>
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
        <TouchableOpacity style={styles.button} onPress={() => handleSubMenuChange('listar')}>
          <Text style={styles.buttonText}>Listar Produtos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleSubMenuChange('editar')}>
          <Text style={styles.buttonText}>Editar Produto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleSubMenuChange('adicionar')}>
          <Text style={styles.buttonText}>Adicionar Produto</Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </View>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  buttonRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 12,
    backgroundColor: isDark ? '#444' : '#BBDEFB',
    borderRadius: 6,
    marginRight: 8,
    marginBottom: 8,
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
