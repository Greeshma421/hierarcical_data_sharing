import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ScrollArea } from "@/components/ui/scroll-area"
import { ChevronRight } from 'lucide-react'
import { MessageList } from './MessageList'
import { Message } from "../types"
import { Loader2 } from 'lucide-react';

interface ChatInterfaceProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  messages: Message[];
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isConnected: boolean;
  isLoading: boolean;
  samplePrompts: string[];
}

export function ChatInterface({
  isSidebarOpen,
  setIsSidebarOpen,
  messages,
  input,
  setInput,
  handleSubmit,
  isConnected,
  isLoading,
  samplePrompts,
}: ChatInterfaceProps) {
  return (
    <div className="flex-grow overflow-hidden">
      <Card className="h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between px-2 py-0 md:p-4">
          <CardTitle className="hidden md:block">Chat with Your Health Data</CardTitle>
          {!isSidebarOpen && (
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden p-2 md:p-4">
          <div className="flex flex-col h-full">
            {messages.length === 0 ? (
              <div className="flex-grow flex flex-col items-center justify-center">
                <h2 className="text-2xl font-bold mb-4">How can I help you today?</h2>
                <div className="grid grid-cols-2 gap-4">
                  {samplePrompts.map((prompt, index) => (
                    <Button
                      key={index}
                      variant="outline"
                      className="text-left h-auto py-2 px-4"
                      onClick={() => setInput(prompt)}
                    >
                      {prompt}
                    </Button>
                  ))}
                </div>
              </div>
            ) : (
              <MessageList messages={messages} />
            )}
            <form onSubmit={handleSubmit} className="flex space-x-2 mt-1">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your data..."
                className="flex-grow"
                disabled={!isConnected || isLoading}
              />
              <Button type="submit" disabled={!isConnected || isLoading}>
                {isLoading ? <Loader2 className="animate-spin" /> : 'Send'}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}