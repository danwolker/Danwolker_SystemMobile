import React, { useState } from 'react';
import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useThemeStore } from '../store/useThemeStore';

export default function GraphsScreen() {
  const { theme } = useThemeStore();
  const isDark = theme === 'dark';
  const styles = getStyles(isDark);

  const [selectedGraph, setSelectedGraph] = useState<'vendas' | 'clientes' | 'financeiro'>('vendas');

  const handleExportPDF = () => {
    Alert.alert('Exportação', 'PDF com os gráficos exportado com sucesso!');
  };

  const renderGraphContent = () => {
    switch (selectedGraph) {
      case 'vendas':
        return (
          <View>
            <Text style={styles.title}>Total de Vendas no Mês:</Text>
            <Text style={styles.graphMock}>[ Gráfico de Barras Exemplo ]</Text>

            <Text style={styles.title}>Produtos Mais Vendidos:</Text>
            <Text style={styles.graphMock}>[ Gráfico de Pizza Exemplo ]</Text>

            <Text style={styles.title}>Total de Faturamento:</Text>
            <Text style={styles.graphMock}>R$ 12.500,00</Text>
          </View>
        );
      case 'clientes':
        return (
          <View>
            <Text style={styles.title}>Crescimento de Clientes:</Text>
            <Text style={styles.graphMock}>[ Gráfico de Linha Exemplo ]</Text>
          </View>
        );
      case 'financeiro':
        return (
          <View>
            <Text style={styles.title}>Faturamento x Despesas:</Text>
            <Text style={styles.graphMock}>[ Gráfico de Área Exemplo ]</Text>
          </View>
        );
      default:
        return null;
    }
  };

  return (
    <View>
      {/* Botões de Filtro */}
      <View style={styles.buttonRow}>
        <TouchableOpacity
          style={[styles.button, selectedGraph === 'vendas' && styles.buttonSelected]}
          onPress={() => setSelectedGraph('vendas')}
        >
          <Text style={styles.buttonTextSmall}>Vendas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, selectedGraph === 'clientes' && styles.buttonSelected]}
          onPress={() => setSelectedGraph('clientes')}
        >
          <Text style={styles.buttonTextSmall}>Clientes</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, selectedGraph === 'financeiro' && styles.buttonSelected]}
          onPress={() => setSelectedGraph('financeiro')}
        >
          <Text style={styles.buttonTextSmall}>Financeiro</Text>
        </TouchableOpacity>
      </View>

      {/* Conteúdo do Gráfico */}
      {renderGraphContent()}

      {/* Botão Exportar PDF */}
      <TouchableOpacity style={styles.exportButton} onPress={handleExportPDF}>
        <Text style={styles.exportButtonText}>Exportar PDF</Text>
      </TouchableOpacity>
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

    buttonSelected: {
      backgroundColor: isDark ? '#777' : '#2196F3',
    },

    buttonTextSmall: {
      fontWeight: 'bold',
      color: isDark ? '#fff' : '#000',
    },

    title: {
      fontSize: 18,
      fontWeight: 'bold',
      marginTop: 10,
      marginBottom: 4,
      color: isDark ? '#fff' : '#000',
    },

    graphMock: {
      fontSize: 16,
      backgroundColor: isDark ? '#333' : '#EEE',
      textAlign: 'center',
      paddingVertical: 12,
      marginBottom: 10,
      borderRadius: 6,
      color: isDark ? '#fff' : '#000',
    },

    exportButton: {
      marginTop: 20,
      backgroundColor: '#0D47A1',
      paddingVertical: 10,
      borderRadius: 6,
      alignItems: 'center',
    },

    exportButtonText: {
      color: '#fff',
      fontWeight: 'bold',
    },
  });
