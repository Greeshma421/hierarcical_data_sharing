'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { useToast } from '@/hooks/use-toast'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import ReactMarkdown from 'react-markdown'
import { LLMSelector } from '../components/LLMSelector';
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Sidebar } from './components/Sidebar'
import { ChatInterface } from './components/ChatInterface'
import { Message, Conversation } from './types'
import { createSupabaseBrowser } from '@/lib/supabase/client'
import { User } from './types'
import useUser from '../hook/useUser'

const DB_CREDENTIALS = {
  db_user: process.env.NEXT_PUBLIC_DB_USER,
  db_password: process.env.NEXT_PUBLIC_DB_PASSWORD,
  db_host: process.env.NEXT_PUBLIC_DB_HOST,
  db_port: process.env.NEXT_PUBLIC_DB_PORT,
  db_name: process.env.NEXT_PUBLIC_DB_NAME
};
console.log(DB_CREDENTIALS);

export default function ChatPage() {
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()
  const [selectedData, setSelectedData] = useState<any[] | null>(null);
  const [llmChoice, setLlmChoice] = useState('openai');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [currentConversationId, setCurrentConversationId] = useState<string | null>(null);
  const supabase = createSupabaseBrowser()
  const { data: user, error } = useUser()

  useEffect(() => {
    fetchConversations();
    handleConnect();
  }, []);


  useEffect(() => {
    if (currentConversationId) {
      fetchMessages(currentConversationId);
    }
  }, [currentConversationId]);

  const fetchConversations = async () => {
    const response = await fetch('/api/chat-operations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'fetchConversations' }),
    });
    
    if (!response.ok) {
      console.error('Error fetching conversations');
      return;
    }
    
    const data = await response.json();
    setConversations(data);
    if (data.length > 0 && !currentConversationId) {
      setCurrentConversationId(data[0].id);
    }
  };

  const fetchMessages = async (conversationId: string) => {
    const response = await fetch('/api/chat-operations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'fetchMessages', data: { conversationId } }),
    });
    
    if (!response.ok) {
      console.error('Error fetching messages');
      return;
    }
    
    const data = await response.json();
    setMessages(data);
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const response = await fetch('/api/db-structure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ db_credentials: DB_CREDENTIALS }),
      });
      if (response.ok) {
        setIsConnected(true);
        toast({
          title: "Connection Successful",
          description: "Successfully connected to the database.",
          variant: "default",
        });
      } else {
        throw new Error('Failed to connect to database');
      }
    } catch (error) {
      console.error('Error connecting to database:', error);
      toast({
        title: "Connection Error",
        description: "Failed to connect to the database. Please check your credentials and try again.",
        variant: "destructive",
      });
    } finally {
      setIsConnecting(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || !currentConversationId) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // Insert user message into the database
      await fetch('/api/chat-operations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'insertMessage', 
          data: { message: userMessage, conversationId: currentConversationId } 
        }),
      });

      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          messages: [...messages, userMessage], 
          dbCredentials: DB_CREDENTIALS, 
          llm_choice: llmChoice,
          conversationId: currentConversationId
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      const assistantMessage: Message = { 
        role: 'assistant', 
        content: data.content,
        tabular_data: data.tabular_data 
      };

      // Insert assistant message into the database
      await fetch('/api/chat-operations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'insertMessage', 
          data: { message: assistantMessage, conversationId: currentConversationId } 
        }),
      });

      setMessages(prev => [...prev, assistantMessage]);

      // Update conversation's updated_at timestamp
      await fetch('/api/chat-operations', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          action: 'updateConversationTimestamp', 
          data: { conversationId: currentConversationId } 
        }),
      });

      fetchConversations();
    } catch (error) {
      console.error('Chat error:', error);
      toast({
        title: "Chat Error",
        description: "An error occurred while processing your message. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleShowResults = (data: any[]) => {
    setSelectedData(data);
  };

  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(scrollToBottom, [messages]);

  const handleLlmChange = (value: string) => {
    console.log("LLM changed to:", value); // Add this line for debugging
    setLlmChoice(value);
  };

  const handleNewConversation = async () => {
    const response = await fetch('/api/chat-operations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'createConversation', data: { title: 'New Conversation', user_id: user?.id } }),
    });
    
    if (!response.ok) {
      console.error('Error creating new conversation');
      return;
    }
    
    const data = await response.json();
    fetchConversations();
    setCurrentConversationId(data.id);
    setMessages([]);
  };

  const handleSelectConversation = (conversationId: string) => {
    setCurrentConversationId(conversationId);
  };

  const handleRenameConversation = async (conversationId: string, title: string) => {
    const response = await fetch('/api/chat-operations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'renameConversation', data: { conversationId, title } }),
    });

    if (!response.ok) {
      console.error('Error renaming conversation');
      return;
    }

    fetchConversations();
  };

  const handleDeleteConversation = async (conversationId: string) => {
    const response = await fetch('/api/chat-operations', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ action: 'deleteConversation', data: { conversationId } }),
    });

    if (!response.ok) {
      console.error('Error deleting conversation');
      return;
    }

    fetchConversations();
    if (currentConversationId === conversationId) {
      setCurrentConversationId(null);
      setMessages([]);
    }
  };

  return (
    <div className="flex h-[calc(100vh-120px)] overflow-hidden gap-4">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        llmChoice={llmChoice}
        handleLlmChange={handleLlmChange}
        conversations={conversations}
        currentConversationId={currentConversationId}
        onSelectConversation={handleSelectConversation}
        onNewConversation={handleNewConversation}
        onRenameConversation={handleRenameConversation}
        onDeleteConversation={handleDeleteConversation}
      />

      <ChatInterface
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        messages={messages}
        input={input}
        setInput={setInput}
        handleSubmit={handleSubmit}
        isConnected={isConnected}
        isLoading={isLoading}
      />
    </div>
  )
}
