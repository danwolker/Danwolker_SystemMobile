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

export default function NotesScreen() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);

  const API_HOST = process.env.EXPO_PUBLIC_API_HOST;
  const [selectedSubMenu, setSelectedSubMenu] = useState<'todas' | 'nova'>('todas');
  const [loading, setLoading] = useState(false);
  const [notes, setNotes] = useState<any[]>([]);
  const [formData, setFormData] = useState({
    descricao: '',
    valor: '',
    vencimento: '',
  });
  const [search, setSearch] = useState('');

  const fetchNotes = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${API_HOST}/notes/get_notes.php`);
      setNotes(response.data.notes);
    } catch (error) {
      Alert.alert('Erro', 'Falha ao carregar notas fiscais.');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedSubMenu === 'todas') fetchNotes();
  }, [selectedSubMenu]);

  const handleAddNote = async () => {
    if (!formData.descricao || !formData.valor || !formData.vencimento) {
      Alert.alert('Erro', 'Preencha todos os campos.');
      return;
    }
    setLoading(true);
    try {
      await axios.post(`${API_HOST}/notes/add_note.php`, formData);
      Alert.alert('Sucesso', 'Nota fiscal adicionada.');
      setFormData({ descricao: '', valor: '', vencimento: '' });
      setSelectedSubMenu('todas');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao adicionar nota.');
    }
    setLoading(false);
  };

  const handleDeleteNote = async (id: number) => {
    setLoading(true);
    try {
      await axios.post(`${API_HOST}/notes/delete_note.php`, { id });
      Alert.alert('Sucesso', 'Nota excluída.');
      fetchNotes();
    } catch (error) {
      Alert.alert('Erro', 'Falha ao excluir nota.');
    }
    setLoading(false);
  };

  const confirmDelete = (id: number) => {
    Alert.alert(
      'Confirmação',
      'Tem certeza que deseja excluir esta nota?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', onPress: () => handleDeleteNote(id), style: 'destructive' },
      ]
    );
  };

  const handleDetails = (nota: any) => {
    Alert.alert(
      'Detalhes da Nota',
      `Chave de Acesso: ${nota.chave_acesso}
Número NFE: ${nota.numero_nfe}
Série: ${nota.serie}
Data de Emissão: ${nota.data_emissao}
CNPJ Emitente: ${nota.cnpj_emitente}
Nome Emitente: ${nota.nome_emitente}
Valor Total: R$ ${nota.valor_total}
Qtd Itens: ${nota.qtd_itens}
XML: ${nota.xml}
Status: ${nota.status}
Data de Importação: ${nota.data_importacao}`
    );
  };

  const filteredNotes = notes.filter((nota) =>
    nota.nome_emitente.toLowerCase().includes(search.toLowerCase())
  );

  const renderContent = () => {
    if (loading) return <ActivityIndicator size="large" color={isDark ? '#fff' : '#000'} />;

    if (selectedSubMenu === 'todas') {
      return (
        <ScrollView>
          <Text style={styles.title}>Notas Fiscais:</Text>

          <TextInput
            placeholder="Buscar por nome do emitente..."
            placeholderTextColor={isDark ? '#aaa' : '#666'}
            value={search}
            onChangeText={setSearch}
            style={styles.input}
          />

          {filteredNotes.map((nota) => (
            <View key={nota.id} style={styles.card}>
              <Text style={styles.cardText}>Nome: {nota.nome_emitente}</Text>
              <Text style={styles.cardText}>Valor: R$ {nota.valor_total}</Text>
              <Text style={styles.cardText}>Vencimento: {nota.data_emissao}</Text>

              <View style={styles.cardButtonRow}>
                <TouchableOpacity style={styles.detailsButton} onPress={() => handleDetails(nota)}>
                  <Text style={styles.buttonText}>Detalhes</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.deleteButton} onPress={() => confirmDelete(nota.id)}>
                  <Text style={styles.buttonText}>Excluir</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </ScrollView>
      );
    }

    if (selectedSubMenu === 'nova') {
      return (
        <View>
          <Text style={styles.title}>Nova Nota:</Text>

          {/* Botão para futura leitura de QR Code */}
          <TouchableOpacity
            style={styles.qrButton}
            onPress={() => Alert.alert('Em desenvolvimento', 'Leitura por QR Code em breve.')}
          >
            <Text style={styles.qrButtonText}>Ler Nota via QR Code</Text>
          </TouchableOpacity>

          <TextInput
            placeholder="Descrição"
            placeholderTextColor={isDark ? '#aaa' : '#666'}
            value={formData.descricao}
            onChangeText={(text) => setFormData({ ...formData, descricao: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Valor"
            placeholderTextColor={isDark ? '#aaa' : '#666'}
            value={formData.valor}
            onChangeText={(text) => setFormData({ ...formData, valor: text })}
            style={styles.input}
          />
          <TextInput
            placeholder="Data de Vencimento"
            placeholderTextColor={isDark ? '#aaa' : '#666'}
            value={formData.vencimento}
            onChangeText={(text) => setFormData({ ...formData, vencimento: text })}
            style={styles.input}
          />
          <TouchableOpacity style={styles.primaryButton} onPress={handleAddNote}>
            <Text style={styles.buttonText}>Salvar Nota</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  return (
    <View>
      {/* TOPO - Botões Listar/Nova lado a lado */}
      <View style={styles.topButtonRow}>
        <TouchableOpacity style={styles.listButton} onPress={() => setSelectedSubMenu('todas')}>
          <Text style={styles.buttonText}>Listar Notas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.newButton} onPress={() => setSelectedSubMenu('nova')}>
          <Text style={styles.buttonText}>Nova Nota</Text>
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
    deleteButton: {
      flex: 1,
      backgroundColor: '#D32F2F',
      paddingVertical: 10,
      borderTopRightRadius: 6,
      borderBottomRightRadius: 6,
      alignItems: 'center',
      marginLeft: 4,
    },
    detailsButton: {
      flex: 1,
      backgroundColor: '#1976D2',
      paddingVertical: 10,
      borderTopLeftRadius: 6,
      borderBottomLeftRadius: 6,
      alignItems: 'center',
      marginRight: 4,
    },
    qrButton: {
      backgroundColor: '#1976D2',
      paddingVertical: 10,
      borderRadius: 6,
      alignItems: 'center',
      marginBottom: 10,
    },
    qrButtonText: { color: '#fff', fontWeight: 'bold' },
    buttonText: { color: isDark ? '#fff' : '#000', fontWeight: 'bold' },
  });
