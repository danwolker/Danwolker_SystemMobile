import React, { useState } from 'react';
import {
  Alert,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

export default function OrdersScreen() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);

  const [search, setSearch] = useState('');
  const [selectedStatus, setSelectedStatus] = useState<'Todos' | 'Aguardando' | 'Entregue'>('Todos');

  const mockOrders = [
    { id: 1, cliente: 'Cliente A', total: 'R$ 120,00', status: 'Aguardando Pagamento' },
    { id: 2, cliente: 'Cliente B', total: 'R$ 300,00', status: 'Entregue' },
    { id: 3, cliente: 'Cliente C', total: 'R$ 150,00', status: 'Aguardando Pagamento' },
  ];

  const filteredOrders = mockOrders.filter((order) => {
    if (selectedStatus === 'Todos') return true;
    if (selectedStatus === 'Aguardando') return order.status === 'Aguardando Pagamento';
    if (selectedStatus === 'Entregue') return order.status === 'Entregue';
    return true;
  });

  const handleSearch = () => {
    Alert.alert('Buscar Pedido', `Você buscou por: ${search}`);
  };

  const handleViewDetails = (orderId: number) => {
    Alert.alert('Detalhes do Pedido', `Exibindo detalhes do pedido #${orderId}`);
  };

  return (
    <View>
      <Text style={styles.title}>Total de pedidos: {filteredOrders.length}</Text>

      {/* Filtros de Status */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, selectedStatus === 'Todos' && styles.buttonSelected]}
          onPress={() => setSelectedStatus('Todos')}
        >
          <Text style={styles.buttonText}>Todos</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, selectedStatus === 'Aguardando' && styles.buttonSelected]}
          onPress={() => setSelectedStatus('Aguardando')}
        >
          <Text style={styles.buttonText}>Aguardando Pagamento</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, selectedStatus === 'Entregue' && styles.buttonSelected]}
          onPress={() => setSelectedStatus('Entregue')}
        >
          <Text style={styles.buttonText}>Entregue</Text>
        </TouchableOpacity>
      </View>

      {/* Campo de Busca */}
      <TextInput
        placeholder="Buscar pedido por nome ou número..."
        value={search}
        onChangeText={setSearch}
        style={styles.input}
        placeholderTextColor={isDark ? '#aaa' : '#666'}
      />
      <TouchableOpacity style={styles.primaryButton} onPress={handleSearch}>
        <Text style={styles.buttonText}>Buscar</Text>
      </TouchableOpacity>

      {/* Lista de Pedidos */}
      {filteredOrders.map((order) => (
        <View key={order.id} style={styles.card}>
          <Text style={styles.cardText}><Text style={styles.cardLabel}>Cliente:</Text> {order.cliente}</Text>
          <Text style={styles.cardText}><Text style={styles.cardLabel}>Total:</Text> {order.total}</Text>
          <Text style={styles.cardText}><Text style={styles.cardLabel}>Status:</Text> {order.status}</Text>

          <TouchableOpacity
            style={styles.secondaryButton}
            onPress={() => handleViewDetails(order.id)}
          >
            <Text style={styles.buttonText}>Ver Detalhes</Text>
          </TouchableOpacity>
        </View>
      ))}
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    title: {
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 12,
      color: isDark ? '#fff' : '#000',
    },

    buttonRow: {
      flexDirection: 'row',
      flexWrap: 'wrap',
      marginBottom: 12,
    },

    button: {
      paddingVertical: 10,
      paddingHorizontal: 12,
      backgroundColor: isDark ? '#555' : '#BBDEFB',
      borderRadius: 6,
      marginRight: 8,
      marginBottom: 8,
    },

    buttonSelected: {
      backgroundColor: isDark ? '#777' : '#2196F3',
    },

    buttonText: {
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000',
    },

    input: {
      borderWidth: 1,
      borderColor: isDark ? '#555' : '#ccc',
      padding: 10,
      borderRadius: 6,
      marginBottom: 10,
      color: isDark ? '#fff' : '#000',
      backgroundColor: isDark ? '#222' : '#fff',
    },

    primaryButton: {
      backgroundColor: '#0D47A1',
      paddingVertical: 10,
      borderRadius: 6,
      alignItems: 'center',
      marginBottom: 12,
    },

    secondaryButton: {
      backgroundColor: '#2196F3',
      paddingVertical: 8,
      borderRadius: 6,
      alignItems: 'center',
      marginTop: 8,
    },

    card: {
      backgroundColor: isDark ? '#333' : '#fff',
      padding: 12,
      marginBottom: 10,
      borderRadius: 8,
      shadowColor: '#000',
      shadowOpacity: 0.05,
      shadowOffset: { width: 0, height: 1 },
      shadowRadius: 2,
      elevation: 1,
    },

    cardText: {
      color: isDark ? '#ddd' : '#333',
      marginBottom: 4,
    },

    cardLabel: {
      fontWeight: 'bold',
    },
  });
