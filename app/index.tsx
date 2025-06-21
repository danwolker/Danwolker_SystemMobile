import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';
import axios from 'axios';

export default function App() {
    const [loginInput, setLoginInput] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [username, setUsername] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [message, setMessage] = useState<string>('');
    const API_HOST = process.env.EXPO_PUBLIC_API_HOST;
    console.log('API_HOST:', API_HOST);

    // Cadastro: email + username + password
    const handleRegister = async () => {
        try {
            const response = await axios.post(`${API_HOST}/register.php`, {
                email, 
                username, 
                password 
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Erro ao cadastrar.');
        }
    };

    // Login: email ou username + password
    const handleLogin = async () => {
        try {
            const response = await axios.post(`${API_HOST}/login.php`, {
                user: loginInput,
                password 
            });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Erro ao fazer login.');
        }
    };

    // Recuperação: email
    const handleRecover = async () => {
        try {
            const response = await axios.post(`${API_HOST}/recover.php`,
                { email: loginInput });
            setMessage(response.data.message);
        } catch (error) {
            setMessage('Erro ao recuperar senha.');
        }
    };

    return (
        <View style={styles.container}>

            <TextInput
                placeholder="Email ou Nome de Usuário"
                value={loginInput}
                onChangeText={setLoginInput}
                style={styles.input}
                autoCapitalize="none"
            />
            <TextInput
                placeholder="Senha"
                value={password}
                onChangeText={setPassword}
                secureTextEntry
                style={styles.input}
            />

            <View style={styles.button}>
                <Button title="Login" onPress={handleLogin} />
            </View>

            <View style={styles.button}>
                <Button title="Recuperar Senha" onPress={handleRecover} />
            </View>

            <View style={styles.registerContainer}>
                <Text style={styles.registerText}>Não possui uma conta?</Text>
                <TextInput
                    placeholder="Email para cadastro"
                    value={email}
                    onChangeText={setEmail}
                    style={styles.registerInput}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Nome de Usuário para cadastro"
                    value={username}
                    onChangeText={setUsername}
                    style={styles.registerInput}
                    autoCapitalize="none"
                />
                <TextInput
                    placeholder="Senha para cadastro"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                    style={styles.registerInput}
                />
                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                    <Text style={styles.registerButtonText}>CADASTRAR</Text>
                </TouchableOpacity>
            </View>

            <Text style={styles.message}>{message}</Text>
        </View>
    );
}

const styles = StyleSheet.create({
    container: { flex: 1, justifyContent: 'center', padding: 20 },
    input: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
    },
    button: {
        marginBottom: 10,
        borderRadius: 8,
        overflow: 'hidden',
    },
    registerContainer: {
        alignItems: 'center',
        marginTop: 10,
        width: '100%',
    },
    registerText: {
        marginBottom: 5,
        color: '#555',
    },
    registerInput: {
        borderWidth: 1,
        borderColor: '#ccc',
        padding: 10,
        marginBottom: 10,
        borderRadius: 8,
        width: '75%',
        maxWidth: 300,
    },
    registerButton: {
        backgroundColor: '#2196F3',
        paddingVertical: 6,
        paddingHorizontal: 12,
        borderRadius: 6,
        marginBottom: 10,
    },
    registerButtonText: {
        color: '#fff',
        fontWeight: 'bold',
        paddingVertical: 4,
        paddingHorizontal: 12,
        fontSize: 12,
    },
    message: { marginTop: 20, textAlign: 'center', fontWeight: 'bold' },
});
