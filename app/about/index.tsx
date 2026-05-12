import { Text, View, ScrollView, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { aboutStyles as styles } from '../../styles/screens/aboutStyles';

export default function About() {
    const router = useRouter();

    return (
        <ScrollView>
            {/*cabeçalho*/}
            <View>
                <TouchableOpacity onPress={() => router.back()}>
                    <Text>Voltar</Text>
                </TouchableOpacity>
                <Text style={styles.title}>Sobre o App MeetStranger</Text>
            </View>
            {/*corpo*/}
            <View>
                {/*Parte superior do corpo*/}
                <View>
                    <Text style={styles.subtitle}>O que é o MeetStranger</Text>
                    <Text>MeetStranger é um aplicativo de encontros privados que conecta pessoas
                        de todo o mundo para conversas casuais e divertidas. Com uma interface simples e intuitiva,
                        o MeetStranger permite que os usuários se conectem com outras pessoas de forma segura,
                        proporcionando uma experiência única de socialização online.
                    </Text>
                </View>

                {/*Parte centro superior do corpo*/}
                <View>
                    <Text style={styles.subtitle}>🔐 Privacidade</Text>
                    <Text>Sua Privacidade é a nossa prioridade.</Text>
                    <Text>Não coletamos dados pessoais</Text>
                    <Text>Você pode sair a qualquer momento</Text>
                    <Text>Não armazenamos suas mensagens</Text>
                </View>

                {/*Parte centro central do corpo*/}
                <View>
                    <Text style={styles.subtitle}>🌏 Como funciona</Text>
                    <Text>1. Escolha um tópico para iniciar a conversa( Filmes, Jogos, Séries)</Text>
                    <Text>2. Seja conectado com alguém que compartilha do mesmo interesse que o seu.</Text>
                    <Text>3. Converse livremente sobre o tema escolhido.</Text>
                    <Text>4. Caso não esteja gostando da conversa você pode se conectar com outro parceiro.</Text>
                </View>

                {/*Parte centro inferior do corpo*/}
                <View>
                    <Text style={styles.subtitle}>⚡ Recursos</Text>
                    <Text>1. Chat em tempo real.</Text>
                    <Text>2. Múltiplas escolhas de categorias</Text>
                    <Text>3. Interface simples e intuitiva</Text>
                    <Text>4. Conexão rápida</Text>
                    <Text>5. Totalmente gratuito</Text>
                </View>

                {/*Parte  inferior superior do corpo*/}
                <View>
                    <Text style={styles.subtitle}>💻 Sobre o desenvolvedor</Text>
                    <Text>Leandro Fagner</Text>
                    <Text>Desenvolvedor independente com paixão por criar soluções inovadoras.
                        Com experiência em desenvolvimento de aplicativos móveis e web, Formação em Desenvolvimento de Software,
                        Engenharia da computação, relações públicas, comércio no exterior.  
                    </Text>
                </View>

                {/*Parte centro inferior inferior do corpo*/}
                <View>
                    <Text>Projeto Inspirado no projeto Omegle</Text>
                    <Text>Sua Privacidade é a nossa prioridade.</Text>
                    <Text>Versão 1.0.0</Text>
                    <Text>Você pode sair a qualquer momento</Text>
                    <Text>2026 ❤️ Feito com carinho para conectar pessoas</Text>
                </View>
            </View>
        </ScrollView>
    )
}