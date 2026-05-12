import { Text, View, TouchableOpacity } from 'react-native';
import React from 'react';
import { Button } from '../../components/Button';
import { useRouter } from 'expo-router';
import { chatSelectStyles as styles } from '../../styles/screens/chatSelectStyles';

interface ChatCategory {
    id: string;
    name: string;
    description: string;
    icon: string
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
        icon: '👾'
    },
    {
        id: 'Series',
        name: 'Séries',
        description: 'Converse sobre suas Séries favoritas',
        icon: '📺'
    },
]

export default function ChatSelect() {
    const router = useRouter();
    const handleCategorySelect = (categoryId: string) => {
        router.push(`/chat/room?category=${categoryId}`);
    }
    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.title}>Escolha um Tópico para conversar</Text>
                <Text style={styles.subtitle}>Clique nos tópicos abaixo</Text>
            </View>
            <View>
                {category.map((cat) => (
                    <TouchableOpacity
                        key={cat.id}
                        style={styles.card}
                        onPress={() => handleCategorySelect(cat.id)}
                        activeOpacity={0.8}
                    >
                        <View style={styles.cardContent}>
                            <Text style={{ fontSize: 40 }}>{cat.icon}</Text>
                            <Text style={styles.cardTitle}>{cat.name}</Text>
                            <Text style={styles.cardDescription}>{cat.description}</Text>
                        </View>
                    </TouchableOpacity>
                ))}
            </View>
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
 