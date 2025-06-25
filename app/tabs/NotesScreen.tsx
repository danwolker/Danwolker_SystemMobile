import React, { useState } from 'react';
import { ActivityIndicator, Alert, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

export default function NotesScreen() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);

  const [selectedSubMenu, setSelectedSubMenu] = useState<'todas' | 'nova' | 'excluir'>('todas');
  const [loading, setLoading] = useState(false);

  const mockNotas = [
    { id: 1, descricao: 'Nota Fiscal 001', valor: 'R$ 500', vencimento: '2025-07-30' },
    { id: 2, descricao: 'Nota Fiscal 002', valor: 'R$ 700', vencimento: '2025-08-05' },
  ];

  const handleSubMenuChange = (menu: typeof selectedSubMenu) => {
    setLoading(true);
    setTimeout(() => {
      setSelectedSubMenu(menu);
      setLoading(false);
    }, 800);
  };

  const handleSaveNote = () => {
    Alert.alert('Sucesso', 'Nota adicionada com sucesso!');
  };

  const handleDeleteNote = () => {
    Alert.alert('Excluído', 'Nota excluída com sucesso!');
  };

  const renderContent = () => {
    if (loading) return <ActivityIndicator size="large" color={isDark ? '#fff' : '#000'} />;

    switch (selectedSubMenu) {
      case 'todas':
        return (
          <View>
            <Text style={styles.title}>Todas as Notas:</Text>
            {mockNotas.map((nota) => (
              <View key={nota.id} style={styles.card}>
                <Text style={styles.cardText}>Descrição: {nota.descricao}</Text>
                <Text style={styles.cardText}>Valor: {nota.valor}</Text>
                <Text style={styles.cardText}>Vencimento: {nota.vencimento}</Text>
              </View>
            ))}
          </View>
        );
      case 'nova':
        return (
          <View>
            <Text style={styles.title}>Nova Nota:</Text>
            <TextInput placeholder="Descrição" style={styles.input} placeholderTextColor={isDark ? '#aaa' : '#666'} />
            <TextInput placeholder="Valor" style={styles.input} placeholderTextColor={isDark ? '#aaa' : '#666'} />
            <TextInput placeholder="Data de Vencimento" style={styles.input} placeholderTextColor={isDark ? '#aaa' : '#666'} />
            <TouchableOpacity style={styles.primaryButton} onPress={handleSaveNote}>
              <Text style={styles.buttonText}>Salvar Nota</Text>
            </TouchableOpacity>
          </View>
        );
      case 'excluir':
        return (
          <View>
            <Text style={styles.title}>Excluir Nota:</Text>
            <TextInput placeholder="Buscar nota para excluir..." style={styles.input} placeholderTextColor={isDark ? '#aaa' : '#666'} />
            <TouchableOpacity style={[styles.primaryButton, styles.deleteButton]} onPress={handleDeleteNote}>
              <Text style={styles.buttonText}>Excluir Nota</Text>
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
        <TouchableOpacity style={styles.button} onPress={() => handleSubMenuChange('todas')}>
          <Text style={styles.buttonText}>Listar Notas</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleSubMenuChange('nova')}>
          <Text style={styles.buttonText}>Nova Nota</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.button} onPress={() => handleSubMenuChange('excluir')}>
          <Text style={styles.buttonText}>Excluir Nota</Text>
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
  deleteButton: {
    backgroundColor: '#D32F2F',
    marginTop: 10,
  },
  buttonText: { color: isDark ? '#fff' : '#000', fontWeight: 'bold' },
});
