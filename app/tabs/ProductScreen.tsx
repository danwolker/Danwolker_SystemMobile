import axios from 'axios';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

export default function ProductScreen() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);

  const API_HOST = process.env.EXPO_PUBLIC_API_HOST;
  const [selectedSubMenu, setSelectedSubMenu] = useState<'listar' | 'adicionar'>('listar');
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    id: '',
    nome: '',
    fabricante: '',
    validade: '',
    custo: '',
    venda: '',
    quantidade: '',
    codigo_barras: '',
  });
  const [search, setSearch] = useState('');
  const [editMode, setEditMode] = useState(false);

  const fetchProducts = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_HOST}/products/get_products.php`);
      setProducts(response.data.products);
    } catch (error) {
      Alert.alert('Erro', 'Não foi possível carregar os produtos.');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedSubMenu === 'listar') fetchProducts();
  }, [selectedSubMenu]);

  const handleSaveProduct = async () => {
    setLoading(true);
    try {
      if (editMode) {
        await axios.post(`${API_HOST}/products/update_product.php`, formData);
        Alert.alert('Sucesso', 'Produto editado com sucesso!');
      } else {
        await axios.post(`${API_HOST}/products/add_product.php`, formData);
        Alert.alert('Sucesso', 'Produto adicionado com sucesso!');
      }
      resetForm();
      setSelectedSubMenu('listar');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao salvar o produto.');
    }
    setLoading(false);
  };

  const handleDeleteProduct = async (id: string) => {
    Alert.alert('Confirmação', 'Tem certeza que deseja excluir este produto?', [
      { text: 'Cancelar', style: 'cancel' },
      {
        text: 'Excluir',
        style: 'destructive',
        onPress: async () => {
          setLoading(true);
          try {
            await axios.post(`${API_HOST}/products/delete_product.php`, { id });
            Alert.alert('Sucesso', 'Produto excluído!');
            fetchProducts();
          } catch (error) {
            Alert.alert('Erro', 'Falha ao excluir o produto.');
          }
          setLoading(false);
        },
      },
    ]);
  };

  const resetForm = () => {
    setFormData({
      id: '',
      nome: '',
      fabricante: '',
      validade: '',
      custo: '',
      venda: '',
      quantidade: '',
      codigo_barras: '',
    });
    setEditMode(false);
  };

  const handleEdit = (product: any) => {
    setFormData(product);
    setEditMode(true);
    setSelectedSubMenu('adicionar');
  };

  const filteredProducts = products.filter((prod) =>
    prod.nome.toLowerCase().includes(search.toLowerCase())
  );

  const renderFormFields = () => (
    <>
      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => Alert.alert('Futuro recurso', 'Leitura de nota fiscal por QR Code em desenvolvimento')}
      >
        <Text style={styles.scanButtonText}>Escanear Nota Fiscal</Text>
      </TouchableOpacity>

      {['nome', 'fabricante', 'validade', 'custo', 'venda', 'quantidade', 'codigo_barras'].map((field) => (
        <TextInput
          key={field}
          placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
          style={styles.input}
          placeholderTextColor={isDark ? '#aaa' : '#666'}
          value={formData[field as keyof typeof formData]}
          onChangeText={(text) => setFormData({ ...formData, [field]: text })}
        />
      ))}
    </>
  );

  const renderContent = () => {
    if (loading) return <ActivityIndicator size="large" color={isDark ? '#fff' : '#000'} />;

    if (selectedSubMenu === 'listar') {
      return (
        <ScrollView>
          <TextInput
            placeholder="Buscar produto por nome..."
            placeholderTextColor={isDark ? '#aaa' : '#666'}
            style={styles.input}
            value={search}
            onChangeText={setSearch}
          />

          {filteredProducts.map((prod) => (
            <View key={prod.id} style={styles.card}>
              <Text style={styles.cardText}>Nome: {prod.nome}</Text>
              <Text style={styles.cardText}>Fabricante: {prod.fabricante}</Text>
              <Text style={styles.cardText}>Validade: {prod.validade}</Text>
              <Text style={styles.cardText}>Custo: {prod.custo}</Text>
              <Text style={styles.cardText}>Venda: {prod.venda}</Text>
              <Text style={styles.cardText}>Quantidade: {prod.quantidade}</Text>
              <Text style={styles.cardText}>Código de Barras: {prod.codigo_barras}</Text>

              <View style={styles.cardButtonRow}>
                <TouchableOpacity style={styles.editButton} onPress={() => handleEdit(prod)}>
                  <Text style={styles.buttonText}>Editar</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.deleteButton} onPress={() => handleDeleteProduct(prod.id)}>
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      );
    }

    if (selectedSubMenu === 'adicionar') {
      return (
        <View>
          {renderFormFields()}
          <TouchableOpacity style={styles.primaryButton} onPress={handleSaveProduct}>
            <Text style={styles.buttonText}>{editMode ? 'Salvar Alterações' : 'Salvar Produto'}</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  return (
    <View>
      {/* TOPO - Botões Listar/Novo lado a lado */}
      <View style={styles.topButtonRow}>
        <TouchableOpacity style={styles.listButton} onPress={() => setSelectedSubMenu('listar')}>
          <Text style={styles.buttonText}>Listar Produtos</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={styles.newButton}
          onPress={() => {
            resetForm();
            setSelectedSubMenu('adicionar');
          }}
        >
          <Text style={styles.buttonText}>Novo Produto</Text>
        </TouchableOpacity>
      </View>

      {renderContent()}
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
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
    cardButtonRow: { flexDirection: 'row', justifyContent: 'space-between', marginTop: 8 },
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
    editButton: {
      flex: 1,
      backgroundColor: '#1976D2',
      paddingVertical: 10,
      borderTopLeftRadius: 6,
      borderBottomLeftRadius: 6,
      alignItems: 'center',
      marginRight: 4,
    },
    deleteButton: {
      flex: 1,
      backgroundColor: '#D32F2F',
      paddingVertical: 10,
      borderTopRightRadius: 6,
      borderBottomRightRadius: 6,
      alignItems: 'center',
      marginLeft: 4,
    },
    buttonText: { color: isDark ? '#fff' : '#000', fontWeight: 'bold' },
    scanButton: {
      backgroundColor: '#1976D2',
      paddingVertical: 10,
      borderRadius: 6,
      alignItems: 'center',
      marginBottom: 10,
    },
    scanButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
