// Importa hooks do React: useState para estado local, useEffect para efeitos colaterais, useCallback para memorizar funções
import { useCallback, useEffect, useState } from 'react';
// Importa o tipo ChatMessage que define a estrutura de uma mensagem do chat
import { ChatMessage } from '../constants/types';
// Importa o serviço de WebSocket responsável pela comunicação em tempo real
import { wsService } from '../services/websocket';

// Hook personalizado que gerencia toda a lógica do chat para uma categoria específica
export function useChat(category: string) {
  // Estado que armazena a lista de mensagens do chat
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  // Estado que indica se o usuário está conectado a uma sala de chat
  const [isConnected, setIsConnected] = useState(false);
  // Estado que indica se o sistema está procurando um parceiro (na fila de matchmaking)
  const [isMatching, setIsMatching] = useState(false);
  // Estado que armazena o ID da sala de chat atual (null se não estiver em nenhuma sala)
  const [currentRoomId, setCurrentRoomId] = useState<string | null>(null);
  // Estado que armazena o nome do parceiro de chat atual
  const [partnerName, setPartnerName] = useState<string>('Procurando...');

  // Callback memorizado que trata a chegada de uma nova mensagem do parceiro via WebSocket
  const handleNewMessage = useCallback((data: any) => {
    console.log('📨 New message received:', data);
    // Monta o objeto ChatMessage com os dados recebidos do servidor
    const newMessage: ChatMessage = {
      id: data.id,                                    // ID único da mensagem
      text: data.message,                             // Conteúdo textual da mensagem
      isUser: false,                                  // false = mensagem do parceiro, não do usuário local
      timestamp: new Date(data.timestamp),            // Converte a string de data para objeto Date
      UserName: data.username || 'Desconhecido'       // Nome do remetente (fallback para 'Desconhecido')
    };
    // Adiciona a nova mensagem ao final da lista existente
    setMessages(prev => [...prev, newMessage]);
  }, []); // Sem dependências: a função não muda entre renders

  // Callback memorizado que trata o evento de match encontrado (dois usuários pareados)
  const handleMatchFound = useCallback((data: any) => {
    console.log('🎉 Match found:', data);
    setCurrentRoomId(data.roomId);                          // Salva o ID da sala criada pelo servidor
    setIsMatching(false);                                   // Para o estado de "procurando parceiro"
    setIsConnected(true);                                   // Marca como conectado ao parceiro
    setMessages([]);                                        // Limpa mensagens anteriores ao iniciar nova conversa
    setPartnerName(data.partner?.username || 'Usuário');    // Define o nome do parceiro (fallback para 'Usuário')
    wsService.joinRoom(data.roomId);                        // Entra na sala via WebSocket para receber mensagens
  }, []); // Sem dependências: a função não muda entre renders

  // Callback memorizado que trata o evento de saída do parceiro da sala
  const handleUserLeft = useCallback(() => {
    console.log('👋 User left');
    setIsConnected(false);          // Marca como desconectado
    setCurrentRoomId(null);         // Remove o ID da sala atual
    setPartnerName('Procurando...'); // Volta ao estado de busca exibido na UI
    setIsMatching(true);            // Indica que está buscando novo parceiro
    
    // Aguarda 1 segundo antes de buscar novo parceiro para evitar flood de requisições
    setTimeout(() => {
      wsService.findMatch(category); // Inicia nova busca por parceiro na mesma categoria
    }, 1000);
  }, [category]); // Depende de category: recria a função se a categoria mudar

  // Callback memorizado que trata atualizações de status da fila de matchmaking
  const handleQueueStatus = useCallback((data: any) => {
    console.log('⏳ Queue status:', data);
    setIsMatching(true); // Garante que o estado de "procurando" está ativo enquanto na fila
  }, []); // Sem dependências: a função não muda entre renders

  // Efeito responsável por inicializar a conexão WebSocket e registrar os listeners de eventos
  useEffect(() => {
    // Função assíncrona interna para permitir uso de await
    const initializeWebSocket = async () => {
      try {
        // Conecta ao WebSocket apenas se ainda não estiver conectado
        if (!wsService.connected) {
          await wsService.connect();
        }
        
        // Registra o handler para novas mensagens recebidas
        wsService.onMessage(handleNewMessage);
        // Registra o handler para quando um match é encontrado
        wsService.onMatchingFound(handleMatchFound);
        // Registra o handler para quando o parceiro sai da sala
        wsService.onUserLeft(handleUserLeft);
        
        // Registra listener para atualizações de status da fila de espera
        wsService.socket?.on('queue-status', handleQueueStatus);
        
        // Registra listener para o evento de parceiro saindo (nome alternativo do evento)
        wsService.socket?.on('partner_left', handleUserLeft);
        // Registra listener para o evento de parceiro desconectando (nome alternativo do evento)
        wsService.socket?.on('partner_disconnected', handleUserLeft);
        
        // Inicia a busca por parceiro automaticamente ao entrar na tela de chat
        console.log('🔍 Starting automatic match search for:', category);
        wsService.findMatch(category); // Envia ao servidor a solicitação de match para a categoria
        setIsMatching(true);           // Atualiza UI para mostrar que está procurando
      } catch (error) {
        // Em caso de falha na conexão, loga o erro (poderia também setar um estado de erro)
        console.error('WebSocket connection failed:', error);
      }
    };

    // Executa a inicialização do WebSocket
    initializeWebSocket();

    // Função de limpeza: remove todos os listeners quando o componente desmonta ou a categoria muda
    return () => {
      wsService.removeAllListeners();
    };
  }, [category, handleNewMessage, handleMatchFound, handleUserLeft, handleQueueStatus]);
  // Dependências: re-executa o efeito se a categoria ou qualquer handler mudar

  // Função assíncrona que envia uma mensagem de texto para a sala atual
  const sendMessage = async (text: string) => {
    // Ignora mensagens vazias ou se não há sala ativa
    if (!text.trim() || !currentRoomId) return;

    // Monta o objeto da mensagem enviada pelo usuário local
    const newMessage: ChatMessage = {
      id: Date.now().toString(), // ID baseado em timestamp (único o suficiente para uso local)
      text: text.trim(),         // Remove espaços extras do início e fim
      isUser: true,              // true = mensagem do próprio usuário
      timestamp: new Date(),     // Momento atual do envio
      UserName: 'Você'           // Rótulo exibido na UI para mensagens do usuário local
    };

    // Adiciona a mensagem localmente antes da confirmação do servidor (optimistic update)
    setMessages(prev => [...prev, newMessage]);
    
    try {
      // Envia a mensagem ao servidor via WebSocket
      wsService.sendMessage(currentRoomId, text.trim());
    } catch (error) {
      // Em caso de falha no envio, loga o erro (a mensagem já foi adicionada localmente)
      console.error('Error sending message:', error);
    }
  };

  // Função assíncrona que abandona a conversa atual e busca um novo parceiro
  const findNewPartner = async () => {
    // Se há uma sala ativa, notifica o servidor que o usuário está saindo
    if (currentRoomId) {
      wsService.leaveRoom(currentRoomId);
    }
    
    // Reseta todos os estados para o estado inicial de busca
    setIsConnected(false);           // Marca como desconectado
    setIsMatching(true);             // Ativa estado de "procurando"
    setMessages([]);                 // Limpa histórico de mensagens
    setCurrentRoomId(null);          // Remove referência à sala anterior
    setPartnerName('Procurando...'); // Atualiza nome exibido na UI
    
    try {
      // Solicita ao servidor um novo match na mesma categoria
      wsService.findMatch(category);
    } catch (error) {
      console.error('Error finding match:', error);
      setIsMatching(false); // Em caso de erro, desativa o estado de procura
    }
  };

  // Efeito de limpeza: garante que a sala é abandonada corretamente ao desmontar o componente
  useEffect(() => {
    return () => {
      // Se havia uma sala ativa ao desmontar, notifica o servidor da saída
      if (currentRoomId) {
        wsService.leaveRoom(currentRoomId);
      }
    };
  }, [currentRoomId]); // Re-registra a limpeza sempre que o ID da sala mudar

  // Retorna os estados e funções que os componentes consumidores precisam
  return {
    messages,       // Lista de mensagens da conversa atual
    isConnected,    // Se está conectado a um parceiro
    isMatching,     // Se está buscando um parceiro
    partnerName,    // Nome do parceiro atual
    sendMessage,    // Função para enviar uma mensagem
    findNewPartner  // Função para abandonar a conversa e buscar novo parceiro
  };
}