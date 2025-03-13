"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { motion } from "framer-motion"
import { Home, Video, ImageIcon, FileText, Settings, LogOut, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"


export function AppSidebar() {
  const pathname = usePathname()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const menuItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: Home,
    },
    {
      name: "Videos",
      href: "/videos",
      icon: Video,
    },
    {
      name: "Images",
      href: "/images",
      icon: ImageIcon,
    },
    {
      name: "Scripts",
      href: "/scripts",
      icon: FileText,
    },
    {
      name: "Playground",
      href: "/playground",
      icon: Video,
      highlight: true,
    },
    {
      name: "Settings",
      href: "/settings",
      icon: Settings,
    },
  ]

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      {/* Mobile menu button */}
      <div className="fixed top-4 left-4 z-50 md:hidden">
        <Button
          variant="outline"
          size="icon"
          onClick={toggleMobileMenu}
          className="bg-zinc-900/80 backdrop-blur-sm border-zinc-800"
        >
          {isMobileMenuOpen ? <X className="h-5 w-5 text-white" /> : <Menu className="h-5 w-5 text-white" />}
        </Button>
      </div>

      {/* Mobile sidebar */}
      <motion.div
        initial={{ x: "-100%" }}
        animate={{ x: isMobileMenuOpen ? 0 : "-100%" }}
        transition={{ type: "spring", damping: 20 }}
        className="fixed inset-y-0 left-0 z-40 w-64 bg-black border-r border-zinc-800 md:hidden"
      >
        <div className="flex flex-col h-full">
          <SidebarContent menuItems={menuItems} pathname={pathname} onItemClick={() => setIsMobileMenuOpen(false)} />
        </div>
      </motion.div>

      {/* Desktop sidebar */}
      <div className="hidden md:flex md:w-64 md:flex-col md:fixed md:inset-y-0">
        <div className="flex flex-col flex-1 min-h-0 bg-black border-r border-zinc-800">
          <SidebarContent menuItems={menuItems} pathname={pathname} />
        </div>
      </div>

      {/* Mobile overlay */}
      {isMobileMenuOpen && <div className="fixed inset-0 bg-black/80 z-30 md:hidden" onClick={toggleMobileMenu} />}
    </>
  )
}

interface SidebarContentProps {
  menuItems: {
    name: string
    href: string
    icon: any
    highlight?: boolean
  }[]
  pathname: string
  onItemClick?: () => void
}

function SidebarContent({ menuItems, pathname, onItemClick }: SidebarContentProps) {
  return (
    <>
      <div className="flex items-center h-16 flex-shrink-0 px-4 border-b border-zinc-800">
        <Link href="/dashboard" className="flex items-center" onClick={onItemClick}>
          <div className="w-8 h-8 rounded-md bg-gradient-to-br from-pink-600 to-purple-600 flex items-center justify-center mr-2">
            <Video className="h-4 w-4 text-white" />
          </div>
                        
        </Link>
      </div>
      <div className="flex flex-col flex-1 pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-4 space-y-1">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={onItemClick}
                className={`
                  group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-all
                  ${
                    isActive
                      ? "bg-zinc-900 text-white border-l-2 border-pink-500"
                      : "text-zinc-400 hover:bg-zinc-900/50 hover:text-white"
                  }
                  ${item.highlight ? "animated-border" : ""}
                `}
              >
                <item.icon
                  className={`mr-3 h-5 w-5 flex-shrink-0 ${
                    isActive ? "text-pink-500" : "text-zinc-500 group-hover:text-zinc-300"
                  }`}
                />
                {item.name}
                {item.highlight && (
                  <span className="ml-auto px-2 py-0.5 text-xs rounded-full bg-pink-500/20 text-pink-500">New</span>
                )}
              </Link>
            )
          })}
        </nav>
      </div>
      <div className="flex-shrink-0 flex border-t border-zinc-800 p-4">
        <div className="flex items-center w-full">
          <div className="flex-shrink-0">
            <Avatar>
              <AvatarImage src="/placeholder.svg?height=40&width=40" alt="User" />
              <AvatarFallback className="bg-zinc-800 text-zinc-400">UN</AvatarFallback>
            </Avatar>
          </div>
          <div className="ml-3 min-w-0 flex-1">
            <div className="text-sm font-medium text-white truncate">User Name</div>
            <div className="text-xs text-zinc-500 truncate">user@example.com</div>
          </div>
          <Button variant="ghost" size="icon" className="text-zinc-400 hover:text-white">
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </>
  )
}