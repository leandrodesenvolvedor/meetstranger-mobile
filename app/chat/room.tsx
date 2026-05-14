import React, { useState, useRef, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    FlatList,
    TouchableOpacity,
    KeyboardAvoidingView,
    Platform,
    StyleSheet
} from 'react-native';
import { useRouter, useLocalSearchParams } from 'expo-router';
import { useChat } from '../../hooks/useChat';
import { ChatMessage } from '../../components/ChatMessage';
import { colors } from '../../constants/color';

const categories = [
    { id: 'movies', name: 'Filmes', icon: '🎬' },
    { id: 'games', name: 'Jogos', icon: '👾' },
    { id: 'series', name: 'Séries', icon: '📺' },
];

export default function ChatRoom() {
    const router = useRouter();
    const { category } = useLocalSearchParams<{ category: string }>();
    const categoryInfo = categories.find(cat => cat.id === category);
    
    const [inputText, setInput] = useState('');
    const flatListRef = useRef<FlatList>(null);
    
    const { 
        messages, 
        isConnected, 
        isMatching, 
        partnerName, 
        sendMessage, 
        findNewPartner 
    } = useChat(category || 'movies');

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
            style={styles.container}
        >
            <View style={styles.header}>
                <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                    <Text style={styles.backText}>← Sair</Text>
                </TouchableOpacity>

                <View style={styles.statusContainer}>
                    <Text style={styles.statusText}>
                        {isConnected 
                            ? `Conectado com ${partnerName}` 
                            : isMatching 
                                ? 'Procurando parceiro...' 
                                : 'Desconectado'
                        }
                    </Text>
                </View>

                {isConnected && (
                    <TouchableOpacity 
                        onPress={findNewPartner}
                        style={styles.newPartnerButton}
                    >
                        <Text style={styles.newPartnerText}>Encontrar Novo Parceiro</Text>
                    </TouchableOpacity>
                )}
            </View>

            <FlatList
                ref={flatListRef}
                data={messages}
                keyExtractor={(item) => item.id}
                renderItem={({ item }) => <ChatMessage message={item} />}
                showsVerticalScrollIndicator={false}
                contentContainerStyle={styles.messageList}
            />

            <View style={styles.inputContainer}>
                <TextInput
                    value={inputText}
                    onChangeText={setInput}
                    placeholder="Digite sua mensagem..."
                    placeholderTextColor={colors.secondary}
                    multiline
                    maxLength={500}
                    style={styles.textInput}
                />
                <TouchableOpacity
                    onPress={handleSendMessage}
                    disabled={!isConnected || inputText.trim() === ''}
                    style={[
                        styles.sendButton,
                        (!isConnected || inputText.trim() === '') && styles.sendButtonDisabled
                    ]}
                >
                    <Text style={styles.sendButtonText}>Enviar</Text>
                </TouchableOpacity>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    header: {
        padding: 16,
        backgroundColor: colors.primary,
    },
    backButton: {
        marginBottom: 8,
    },
    backText: {
        color: '#fff',
        fontSize: 16,
    },
    statusContainer: {
        marginTop: 8,
    },
    statusText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    newPartnerButton: {
        marginTop: 8,
        padding: 8,
        backgroundColor: 'rgba(255,255,255,0.2)',
        borderRadius: 8,
    },
    newPartnerText: {
        color: '#fff',
        textAlign: 'center',
    },
    messageList: {
        padding: 16,
    },
    inputContainer: {
        padding: 16,
        backgroundColor: '#f5f5f5',
        flexDirection: 'row',
        alignItems: 'center',
    },
    textInput: {
        flex: 1,
        backgroundColor: '#fff',
        borderRadius: 20,
        paddingHorizontal: 16,
        paddingVertical: 8,
        marginRight: 8,
        maxHeight: 100,
    },
    sendButton: {
        backgroundColor: colors.primary,
        borderRadius: 20,
        padding: 12,
        minWidth: 60,
        alignItems: 'center',
    },
    sendButtonDisabled: {
        backgroundColor: '#ccc',
    },
    sendButtonText: {
        color: '#fff',
        fontWeight: 'bold',
    },
});
