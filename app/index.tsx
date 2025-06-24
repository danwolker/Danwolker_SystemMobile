import { Ionicons } from '@expo/vector-icons';
import axios from 'axios';
import { useRouter } from 'expo-router';
import React, { useState } from 'react';
import { Image, Modal, Platform, SafeAreaView, StatusBar, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useAuthStore } from './store/useAuthStore';
import { useThemeStore } from './store/useThemeStore';

export default function App() {
    const router = useRouter();
    const { theme, toggleTheme } = useThemeStore();
    const isDark = theme === 'dark';

    const [loginInput, setLoginInput] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordNew, setPasswordNew] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const [showPasswordLogin, setShowPasswordLogin] = useState<boolean>(false);
    const [showPasswordRegister, setShowPasswordRegister] = useState<boolean>(false);
    const [modalVisible, setModalVisible] = useState<boolean>(false);
    const [alertModalVisible, setAlertModalVisible] = useState<boolean>(false);
    const API_HOST = process.env.EXPO_PUBLIC_API_HOST;

    const styles = getStyles(isDark);

    const handleRegister = async () => {
        try {
            const response = await axios.post(`${API_HOST}/register.php`, {
                email,
                username,
                password: passwordNew,
            });
            setMessage(response.data.message);
            setModalVisible(false);
        } catch (error) {
            setMessage('Erro ao cadastrar.');
        }
    };

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_HOST}/login.php`, {
                user: loginInput,
                password,
            });
            setMessage(response.data.message);

            if (response.data.status === 'success') {
                useAuthStore.getState().setUser(loginInput);
                router.push('./success');
            }
        } catch (error) {
            setMessage('Erro ao fazer login.');
        }
    };

    const handleRecover = async () => {
        if (!loginInput.trim()) {
            setAlertModalVisible(true);
            return;
        }

        try {
            const response = await axios.post(`${API_HOST}/recover.php`, {
                email: loginInput,
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Erro ao recuperar senha.');
        }
    };

    return (
        <SafeAreaView style={styles.container}>
            {/* Botão discreto para mudar o tema */}
           <TouchableOpacity style={styles.hiddenToggleButton} onPress={toggleTheme}>
  <Ionicons
    name={isDark ? 'moon-outline' : 'sunny-outline'}
    size={22}
    color={isDark ? '#fff' : '#333'}
  />
</TouchableOpacity>


            <Image
                source={require('../assets/images/logodw.png')}
                style={styles.logo}
                resizeMode="contain"
            />

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Email ou Nome de Usuário:</Text>
                <TextInput
                    placeholder="Digite seu email ou usuário"
                    placeholderTextColor="#ffffff"
                    value={loginInput}
                    onChangeText={setLoginInput}
                    style={styles.input}
                    autoCapitalize="none"
                />
            </View>

            <View style={styles.inputContainer}>
                <Text style={styles.label}>Senha:</Text>
                <View style={styles.passwordContainer}>
                    <TextInput
                        placeholder="Digite sua senha"
                        placeholderTextColor="#ffffff"
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry={!showPasswordLogin}
                        style={styles.passwordInput}
                    />
                    <TouchableOpacity onPress={() => setShowPasswordLogin(!showPasswordLogin)}>
                        <Ionicons
                            name={showPasswordLogin ? 'eye-off' : 'eye'}
                            size={24}
                            color="gray"
                        />
                    </TouchableOpacity>
                </View>
            </View>

            <TouchableOpacity style={styles.button} onPress={handleLogin}>
                <Text style={styles.buttonText}>LOGIN</Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.button} onPress={handleRecover}>
                <Text style={styles.buttonText}>RECUPERAR SENHA</Text>
            </TouchableOpacity>

            <Text style={styles.footerText}>
                Não possui uma conta?{' '}
                <Text style={styles.linkText} onPress={() => setModalVisible(true)}>
                    Cadastre-se aqui!
                </Text>
            </Text>

            {message !== '' && (
                <Text style={styles.message}>{message}</Text>
            )}

            {/* Modal de Cadastro */}
            <Modal visible={modalVisible} animationType="slide" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Cadastro</Text>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Email:</Text>
                            <TextInput
                                placeholder="Digite seu email"
                                placeholderTextColor="#ffffff"
                                value={email}
                                onChangeText={setEmail}
                                style={styles.input}
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Nome de Usuário:</Text>
                            <TextInput
                                placeholder="Digite seu nome de usuário"
                                placeholderTextColor="#ffffff"
                                value={username}
                                onChangeText={setUsername}
                                style={styles.input}
                                autoCapitalize="none"
                            />
                        </View>

                        <View style={styles.inputContainer}>
                            <Text style={styles.label}>Senha:</Text>
                            <View style={styles.passwordContainer}>
                                <TextInput
                                    placeholder="Digite sua senha"
                                    placeholderTextColor="#ffffff"
                                    value={passwordNew}
                                    onChangeText={setPasswordNew}
                                    secureTextEntry={!showPasswordRegister}
                                    style={styles.passwordInput}
                                />
                                <TouchableOpacity onPress={() => setShowPasswordRegister(!showPasswordRegister)}>
                                    <Ionicons
                                        name={showPasswordRegister ? 'eye-off' : 'eye'}
                                        size={24}
                                        color="gray"
                                    />
                                </TouchableOpacity>
                            </View>
                        </View>

                        <TouchableOpacity style={styles.modalButton} onPress={handleRegister}>
                            <Text style={styles.modalButtonText}>CADASTRAR</Text>
                        </TouchableOpacity>

                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text style={styles.closeText}>Fechar</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>

            {/* Modal de Alerta */}
            <Modal visible={alertModalVisible} animationType="fade" transparent>
                <View style={styles.modalContainer}>
                    <View style={styles.modalContent}>
                        <Text style={styles.modalTitle}>Atenção</Text>
                        <Text style={styles.modalMessage}>
                            Por favor, insira seu email ou nome de usuário corretamente antes de solicitar a recuperação de senha.
                        </Text>
                        <TouchableOpacity style={styles.modalButton} onPress={() => setAlertModalVisible(false)}>
                            <Text style={styles.modalButtonText}>OK</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </Modal>
        </SafeAreaView>
    );
}

const getStyles = (isDark: boolean) =>
    StyleSheet.create({
        container: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            paddingHorizontal: 20,
            backgroundColor: isDark ? '#1c1c1c' : '#f2f2f2',
        },
        hiddenToggleButton: {
            position: 'absolute',
            top: Platform.OS === 'android' ? StatusBar.currentHeight! + 8 : 10,
            right: 12,
            padding: 6,
            borderRadius: 20,
            backgroundColor: isDark ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.1)',
            zIndex: 999,
        },
        logo: {
            width: 220,
            height: 120,
            marginBottom: 20,
            tintColor: '#ffffff',
        },
        inputContainer: {
            width: '100%',
            marginBottom: 12,
        },
        label: {
            alignSelf: 'flex-start',
            marginBottom: 4,
            color: isDark ? '#e0e0e0' : '#333',
            fontWeight: 'bold',
        },
        input: {
            borderWidth: 1,
            borderColor: isDark ? '#666' : '#ccc',
            padding: 10,
            borderRadius: 8,
            backgroundColor: isDark ? '#333' : '#fff',
            color: isDark ? '#fff' : '#000',
        },
        passwordContainer: {
            flexDirection: 'row',
            alignItems: 'center',
            borderWidth: 1,
            borderColor: isDark ? '#666' : '#ccc',
            borderRadius: 8,
            paddingHorizontal: 10,
            backgroundColor: isDark ? '#333' : '#fff',
        },
        passwordInput: {
            flex: 1,
            height: 40,
            color: isDark ? '#fff' : '#000',
        },
        button: {
            backgroundColor: isDark ? '#1565C0' : '#1976D2',
            paddingVertical: 12,
            borderRadius: 8,
            marginTop: 8,
            width: '100%',
        },
        buttonText: {
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        footerText: {
            marginTop: 18,
            color: isDark ? '#aaa' : '#555',
        },
        linkText: {
            color: '#42A5F5',
            fontWeight: 'bold',
        },
        message: {
            marginTop: 10,
            color: '#FF6B6B',
            textAlign: 'center',
        },
        modalContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0,0,0,0.7)',
        },
        modalContent: {
            backgroundColor: isDark ? '#2c2c2c' : '#fff',
            padding: 20,
            borderRadius: 10,
            width: '85%',
        },
        modalTitle: {
            fontSize: 18,
            fontWeight: 'bold',
            marginBottom: 10,
            textAlign: 'center',
            color: isDark ? '#fff' : '#000',
        },
        modalMessage: {
            fontSize: 15,
            textAlign: 'center',
            marginBottom: 10,
            color: isDark ? '#ddd' : '#333',
        },
        modalButton: {
            backgroundColor: '#1565C0',
            paddingVertical: 10,
            borderRadius: 8,
            marginTop: 10,
        },
        modalButtonText: {
            color: '#fff',
            fontWeight: 'bold',
            textAlign: 'center',
        },
        closeText: {
            color: '#FF6B6B',
            textAlign: 'center',
            marginTop: 10,
        },
    });
