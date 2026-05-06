import {Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import { Button } from '../components/Button';
import { useRouter } from 'expo-router';
import {chatSelectStyles as styles} from '../styles/screens/chatSelectStyles';

interface ChatCategory {
    id: string;
    name: string;
    description: string;
    icon: string
}

const category: ChatCategory [] = [
    {
        id: 'movies',
        name: 'Filmes',
        description: 'Converse sobre seus filmes favoritos',
        icon: '🎬'
    },
    {
        id: 'Games',
        name: 'Jogos',
        description: 'Converse sobre seus jogos favoritos',
         icon   : '👾'
    },
    {
        id: 'Series',
        name:'Séries',
        description:' Converse sobre suas Séries favoritos',
         icon : '📺'
    },
]

export default function chatSelect() {
    const router = useRouter();
    const handleCategorySelect = (categoryId: string) => {
        router.push(`/chat/room?category=${categoryId}`)
    }
    return (
        <View style={styles.container}>
            {/**Cabeçalho */}
            <View style={styles.header}>
                <Text style={styles.title}> Escolha um Tropico para conversar</Text>
                <Text style={styles.subtitle}> Clique nos tropicos abaixo</Text>

            </View>
            {/** Centro */}
            <View>
              {category.map((category) => (
                <TouchableOpacity
                  key={category.id}
                  style={styles.card}
                  onPress={() => handleCategorySelect(category.id)}
                  activeOpacity={0.8}
                >
                     <View style={styles.cardContent}>
                       <Text>{category.icon}</Text>
                       <Text style={styles.cardTitle}>{category.name}</Text>
                       <Text style={styles.cardDescription}>{category.description}</Text>
                     </View>
                {/* conteudo aqui, se quiser */}
                </TouchableOpacity>
                ))}
            </View>
            {/** Rodape */}
            <View style={styles.buttonContainer}>
                <Button
                   title='Voltar'
                   onPress={() => router.back()}
                   variant='primary'
                   style={styles.backButton}
   
                />

            </View>
        </View>
    )
}
 