import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "../components/AppSidebar"
import { Breadcrumbs } from "../components/Breadcrumbs"

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <AppSidebar />
      <main className="flex-1 overflow-y-auto md:p-0">
        <div className="flex flex-row justify-start gap-6 z-10 bg-background  border-b">
          <SidebarTrigger />
          {/* <Breadcrumbs/> */}
        </div>
        {children}
      </main>
    </SidebarProvider>
  )
}
