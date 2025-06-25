import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';

export default function ProductScreen() {
  const [selectedSubMenu, setSelectedSubMenu] = useState<'listar' | 'editar' | 'adicionar'>('listar');

  const mockProdutos = ['Produto A', 'Produto B', 'Produto C', 'Produto D'];

  const renderContent = () => {
    switch (selectedSubMenu) {
      case 'listar':
        return (
          <View>
            <Text style={styles.title}>Produtos:</Text>
            {mockProdutos.map((produto, index) => (
              <Text key={index} style={styles.item}>{produto}</Text>
            ))}
          </View>
        );
      case 'editar':
        return (
          <View>
            <Text style={styles.title}>Editar Produto:</Text>
            <TextInput placeholder="Buscar produto para editar..." style={styles.input} />
          </View>
        );
      case 'adicionar':
        return (
          <View>
            <Text style={styles.title}>Novo Produto:</Text>
            <TextInput placeholder="Nome do novo produto..." style={styles.input} />
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
          <Text>Todos Produtos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setSelectedSubMenu('editar')}>
          <Text>Editar Produto</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setSelectedSubMenu('adicionar')}>
          <Text>Novo Produto</Text>
        </TouchableOpacity>
      </View>

      {renderContent()}
    </View>
  );
}

const styles = StyleSheet.create({
  buttonRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
  button: {
    padding: 10,
    backgroundColor: '#BBDEFB',
    marginRight: 8,
    marginBottom: 8,
    borderRadius: 6,
  },
  title: { fontSize: 18, fontWeight: 'bold', marginBottom: 6 },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    borderRadius: 5,
    marginBottom: 10,
  },
  item: {
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
    paddingVertical: 6,
  },
});
