import React, { useState } from 'react';
import { StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

export default function OrdersScreen() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);

  const [selectedSubMenu, setSelectedSubMenu] = useState<'listar' | 'buscar' | 'detalhes'>('listar');
  const [searchInput, setSearchInput] = useState('');

  const mockOrders = [
    { id: 'PED001', cliente: 'Cliente X', valor: 'R$ 300,00', status: 'Pendente' },
    { id: 'PED002', cliente: 'Cliente Y', valor: 'R$ 450,00', status: 'Entregue' },
    { id: 'PED003', cliente: 'Cliente Z', valor: 'R$ 120,00', status: 'Aguardando Pagamento' },
  ];

  const renderContent = () => {
    switch (selectedSubMenu) {
      case 'listar':
        return (
          <View>
            <Text style={styles.title}>Todos os Pedidos:</Text>
            <Text style={styles.count}>Total: {mockOrders.length}</Text>
            {mockOrders.map((order) => (
              <View key={order.id} style={styles.card}>
                <Text style={styles.cardTitle}>Pedido: {order.id}</Text>
                <Text style={styles.cardText}>Cliente: {order.cliente}</Text>
                <Text style={styles.cardText}>Valor: {order.valor}</Text>
                <Text style={styles.cardText}>Status: {order.status}</Text>
              </View>
            ))}
          </View>
        );
      case 'buscar':
        return (
          <View>
            <Text style={styles.title}>Buscar Pedido:</Text>
            <TextInput
              placeholder="Digite o código do pedido..."
              placeholderTextColor={isDark ? '#999' : '#888'}
              value={searchInput}
              onChangeText={setSearchInput}
              style={styles.input}
            />
            <TouchableOpacity style={styles.primaryButton}>
              <Text style={styles.buttonText}>Buscar</Text>
            </TouchableOpacity>
          </View>
        );
      case 'detalhes':
        return (
          <View>
            <Text style={styles.title}>Detalhes do Pedido:</Text>
            <Text style={styles.cardText}>Pedido: PED001</Text>
            <Text style={styles.cardText}>Cliente: Cliente X</Text>
            <Text style={styles.cardText}>Produtos: Produto A, Produto B</Text>
            <Text style={styles.cardText}>Valor Total: R$ 300,00</Text>
            <Text style={styles.cardText}>Status: Pendente</Text>
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
          <Text style={styles.buttonTextSmall}>Listar Pedidos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setSelectedSubMenu('buscar')}>
          <Text style={styles.buttonTextSmall}>Buscar Pedido</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setSelectedSubMenu('detalhes')}>
          <Text style={styles.buttonTextSmall}>Ver Detalhes</Text>
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

    count: {
      fontSize: 16,
      marginBottom: 8,
      color: isDark ? '#ccc' : '#444',
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
