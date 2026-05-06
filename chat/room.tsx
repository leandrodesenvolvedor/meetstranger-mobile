import React, { useState, useRef, useEffect, use, } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useChat } from '../hooks/useChat';
import { ChatMessage } from '../components/ChatMessage';
import { Button } from '../components/Button';
//import { chatRoomStyles as styles } from '../styles/screens/chatRoomStyles';
import { colors } from '../constants/color';

const categories = [
    { id: 'movies', name: 'Filmes', icon: '🎬' },
    { id: 'games', name: 'Jogos', icon: '👾' },
    { id: 'series', name: 'Séries', icon: '📺' },
]

export default function ChatRoom() {
    const categoryInfo = categories.find(cat => cat.id === useLocalSearchParams().category);
    const router = useRouter();
    const { category } = useLocalSearchParams<{ category: string }>();
    const [messageText, setMessageText] = useState([]);
    const [inputText, setInput] = useState('');
    const flatListRef = useRef<FlatList>(null);
    const { messages, isConnected, isMatching, partnerName, sendMessage, findNewPartner } = useChat(category || 'movies');

    useEffect(() => {
        if (messages.length > 0) {
            setTimeout(() => {
                flatListRef.current?.scrollToEnd({ animated: true });
            }, 50);
        }
    }, [messages]);
    const handleSendMessage = () => {
        if (inputText.trim() === '') return;
        sendMessage(inputText);
        setInput('');

    };

    return ( 
    <KeyboardAvoidingView
    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    keyboardVerticalOffset={Platform.OS === 'android' ? -85 : 0}
>
    <View>
        <TouchableOpacity onPress={() => router.back()}>
            <Text>Sair</Text>
        </TouchableOpacity>

        <View>
            <Text>{isConnected? `Conectado com ${partnerName}` :
             isMatching ? "Procurando parceiro...": ""}</Text>
        </View>
        <TouchableOpacity onPress={findNewPartner}>
            <Text>Encontrar Novo Parceiro</Text>
        </TouchableOpacity>
    </View>

    <FlatList
        ref={flatListRef}
        data={messages}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <ChatMessage message={item} />}
        showsVerticalScrollIndicator={false}    
    />

    <View>
        <TextInput
            value={inputText}
            placeholder="Digite sua mensagem..."
            placeholderTextColor={colors.secondary}
            multiline
            maxLength={500}
            />
            <TouchableOpacity
            onPress={handleSendMessage}
            disabled={!isConnected || inputText.trim() === ''}
        >
            <Button title="Enviar" onPress={handleSendMessage} />
        </TouchableOpacity>
    </View>
</KeyboardAvoidingView>)
}