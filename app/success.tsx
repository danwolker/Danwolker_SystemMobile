import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Platform, ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAuthStore } from './store/useAuthStore';
import { useThemeStore } from './store/useThemeStore';

// Import das tabs
import BudgetsScreen from './tabs/BudgetsScreen';
import DashboardScreenTab from './tabs/DashboardScreen';
import GraphsScreen from './tabs/GraphsScreen';
import NotesScreen from './tabs/NotesScreen';
import OrdersScreen from './tabs/OrdersScreen';
import ProductScreen from './tabs/ProductScreen';

export default function SuccessScreen() {
  const router = useRouter();
  const user = useAuthStore((state) => state.user);
  const logout = useAuthStore((state) => state.logout);
  const { theme, toggleTheme } = useThemeStore();
  const isDark = theme === 'dark';
  const [selectedMenu, setSelectedMenu] = useState<string>('Dashboard');

  const styles = getStyles(isDark);

  const handleLogout = () => {
    logout();
    router.replace('/');
  };

  const handleGoToSite = () => {
    alert('Abrindo site do e-commerce...');
  };

  const menuItems = ['Dashboard', 'Produtos', 'Notas', 'Orçamentos', 'Pedidos', 'Gráficos'];

  const renderTabContent = () => {
    switch (selectedMenu) {
      case 'Dashboard': return <DashboardScreenTab />;
      case 'Produtos': return <ProductScreen />;
      case 'Notas': return <NotesScreen />;
      case 'Orçamentos': return <BudgetsScreen />;
      case 'Pedidos': return <OrdersScreen />;
      case 'Gráficos': return <GraphsScreen />;
      default: return null;
    }
  };

  return (
    <View style={styles.container}>
      {/* Botão de tema */}
      <TouchableOpacity style={styles.themeToggleButton} onPress={toggleTheme}>
        <Ionicons
          name={isDark ? 'moon-outline' : 'sunny-outline'}
          size={22}
          color={isDark ? '#fff' : '#333'}
        />
      </TouchableOpacity>

      <View style={styles.statusBarSpacer} />

      {/* Header */}
      <View style={styles.header}>
        <View style={styles.userSection}>
          <Image source={{ uri: 'https://via.placeholder.com/50' }} style={styles.avatar} />
          <Text style={styles.username}>{user}</Text>
        </View>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.siteButton} onPress={handleGoToSite}>
            <Text style={styles.headerButtonText}>Ir para o site</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
            <Text style={styles.headerButtonText}>Logout</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Menu principal */}
      <View style={styles.menuContainer}>
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

      {/* Linha divisória */}
      <View style={styles.divider} />

      {/* Conteúdo da tab */}
      <ScrollView style={styles.contentArea}>
        {renderTabContent()}
      </ScrollView>
    </View>
  );
}

const getStyles = (isDark: boolean) => StyleSheet.create({
  container: { flex: 1, backgroundColor: isDark ? '#1c1c1c' : '#f2f2f2' },
  themeToggleButton: {
    position: 'absolute',
    top: Platform.OS === 'android' ? (StatusBar.currentHeight ?? 0) + 10 : 15,
    right: 15,
    padding: 8,
    borderRadius: 20,
    backgroundColor: isDark ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.08)',
    zIndex: 999,
  },
  statusBarSpacer: {
    height: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  header: {
    paddingHorizontal: 15,
    paddingVertical: 12,
    backgroundColor: isDark ? '#22384e' : '#2196F3',
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
    paddingHorizontal: 14,
    borderRadius: 6,
    marginRight: 10,
  },
  logoutButton: {
    backgroundColor: '#D32F2F',
    paddingVertical: 8,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  headerButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 14,
  },
  menuContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: isDark ? '#2c2c2c' : '#ECEFF1',
  },
  menuItem: {
    width: '30%',
    height: 50,
    marginBottom: 10,
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: isDark ? '#333' : '#fff',
  },
  menuItemSelected: {
    backgroundColor: isDark ? '#555' : '#BBDEFB',
  },
  menuItemText: {
    color: isDark ? '#ccc' : '#37474F',
    fontWeight: 'bold',
    fontSize: 15,
  },
  menuItemTextSelected: {
    color: isDark ? '#fff' : '#0D47A1',
  },
  divider: {
    height: 1,
    backgroundColor: isDark ? '#555' : '#ccc',
    marginHorizontal: 10,
    marginBottom: 10,
  },
  contentArea: {
    flex: 1,
    padding: 15,
  },
});
