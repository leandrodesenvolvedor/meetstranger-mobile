import { Text, View, Alert, KeyboardAvoidingView, Platform, Image } from 'react-native';
import React, { useState } from 'react';
import { useRouter } from 'expo-router';
import { Input } from '../../components/input';
import { Button } from '../../components/Button';
import { registerStyles as styles } from '../../styles/screens/registerStyles';

export default function Register() {
    const router = useRouter();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);

    const handleRegister = async () => {
        if (!name || !email || !password || !confirmPassword) {
            Alert.alert('Erro', 'Por favor, preencha todos os campos.');
            return;
        }

        if (password.length < 8) {
            Alert.alert('Erro', 'A senha deve ter pelo menos 8 caracteres.');
            return;
        }

        if (password !== confirmPassword) {
            Alert.alert('Erro', 'As senhas não coincidem.');
            return;
        }

        setLoading(true);
        try {
            // Implementar lógica de registro aqui
            router.replace('/home');
        } catch (error) {
            Alert.alert('Erro', 'Ocorreu um erro ao registrar. Tente novamente');
        } finally {
            setLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === "android" ? -85 : 0}
            style={styles.container}
        >
            <View style={styles.content}>
                <Image 
                    source={require('../../assets/favicon.png')}
                    resizeMode='contain' 
                    style={styles.logo}
                />
                
                <Text style={styles.title}>Criar conta</Text>
                <Text style={styles.subtitle}>Junte-se ao MeetStranger!</Text>

                <View style={styles.inputContainer}>
                    <Input
                        label='Nome'
                        value={name}
                        onChangeText={setName}
                        placeholder='Seu nome de usuário'
                    />
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
                        placeholder='Mínimo 8 caracteres'
                    />
                    <Input
                        label='Confirmar senha'
                        value={confirmPassword}
                        onChangeText={setConfirmPassword}
                        secureTextEntry
                        placeholder='Digite a senha novamente'
                    />
                </View>

                <Button
                    title={loading ? 'Registrando...' : 'Registrar'}
                    onPress={handleRegister}
                    disabled={loading}
                    style={styles.registerButton}
                />

                <Button
                    title='Já possui conta? Faça login'
                    onPress={() => router.push('/auth/login')}
                    disabled={loading}
                    variant='outline'
                />
            </View>
        </KeyboardAvoidingView>
    );
}
