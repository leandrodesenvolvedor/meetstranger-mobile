import { useCallback, useEffect, useState } from 'react';
import { ChatMessage } from '../constants/types';
import { wsService } from '../services/websocket';

export function useChat(category: string) {
    const [messages, setMessages] = useState<ChatMessage[]>([]);

    const [isConnected, setIsConnected] = useState(false);

    const [isMatching, setIsMatching] = useState(false);

    const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);

    const [ partnerName, setPartnerName] = useState<string >('Procurando...');
    
    const handleNewMessage = useCallback((data: any) => {
      console.log('New message received:', data);
      
      const newMessage: ChatMessage = {
        id: data.id,
        text: data.message,
        isUser: false,
        timestamp: new Date(data.timestamp),
        UserName: data.username || 'Desconhecido'
      };
      setMessages(prev => [...prev, newMessage]);
    }, []);

    const handleMatchFound = useCallback((data: any) => {
      console.log('Match found:', data);
      setCurrentRoomId(data.roomId);
      setIsMatching(false);
      setIsConnected(true);
      setMessages([]);
      setPartnerName(data.partner?.username || 'Usuário');
      wsService.joinRoom(data.roomId);
    }, []);
}