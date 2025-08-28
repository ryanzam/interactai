import { SidebarProvider } from '@/components/ui/sidebar'
import DashboardNav from '@/modules/dashboard/ui/components/dashboard-nav'
import DashboardSidebar from '@/modules/dashboard/ui/components/dashboard-sidebar'
import React from 'react'

interface DashboardLayoutProps {
    children: React.ReactNode
}

const DashboardLayout = ({ children }: DashboardLayoutProps) => {
    return (
        <SidebarProvider>
            <DashboardSidebar />
            <main className='flex flex-col h-screen w-screen bg-muted'>
                <DashboardNav />
                {children}
            </main>
        </SidebarProvider>
    )
}

export default DashboardLayout