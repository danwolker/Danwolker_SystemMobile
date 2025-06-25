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
  const [parcelas, setParcelas] = useState<string[]>(['']);
  const [formData, setFormData] = useState({
    chave_acesso: '',
    numero_nfe: '',
    serie: '',
    data_emissao: '',
    cnpj_emitente: '',
    nome_emitente: '',
    valor_total: '',
    qtd_itens: '',
    xml: '',
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
    for (const [key, value] of Object.entries(formData)) {
      if (!value) {
        Alert.alert('Erro', `Preencha o campo: ${key}`);
        return;
      }
    }

    if (parcelas.some((p) => !p.trim())) {
      Alert.alert('Erro', 'Preencha todas as datas das parcelas ou remova as em branco.');
      return;
    }

    setLoading(true);
    try {
      await axios.post(`${API_HOST}/notes/add_note.php`, {
        ...formData,
        parcelas: parcelas,
      });
      Alert.alert('Sucesso', 'Nota fiscal adicionada.');
      setFormData({
        chave_acesso: '',
        numero_nfe: '',
        serie: '',
        data_emissao: '',
        cnpj_emitente: '',
        nome_emitente: '',
        valor_total: '',
        qtd_itens: '',
        xml: '',
      });
      setParcelas(['']);
      setSelectedSubMenu('todas');
    } catch (error) {
      Alert.alert('Erro', 'Falha ao adicionar nota.');
    }
    setLoading(false);
  };

  const addParcela = () => setParcelas([...parcelas, '']);

  const removeParcela = () => {
    if (parcelas.length > 1) {
      setParcelas(parcelas.slice(0, -1));
    } else {
      Alert.alert('Aviso', 'Você precisa ter ao menos uma parcela.');
    }
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
    Alert.alert('Confirmação', 'Tem certeza que deseja excluir esta nota?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Excluir', onPress: () => handleDeleteNote(id), style: 'destructive' },
    ]);
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
Valor Total: R$ ${nota.valor_total}`
    );
  };

  const filteredNotes = notes.filter((nota) =>
    nota.nome_emitente.toLowerCase().includes(search.toLowerCase())
  );

  const renderContent = () => {
    if (loading) return <ActivityIndicator size="large" color={isDark ? '#fff' : '#000'} />;

    if (selectedSubMenu === 'todas') {
      return (
        <ScrollView style={{ padding: 10 }}>
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
        <ScrollView style={{ padding: 10 }}>
          <Text style={styles.title}>Nova Nota:</Text>

          {Object.keys(formData).map((field) => (
            <TextInput
              key={field}
              placeholder={field.replace(/_/g, ' ').toUpperCase()}
              placeholderTextColor={isDark ? '#aaa' : '#666'}
              value={formData[field as keyof typeof formData]}
              onChangeText={(text) => setFormData({ ...formData, [field]: text })}
              style={styles.input}
            />
          ))}

          <Text style={[styles.title, { marginTop: 20 }]}>Parcelas:</Text>
          {parcelas.map((parcela, index) => (
            <TextInput
              key={index}
              placeholder={`Data da Parcela ${index + 1} (YYYY-MM-DD)`}
              placeholderTextColor={isDark ? '#aaa' : '#666'}
              value={parcela}
              onChangeText={(text) => {
                const novas = [...parcelas];
                novas[index] = text;
                setParcelas(novas);
              }}
              style={styles.input}
            />
          ))}

          <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginVertical: 10 }}>
            <TouchableOpacity
              onPress={addParcela}
              style={[styles.primaryButton, { flex: 1, marginRight: 8 }]}
            >
              <Text style={styles.buttonText}>Adicionar Parcela</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={removeParcela}
              style={[styles.deleteButton, { flex: 1, marginLeft: 8 }]}
            >
              <Text style={styles.buttonText}>Remover Parcela</Text>
            </TouchableOpacity>
          </View>

          <TouchableOpacity
            style={[styles.primaryButton, { marginTop: 20, marginBottom: 30 }]}
            onPress={handleAddNote}
          >
            <Text style={styles.buttonText}>Salvar Nota</Text>
          </TouchableOpacity>
        </ScrollView>
      );
    }

    return null;
  };

  return (
    <View>
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
      padding: 10,
      borderRadius: 6,
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
      paddingVertical: 12,
      borderRadius: 6,
      alignItems: 'center',
      marginTop: 10,
    },
    deleteButton: {
      backgroundColor: '#D32F2F',
      paddingVertical: 12,
      borderRadius: 6,
      alignItems: 'center',
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
    buttonText: { color: isDark ? '#fff' : '#000', fontWeight: 'bold', textAlign: 'center' },
  });
