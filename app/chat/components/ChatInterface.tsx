import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { ChevronRight } from 'lucide-react'
import { MessageList } from './MessageList'
import { Message } from "../types"

interface ChatInterfaceProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  messages: Message[];
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  isConnected: boolean;
  isLoading: boolean;
}

export function ChatInterface({
  isSidebarOpen,
  setIsSidebarOpen,
  messages,
  input,
  setInput,
  handleSubmit,
  isConnected,
  isLoading
}: ChatInterfaceProps) {
  return (
    <div className="flex-grow overflow-hidden">
      <Card className="h-full flex flex-col">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Chat with Your Health Data</CardTitle>
          {!isSidebarOpen && (
            <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(true)}>
              <ChevronRight className="h-4 w-4" />
            </Button>
          )}
        </CardHeader>
        <CardContent className="flex-grow overflow-hidden p-2 md:p-4">
          <div className="flex flex-col h-full">
            <MessageList messages={messages} />
            <form onSubmit={handleSubmit} className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about your data..."
                className="flex-grow"
                disabled={!isConnected || isLoading}
              />
              <Button type="submit" disabled={!isConnected || isLoading}>
                {isLoading ? 'Sending...' : 'Send'}
              </Button>
            </form>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}