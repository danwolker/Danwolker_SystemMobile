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
    setFormData({
      id: product.id,
      nome: product.nome,
      fabricante: product.fabricante,
      validade: product.validade,
      custo: product.custo,
      venda: product.venda,
      quantidade: product.quantidade,
      codigo_barras: product.codigo_barras,
    });
    setEditMode(true);
    setSelectedSubMenu('adicionar');
  };

  const filteredProducts = products.filter((prod) =>
    prod.nome.toLowerCase().includes(search.toLowerCase())
  );

  const renderFormFields = () => (
    <>
      {/* Botão para futura leitura de nota fiscal */}
      <TouchableOpacity
        style={styles.scanButton}
        onPress={() => Alert.alert('Em breve', 'Leitura de nota fiscal em desenvolvimento...')}
      >
        <Text style={styles.scanButtonText}> Escanear Nota Fiscal (Em desenvolvimento)</Text>
      </TouchableOpacity>

      <TextInput placeholder="Nome" style={styles.input} value={formData.nome} onChangeText={(text) => setFormData({ ...formData, nome: text })} placeholderTextColor={isDark ? '#aaa' : '#666'} />
      <TextInput placeholder="Fabricante" style={styles.input} value={formData.fabricante} onChangeText={(text) => setFormData({ ...formData, fabricante: text })} placeholderTextColor={isDark ? '#aaa' : '#666'} />
      <TextInput placeholder="Validade" style={styles.input} value={formData.validade} onChangeText={(text) => setFormData({ ...formData, validade: text })} placeholderTextColor={isDark ? '#aaa' : '#666'} />
      <TextInput placeholder="Custo" style={styles.input} value={formData.custo} onChangeText={(text) => setFormData({ ...formData, custo: text })} placeholderTextColor={isDark ? '#aaa' : '#666'} />
      <TextInput placeholder="Venda" style={styles.input} value={formData.venda} onChangeText={(text) => setFormData({ ...formData, venda: text })} placeholderTextColor={isDark ? '#aaa' : '#666'} />
      <TextInput placeholder="Quantidade" style={styles.input} value={formData.quantidade} onChangeText={(text) => setFormData({ ...formData, quantidade: text })} placeholderTextColor={isDark ? '#aaa' : '#666'} />
      <TextInput placeholder="Código de Barras" style={styles.input} value={formData.codigo_barras} onChangeText={(text) => setFormData({ ...formData, codigo_barras: text })} placeholderTextColor={isDark ? '#aaa' : '#666'} />
    </>
  );

  const renderContent = () => {
    if (loading) return <ActivityIndicator size="large" color={isDark ? '#fff' : '#000'} />;

    if (selectedSubMenu === 'listar') {
      return (
        <ScrollView>
          <TextInput
            placeholder="Buscar produto por nome..."
            style={styles.input}
            placeholderTextColor={isDark ? '#aaa' : '#666'}
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

              <View style={styles.buttonRowInside}>
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
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => setSelectedSubMenu('listar')}>
          <Text style={styles.buttonText}>Listar Produtos</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => { resetForm(); setSelectedSubMenu('adicionar'); }}>
          <Text style={styles.buttonText}>Novo Produto</Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
    buttonRow: { flexDirection: 'row', flexWrap: 'wrap', marginBottom: 10 },
    buttonRowInside: { flexDirection: 'row', justifyContent: 'flex-end', marginTop: 8 },
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
    editButton: {
      backgroundColor: '#1976D2',
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 6,
      marginRight: 8,
    },
    deleteButton: {
      backgroundColor: '#D32F2F',
      paddingVertical: 8,
      paddingHorizontal: 10,
      borderRadius: 6,
    },
    buttonText: { color: '#fff', fontWeight: 'bold' },
    scanButton: {
      backgroundColor: '#1976D2',
      paddingVertical: 10,
      paddingHorizontal: 12,
      borderRadius: 6,
      marginBottom: 10,
    },
    scanButtonText: {
      color: '#fff',
      fontWeight: 'bold',
      textAlign: 'center',
    },
  });
