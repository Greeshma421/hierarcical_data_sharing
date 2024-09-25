import { ScrollArea } from "@/components/ui/scroll-area"
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { ChevronLeft } from 'lucide-react'
import { LLMSelector } from '../../components/LLMSelector'
import { DatabaseConnection } from '../../components/DatabaseConnection'

interface SidebarProps {
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  useMockDb: boolean;
  handleUseMockDbChange: (checked: boolean) => void;
  llmChoice: string;
  handleLlmChange: (value: string) => void;
  dbCredentials: any;
  handleCredentialChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleConnect: () => void;
  isConnecting: boolean;
}

export function Sidebar({
  isSidebarOpen,
  setIsSidebarOpen,
  useMockDb,
  handleUseMockDbChange,
  llmChoice,
  handleLlmChange,
  dbCredentials,
  handleCredentialChange,
  handleConnect,
  isConnecting
}: SidebarProps) {
  return (
    <ScrollArea className={`${isSidebarOpen ? 'w-80' : 'w-0'} transition-all duration-300 ease-in-out overflow-y-auto flex-shrink-0`}>
      <Card className="">
        <CardHeader className="flex flex-row items-center justify-between">
          <CardTitle>Configure Chat</CardTitle>
          <Button variant="ghost" size="icon" onClick={() => setIsSidebarOpen(false)}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="flex items-center space-x-2 mb-4">
              <Checkbox 
                id="use-mock-db"
                checked={useMockDb}
                onCheckedChange={handleUseMockDbChange}
              />
              <label
                htmlFor="use-mock-db"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Use Mock Database
              </label>
            </div>
            <div className="mb-4">
              <LLMSelector value={llmChoice} onChange={handleLlmChange} />
            </div>
          </div>
          <DatabaseConnection 
            dbCredentials={dbCredentials} 
            handleCredentialChange={handleCredentialChange} 
            handleConnect={handleConnect}
            isConnecting={isConnecting}
            useMockDb={useMockDb}
          />
        </CardContent>
      </Card>
    </ScrollArea>
  )
}