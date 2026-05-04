import { Text, View, Alert, KeyboardAvoidingView, Platform, Image } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Input } from '../../components/input';
import { Button } from '../../components/Button';
import { loginStyles as styles } from '../../styles/screens/loginStyles';
export default function Login() {
    const router = useRouter();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const handleLogin = async () => {
        if (!email || !password) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        setLoading(true);

        try {
            // Aqui vai sua lógica de login (API, Firebase, etc.)
            console.log('Logando com:', email, password);
        } catch (error) {
            Alert.alert('Erro', 'Falha no login');
        } finally {
            setLoading(false);
        }
    };
    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === "android" ? -85 : 0}

        >
            <View style={styles.content}>
                <Image source={require('../../assets/favicon.png')} style={styles.logo} resizeMode='contain' />
                <Text style={styles.title}>Bem vindo ao APP MeetStranger!</Text>
                <Text style={styles.subtitle}>Faça login para continuar</Text>
                <View style={styles.inputContainer}>
                    <Input
                        label='Email'
                        value={email}
                        onChangeText={setEmail}
                        keyboardType="email-address"
                        autoCapitalize='none'
                        placeholder='seu@email.com'
                    />
                    <Input
                        label='Senha'
                        value={password}
                        onChangeText={setPassword}
                        secureTextEntry
                        placeholder='******'
                    />
                </View>
                <Button
                    title={loading ? 'Entrando...' : 'Entrar'}
                    onPress={handleLogin}
                    disabled={loading}
                    style={styles.loginButton}
                />
                <Button
                    title='Criar conta'
                    onPress={() => router.push('/auth/register')}
                    variant='outline'
                />
            </View>
        </KeyboardAvoidingView>
    );
}
