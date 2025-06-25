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
  const [selectedSubMenu, setSelectedSubMenu] = useState<'todas' | 'nova' | 'excluir'>('todas');
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
      if (response.data.notes && Array.isArray(response.data.notes)) {
        setNotes(response.data.notes);
      } else {
        setNotes([]);
      }
    } catch (error) {
      setNotes([]);
      Alert.alert('Erro', 'Não foi possível carregar as notas.');
    }
    setLoading(false);
  };

  useEffect(() => {
    if (selectedSubMenu === 'todas') fetchNotes();
  }, [selectedSubMenu]);

  const handleSaveNote = async () => {
    if (!formData.descricao || !formData.valor || !formData.vencimento) {
      Alert.alert('Atenção', 'Preencha todos os campos.');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_HOST}/notes/add_note.php`, formData);
      Alert.alert('Sucesso', 'Nota adicionada com sucesso!');
      setFormData({ descricao: '', valor: '', vencimento: '' });
      setSelectedSubMenu('todas');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao adicionar a nota.');
    }
    setLoading(false);
  };

  const handleDeleteNote = async (id: number) => {
    Alert.alert(
      'Confirmar Exclusão',
      `Tem certeza que deseja excluir a nota ${id}?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Excluir',
          style: 'destructive',
          onPress: async () => {
            setLoading(true);
            try {
              await axios.post(`${API_HOST}/notes/delete_note.php`, { id });
              Alert.alert('Excluído', 'Nota excluída com sucesso!');
              fetchNotes();
            } catch (error) {
              Alert.alert('Erro', 'Não foi possível excluir a nota.');
            }
            setLoading(false);
          },
        },
      ]
    );
  };

  const renderFormFields = () => (
    <>
      <TextInput
        placeholder="Descrição"
        style={styles.input}
        placeholderTextColor={isDark ? '#aaa' : '#666'}
        value={formData.descricao}
        onChangeText={(text) => setFormData({ ...formData, descricao: text })}
      />
      <TextInput
        placeholder="Valor"
        style={styles.input}
        placeholderTextColor={isDark ? '#aaa' : '#666'}
        value={formData.valor}
        onChangeText={(text) => setFormData({ ...formData, valor: text })}
      />
      <TextInput
        placeholder="Data de Vencimento"
        style={styles.input}
        placeholderTextColor={isDark ? '#aaa' : '#666'}
        value={formData.vencimento}
        onChangeText={(text) => setFormData({ ...formData, vencimento: text })}
      />
    </>
  );

  const renderContent = () => {
    if (loading) return <ActivityIndicator size="large" color={isDark ? '#fff' : '#000'} />;

    if (selectedSubMenu === 'todas') {
      const filteredNotes = notes.filter((nota) =>
        nota.descricao.toLowerCase().includes(search.toLowerCase())
      );

      return (
        <ScrollView>
          <TextInput
            placeholder="Buscar por descrição..."
            value={search}
            onChangeText={setSearch}
            style={styles.input}
            placeholderTextColor={isDark ? '#aaa' : '#666'}
          />
          {Array.isArray(filteredNotes) && filteredNotes.map((nota) => (
            <View key={nota.id} style={styles.card}>
              <Text style={styles.cardText}>ID: {nota.id}</Text>
              <Text style={styles.cardText}>Descrição: {nota.descricao}</Text>
              <Text style={styles.cardText}>Valor: R$ {nota.valor}</Text>
              <Text style={styles.cardText}>Vencimento: {nota.vencimento}</Text>
              <TouchableOpacity
                style={[styles.primaryButton, styles.deleteButton]}
                onPress={() => handleDeleteNote(nota.id)}
              >
                <Text style={styles.buttonText}>Excluir</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      );
    }

    if (selectedSubMenu === 'nova') {
      return (
        <View>
          <Text style={styles.title}>Nova Nota:</Text>
          {renderFormFields()}
          <TouchableOpacity style={styles.primaryButton} onPress={handleSaveNote}>
            <Text style={styles.buttonText}>Salvar Nota</Text>
          </TouchableOpacity>
        </View>
      );
    }

    return null;
  };

  return (
    <View>
      <View style={styles.buttonRow}>
        <TouchableOpacity style={styles.button} onPress={() => setSelectedSubMenu('todas')}>
          <Text style={styles.buttonText}>Listar Notas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => setSelectedSubMenu('nova')}>
          <Text style={styles.buttonText}>Nova Nota</Text>
        </TouchableOpacity>
      </View>
      {renderContent()}
    </View>
  );
}

const getStyles = (isDark: boolean) =>
  StyleSheet.create({
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
    deleteButton: {
      backgroundColor: '#D32F2F',
      marginTop: 10,
    },
    buttonText: { color: '#fff', fontWeight: 'bold' },
  });
