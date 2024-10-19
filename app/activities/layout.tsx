import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../components/AppSidebar"

export default function ActivitiesLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-y-auto p-4 md:p-6">
        <SidebarTrigger/>
        {children}
      </main>
    </SidebarProvider>
  )
}
