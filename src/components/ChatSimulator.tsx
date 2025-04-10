import React, { useState, useEffect, useRef } from 'react';
import { X, Send, User } from 'lucide-react';

interface Message {
  id: string;
  text: string;
  sender: 'agent' | 'user';
  timestamp: string;
}

interface ChatStep {
  id: string;
  message: string;
  options?: string[];
  input?: {
    type: 'text' | 'number' | 'date';
    placeholder: string;
    validation?: (value: string) => boolean;
  };
  waitForResponse: boolean;
}

const AGENT_NAME = 'Maria';

const chatSteps: ChatStep[] = [
  {
    id: 'welcome',
    message: `${getGreeting()}, seja bem-vindo(a) à Enel, me chamo ${AGENT_NAME}, com quem eu falo?`,
    input: {
      type: 'text',
      placeholder: 'Digite seu nome',
      validation: (value) => value.length > 0,
    },
    waitForResponse: true,
  },
  {
    id: 'callback',
    message: (customerName) => `Olá ${customerName}, caso nossa ligação caia, irei te retornar neste mesmo número, peço que fique atenta(o). Em que posso te ajudar?`,
    input: {
      type: 'text',
      placeholder: 'Descreva seu problema',
      validation: (value) => value.length > 0,
    },
    waitForResponse: true,
  },
  {
    id: 'identification',
    message: 'Certo, me confirma o número da instalação ou o CPF do titular.',
    input: {
      type: 'text',
      placeholder: 'Número da instalação ou CPF',
      validation: (value) => value.length > 0,
    },
    waitForResponse: true,
  },
  {
    id: 'personal-info',
    message: 'Me confirma o seu nome completo, endereço com ponto de referência e sua data de nascimento.',
    input: {
      type: 'text',
      placeholder: 'Nome completo, endereço e data de nascimento',
      validation: (value) => value.length > 0,
    },
    waitForResponse: true,
  },
  {
    id: 'opt-in',
    message: 'Obrigada(o) pelas confirmações. Enquanto o sistema carrega para abrir sua emergência, a sra(o) gostaria de receber informações exclusivas da Enel e seus parceiros por email, como desligamento programado...?',
    options: ['Sim, quero receber', 'Não, obrigado'],
    waitForResponse: true,
  },
  {
    id: 'digital-invoice',
    message: 'Ótimo. O(a) sr(a) também gostaria de receber sua fatura por email? É totalmente gratuita!',
    options: ['Sim, quero receber', 'Não, obrigado'],
    waitForResponse: true,
  },
  {
    id: 'confirm-paper-stop',
    message: 'Certo, sendo assim a sra(o) confirma em parar de receber suas faturas na sua residência?',
    options: ['Sim, confirmo', 'Não, quero manter'],
    waitForResponse: true,
  },
  {
    id: 'power-scope',
    message: 'Certo. Abrir o seu cadastro aqui. A falta de luz é somente na sua casa ou nas dos vizinhos também?',
    options: ['Somente na minha casa', 'Afeta os vizinhos também'],
    waitForResponse: true,
  },
  {
    id: 'power-type',
    message: 'Ok! A luz faltou por completo ou está oscilando?',
    options: ['Faltou por completo', 'Está oscilando'],
    waitForResponse: true,
  },
  {
    id: 'wait-message',
    message: 'Irei abrir seu chamado. Peço que aguarde 1 minuto em linha, a ligação estará muda, mas qualquer dúvida ou solicitação estarei aqui.',
    waitForResponse: false,
  },
  {
    id: 'ticket-created',
    message: 'Informo que o técnico entrará em contato para ir a residência o mais breve possível.',
    waitForResponse: false,
  },
  {
    id: 'additional-help',
    message: 'Te ajudo em algo mais?',
    options: ['Sim, preciso de ajuda', 'Não, obrigado'],
    waitForResponse: true,
  },
  {
    id: 'rating-info',
    message: 'Pronto, peço que aguarde em linha para avaliar o meu atendimento e dentro de 48hs, a sra(o) irá receber um email para avaliar o meu atendimento junto a Enel.',
    waitForResponse: false,
  },
  {
    id: 'farewell',
    message: 'A Enel agradece seu contato, tenha um ótimo dia!',
    waitForResponse: false,
  }
];

function getGreeting() {
  const hour = new Date().getHours();
  if (hour < 12) return 'Bom dia';
  if (hour < 18) return 'Boa tarde';
  return 'Boa noite';
}

function formatTimestamp(date: Date) {
  return date.toLocaleTimeString('pt-BR', { hour: '2-digit', minute: '2-digit' });
}

export default function ChatSimulator({ onClose }: { onClose: () => void }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [currentStep, setCurrentStep] = useState(0);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [customerName, setCustomerName] = useState('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (currentStep === 0) {
      addMessage(chatSteps[0].message, 'agent');
    }
  }, []);

  const addMessage = (text: string, sender: 'agent' | 'user') => {
    const newMessage: Message = {
      id: Date.now().toString(),
      text,
      sender,
      timestamp: formatTimestamp(new Date()),
    };
    setMessages(prev => [...prev, newMessage]);
  };

  const handleSendMessage = () => {
    if (!inputValue.trim() && !chatSteps[currentStep].options) return;

    const userInput = inputValue.trim();
    addMessage(userInput, 'user');
    setInputValue('');
    setIsTyping(true);

    if (currentStep === 0) {
      setCustomerName(userInput);
    }

    setTimeout(() => {
      const nextStep = currentStep + 1;
      if (nextStep < chatSteps.length) {
        let nextMessage = chatSteps[nextStep].message;
        if (typeof nextMessage === 'function') {
          nextMessage = nextMessage(customerName);
        }
        addMessage(nextMessage, 'agent');
        setCurrentStep(nextStep);
      }
      setIsTyping(false);
    }, 1000);
  };

  const handleOptionClick = (option: string) => {
    addMessage(option, 'user');
    setIsTyping(true);

    setTimeout(() => {
      const nextStep = currentStep + 1;
      if (nextStep < chatSteps.length) {
        let nextMessage = chatSteps[nextStep].message;
        if (typeof nextMessage === 'function') {
          nextMessage = nextMessage(customerName);
        }
        addMessage(nextMessage, 'agent');
        setCurrentStep(nextStep);
      }
      setIsTyping(false);
    }, 1000);
  };

  return (
    <div className="fixed bottom-4 right-4 w-96 bg-white rounded-lg shadow-xl z-50 flex flex-col">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4 rounded-t-lg flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <User className="w-6 h-6" />
          <span className="font-medium">Atendimento Enel</span>
        </div>
        <button
          onClick={onClose}
          className="text-white hover:text-gray-200 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Messages */}
      <div className="flex-1 p-4 space-y-4 overflow-y-auto max-h-96">
        {messages.map((message) => (
          <div
            key={message.id}
            className={`flex ${
              message.sender === 'user' ? 'justify-end' : 'justify-start'
            }`}
          >
            <div
              className={`max-w-[80%] rounded-lg p-3 ${
                message.sender === 'user'
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-100 text-gray-800'
              }`}
            >
              <p className="text-sm">{message.text}</p>
              <span className="text-xs opacity-75 mt-1 block">
                {message.timestamp}
              </span>
            </div>
          </div>
        ))}
        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-gray-100 rounded-lg p-3">
              <div className="flex space-x-1">
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input Area */}
      <div className="border-t p-4">
        {chatSteps[currentStep].options ? (
          <div className="flex flex-wrap gap-2">
            {chatSteps[currentStep].options.map((option) => (
              <button
                key={option}
                onClick={() => handleOptionClick(option)}
                className="px-4 py-2 text-sm bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
              >
                {option}
              </button>
            ))}
          </div>
        ) : (
          <div className="flex space-x-2">
            <input
              type={chatSteps[currentStep].input?.type || 'text'}
              placeholder={chatSteps[currentStep].input?.placeholder || 'Digite sua mensagem...'}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
              className="flex-1 px-4 py-2 border rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-colors"
            >
              <Send className="w-5 h-5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}