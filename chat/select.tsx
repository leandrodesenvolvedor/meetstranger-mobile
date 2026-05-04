import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Button } from '../components/Button';
import { useRouter } from 'expo-router';
//import {chatSelectStyles as styles} from '../../styles/screens/chatSelectStyles';

interface ChatCategory {
    id: string;
    name: string;
    description: string;
    icon: string;
}

const category: ChatCategory[] = [
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
        icon: '🎮'
    },
    {
        id: 'series',
        name: 'Séries',
        description: 'Converse sobre suas séries favoritas',
        icon: '📺'
    },
]

export default function Select() {
    const router = useRouter();
    const handleCategorySelect = (categoryId: string) => {
        router.push(`/chat/room?category=${categoryId}`);
    }
    return (
        <View>
            {/*Cabeçalho */}
            <View>
                <Text>Escolha um tópico para conversar</Text>
                <Text>Clique nos tópicos abaixo</Text>
            </View>

            {/*Centro */}
            <View>
                {category.map((category) => (
                    <TouchableOpacity
                        key={category.id}
                        //style={styles.categoryCard}
                        onPress={() => handleCategorySelect(category.id)}
                        activeOpacity={0.8}
                    >
                        <Text>{category.icon}</Text>
                        <Text>{category.name}</Text>
                        <Text>{category.description}</Text>
                    </TouchableOpacity>
                ))}
            </View>

            {/*Rodapé */}
            <View>
                <Button
                    title="Voltar"
                    onPress={() => router.back()}
                    variant='primary' >
                </Button>
            </View>
        </View>
    );
}

