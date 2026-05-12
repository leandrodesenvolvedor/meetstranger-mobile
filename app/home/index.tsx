import { Text, View, Image } from 'react-native';
import { Button } from '../../components/Button';
import { useRouter } from 'expo-router';
//import { useAuth } from '../../hooks/useAuth';
import {homeStyles as styles} from '../../styles/screens/homeStyles';
import React from 'react';

export default function Home() {
    const router = useRouter();
    //const { user, Logout } = useAuth();
    const user = {username: 'Leandro'};
    const handleStartChat = () => {
        router.push('/chat/select');
    }
    const handleAbout = () => {
        router.push('/about');
    }
    const handleLogout = async() => {
        router.replace('auth/login');
    }
    //*************************** */
    return (
        <View style={styles.container}>
            {/**cabeçalho */}
            <View style={styles.header} >
                {/** Opcional importar logotipo */}
                <Image source={require('../../assets/favicon.png')}
                    resizeMode='contain'
                    style={styles.logo}
                />
                <Text style={styles.welcome}>Bem-vindo, {user?.username || 'Stranger'}</Text>
                <Text style={styles.subtitle}>Pronto para se conectar com pessoas?</Text>
            </View>
            {/**centro da página */}
            <View style={styles.content}>
                {/**sessão superior do centro */}
                <View style={styles.Card}>
                    <Text style={styles.cardTitle}>MeetStranger</Text>
                    <Text style={styles.cardDescription}>Converse com pessoas ao redor do mundo e encontre pessoas que gostam dos mesmos interesses que os seus!</Text>
                </View>
                {/**sessão central do centro da página */}
                <View style={styles.feature}>
                    <View style={styles.feature}>
                        <Text style={styles.featureIcon}>🌏</Text>
                        <Text style={styles.featureText}>Explore o mundo através do MeetStranger</Text>
                    </View>

                    <View style={styles.feature}>
                        <Text style={styles.featureIcon}>⚡</Text>
                        <Text style={styles.featureText}>Converse com pessoas ao redor do mundo de forma rápida e fácil</Text>
                    </View>
                </View>
            </View>
            {/**sessão inferior*/}
            <View style={styles.buttons}>
                <Button
                    title='Começar a conversar'
                    onPress={() => { handleStartChat(); }}
                    style={styles.button}
                />

                 <Button
                    title='Conheça mais sobre o app'
                    onPress={() => { handleAbout(); }}
                    style={styles.button}
                    variant='outline'
                />

                 <Button
                    title='Sair'
                    onPress={() => { handleLogout(); }}
                    style={styles.button}
                    variant='secondary'
                />
            </View>
        </View>
    );
}