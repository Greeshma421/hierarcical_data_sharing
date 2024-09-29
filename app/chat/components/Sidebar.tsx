import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft } from 'lucide-react'
import { LLMSelector } from '../../components/LLMSelector'
import { ConversationList } from './ConversationList'

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  llmChoice: string;
  handleLlmChange: (value: string) => void;
  conversations: any[];
  currentConversationId: string | null;
  onSelectConversation: (conversationId: string) => void;
  onNewConversation: () => void;
  onRenameConversation: (conversationId: string, title: string) => void;
  onDeleteConversation: (conversationId: string) => void;
}

export function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  llmChoice,
  handleLlmChange,
  conversations,
  currentConversationId,
  onSelectConversation,
  onNewConversation,
  onRenameConversation,
  onDeleteConversation
}: SidebarProps) {
  return (
    <ScrollArea className={`${isSidebarOpen ? 'w-80 sm:w-80' : 'w-0'} transition-all duration-300 ease-in-out overflow-y-auto flex-shrink-0`}>
      <Card className="">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Configure Chat</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="mb-4">
              <LLMSelector value={llmChoice} onChange={handleLlmChange} />
            </div>
          </div>
          <ConversationList
            conversations={conversations}
            currentConversationId={currentConversationId}
            onSelectConversation={onSelectConversation}
            onNewConversation={onNewConversation}
            onRenameConversation={onRenameConversation}
            onDeleteConversation={onDeleteConversation}
          />
        </CardContent>
      </Card>
    </ScrollArea>
  )
}