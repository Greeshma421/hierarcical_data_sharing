'use client'

import { useState, useRef, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { DatabaseConnection } from '../components/DatabaseConnection'
import { useToast } from '@/hooks/use-toast'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Checkbox } from "@/components/ui/checkbox"
import ReactMarkdown from 'react-markdown'
import { LLMSelector } from '../components/LLMSelector';
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Sidebar } from './components/Sidebar'
import { ChatInterface } from './components/ChatInterface'
import { Message } from './types'

export default function ChatPage() {
  const [dbCredentials, setDbCredentials] = useState({
    db_user: '',
    db_password: '',
    db_host: '',
    db_port: '',
    db_name: ''
  });
  const [useMockDb, setUseMockDb] = useState(false);
  const [isConnected, setIsConnected] = useState(false);
  const [isConnecting, setIsConnecting] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast()
  const [selectedData, setSelectedData] = useState<any[] | null>(null);
  const [llmChoice, setLlmChoice] = useState('openai');
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const handleCredentialChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDbCredentials({ ...dbCredentials, [e.target.name]: e.target.value });
  };

  const handleUseMockDbChange = (checked: boolean) => {
    setUseMockDb(checked);
    if (checked) {
      setDbCredentials({
        db_user: 'postgres.jseojlyregwrpqqhnxfc',
        db_password: 'easysqlpassword123#',
        db_host: 'aws-0-ap-south-1.pooler.supabase.com',
        db_port: '6543',
        db_name: 'postgres'
      });
    } else {
      setDbCredentials({
        db_user: '',
        db_password: '',
        db_host: '',
        db_port: '',
        db_name: ''
      });
    }
  };

  const handleConnect = async () => {
    setIsConnecting(true);
    try {
      const response = await fetch('/api/db-structure', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ db_credentials: dbCredentials }),
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
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: [...messages, userMessage], dbCredentials, llm_choice: llmChoice }),
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
      setMessages(prev => [...prev, assistantMessage]);
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

  return (
    <div className="flex h-[calc(100vh-120px)] overflow-hidden gap-4">
      <Sidebar
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
        useMockDb={useMockDb}
        handleUseMockDbChange={handleUseMockDbChange}
        llmChoice={llmChoice}
        handleLlmChange={handleLlmChange}
        dbCredentials={dbCredentials}
        handleCredentialChange={handleCredentialChange}
        handleConnect={handleConnect}
        isConnecting={isConnecting}
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
