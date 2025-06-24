import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuthStore } from './store/useAuthStore';
import { useThemeStore } from './store/useThemeStore';

export default function DashboardScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';
  const [selectedMenu, setSelectedMenu] = useState<string>('Dashboard');

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  const handleGoToSite = () => {
    alert('Abrindo site do e-commerce...');
  };

  const menuItems = ['Dashboard', 'Produtos', 'Notas', 'Orçamentos', 'Lista de Pedidos', 'Gráficos'];

  const styles = getStyles(isDark);

  return (
    <View style={styles.container}>
      {/* Botão de troca de tema escondido no topo */}
      <TouchableOpacity style={styles.hiddenToggleButton} onPress={toggleTheme}>
        <Ionicons name="settings-outline" size={22} color={isDark ? '#fff' : '#333'} />
      </TouchableOpacity>

      {/* Espaço para StatusBar em Android */}
      <View style={styles.statusBarSpacer} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userSection}>
          <Image
            source={{ uri: 'https://via.placeholder.com/50' }}
            style={styles.avatar}
          />
          <Text style={styles.username}>{user}</Text>
        </View>

        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.siteButton} onPress={handleGoToSite}>
            <Text style={styles.headerButtonText}>🌐 Ir para o site</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.headerButtonText}>🚪 Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Conteúdo principal */}
      <View style={styles.mainContent}>
        {/* Menu lateral */}
        <View style={styles.sideMenu}>
          {menuItems.map((item) => (
            <TouchableOpacity
              key={item}
              style={[
                styles.menuItem,
                selectedMenu === item && styles.menuItemSelected
              ]}
              onPress={() => setSelectedMenu(item)}
            >
              <Text
                style={[
                  styles.menuItemText,
                  selectedMenu === item && styles.menuItemTextSelected
                ]}
              >
                {item}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Área de conteúdo */}
        <ScrollView style={styles.contentArea}>
          <Text style={styles.contentTitle}>{selectedMenu}</Text>
          <Text style={styles.contentText}>
            Aqui você poderá colocar a tela de {selectedMenu}. Exemplo: lista de produtos, tabela de orçamentos, gráficos, etc.
          </Text>
        </ScrollView>
      </View>
    </View>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: { flex: 1, backgroundColor: isDark ? '#1c1c1c' : '#f2f2f2' },

  hiddenToggleButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? StatusBar.currentHeight! + 8 : 10,
    right: 12,
    padding: 6,
    borderRadius: 20,
    backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
    zIndex: 999,
  },

  statusBarSpacer: {
    height: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  header: {
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: isDark ? '#22384e' : '#2196F3',
    elevation: 4,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 4,
    borderBottomLeftRadius: 10,
    borderBottomRightRadius: 10,
  },

  userSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },

  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#ffffff',
    marginRight: 10,
  },

  username: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  headerButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },

  siteButton: {
    backgroundColor: '#0D47A1',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
    marginRight: 8,
  },

  logoutButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 5,
  },

  headerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },

  mainContent: { flex: 1, flexDirection: 'row' },

  sideMenu: {
    width: 140,
    backgroundColor: isDark ? '#2c2c2c' : '#ECEFF1',
    paddingTop: 10,
    paddingBottom: 10,
    borderRightWidth: 1,
    borderRightColor: isDark ? '#444' : '#ccc',
  },

  menuItem: {
    paddingVertical: 14,
    paddingHorizontal: 12,
    marginVertical: 4,
    borderRadius: 6,
  },

  menuItemSelected: {
    backgroundColor: isDark ? '#333' : '#BBDEFB',
    borderLeftWidth: 4,
    borderLeftColor: '#0D47A1',
  },

  menuItemText: {
    color: isDark ? '#ccc' : '#37474F',
    fontWeight: 'bold',
  },

  menuItemTextSelected: {
    color: '#0D47A1',
  },

  contentArea: {
    flex: 1,
    padding: 15,
  },

  contentTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    marginBottom: 10,
    color: isDark ? '#fff' : '#000',
  },

  contentText: {
    fontSize: 16,
    color: isDark ? '#ddd' : '#555',
  },
});
