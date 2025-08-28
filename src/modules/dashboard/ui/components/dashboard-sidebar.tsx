"use client"

import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem, SidebarSeparator } from "@/components/ui/sidebar"
import { BotIcon, Crown, Import, VideoIcon } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { use } from "react"
import SidebarUserFooter from "./sidebar-user-footer"

const topMenuItems = [
  { icon: VideoIcon, label: "Meetings", href: "/meetings" },
  { icon: BotIcon, label: "Agents", href: "/agents" },
]

const bottomMenuItems = [
  { icon: Crown, label: "Upgrade", href: "/upgrade" }
]

const DashboardSidebar = () => {

  const pathname = usePathname();

  return (
    <Sidebar>
      <SidebarHeader className="text-sidebar-accent-foreground">
        <Link href={"/"}>
          <Image src="/logo.svg" alt="Interact AI Logo" height={150} width={150} />
        </Link>
      </SidebarHeader>

      <div className="py-2 px-4">
        <Separator className="bg-neutral-300" />
      </div>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {topMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton className={cn(
                    "hover:bg-sidebar-primary hover:text-sidebar-primary-foreground", "text-sidebar-foreground"
                    , pathname === item.href && "bg-sidebar-accent text-sidebar-primary-foreground")}>
                    <Link href={item.href} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>)
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <div className="py-2 px-4">
          <Separator className="bg-neutral-300" />
        </div>

        <SidebarGroup>
          <SidebarGroupContent>
            <SidebarMenu>
              {bottomMenuItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton className={cn(
                    "hover:bg-sidebar-primary hover:text-sidebar-primary-foreground", "text-sidebar-foreground"
                    , pathname === item.href && "bg-sidebar-accent text-sidebar-primary-foreground")}>
                    <Link href={item.href} className="flex items-center gap-2">
                      <item.icon className="h-4 w-4" />
                      <span className="text-sm font-medium">{item.label}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>)
              )}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter>
        <SidebarUserFooter />
      </SidebarFooter>
    </Sidebar>
  )
}

export default DashboardSidebar