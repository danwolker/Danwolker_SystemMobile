import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

export default function OrdersScreen() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);

  const [search, setSearch] = useState('');
  const mockOrders = [
    { id: 1, cliente: 'Cliente A', total: 'R$ 120,00', status: 'Aguardando Pagamento' },
    { id: 2, cliente: 'Cliente B', total: 'R$ 300,00', status: 'Entregue' },
  ];

  const handleSearch = () => {
    Alert.alert('Buscar Pedido', `Você buscou por: ${search}`);
  };

  const handleViewDetails = (orderId: number) => {
    Alert.alert('Detalhes do Pedido', `Exibindo detalhes do pedido #${orderId}`);
  };

  return (
    <View>
      <Text style={styles.title}>Lista de Pedidos:</Text>

      <TextInput
        placeholder="Buscar pedido..."
        value={search}
        onChangeText={setSearch}
        style={styles.input}
        placeholderTextColor={isDark ? '#aaa' : '#666'}
      />
      <TouchableOpacity style={styles.primaryButton} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {mockOrders.map((order) => (
        <View key={order.id} style={styles.card}>
          <Text style={styles.cardText}>Cliente: {order.cliente}</Text>
          <Text style={styles.cardText}>Total: {order.total}</Text>
          <Text style={styles.cardText}>Status: {order.status}</Text>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => handleViewDetails(order.id)}>
            <Text style={styles.buttonText}>Ver Detalhes</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
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
  primaryButton: {
    backgroundColor: '#0D47A1',
    paddingVertical: 10,
    borderRadius: 6,
    alignItems: 'center',
    marginBottom: 10,
  },
  secondaryButton: {
    backgroundColor: '#2196F3',
    paddingVertical: 8,
    borderRadius: 6,
    alignItems: 'center',
    marginTop: 8,
  },
  buttonText: { color: '#fff', fontWeight: 'bold' },
  card: {
    backgroundColor: isDark ? '#333' : '#fff',
    padding: 10,
    marginBottom: 8,
    borderRadius: 6,
  },
  cardText: { color: isDark ? '#ddd' : '#333', marginBottom: 2 },
});
