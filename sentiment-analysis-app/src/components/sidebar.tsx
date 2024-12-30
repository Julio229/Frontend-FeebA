import { HomeIcon, ChartBarIcon, MessageCircleIcon, SettingsIcon } from 'lucide-react'
import Link from 'next/link'

export function Sidebar() {
  const menuItems = [
    { icon: HomeIcon, label: 'Dashboard', href: '/' },
    { icon: ChartBarIcon, label: 'Sentiment Analysis', href: '/sentiment' },
    { icon: MessageCircleIcon, label: 'Reviews', href: '/reviews' },
    { icon: SettingsIcon, label: 'Settings', href: '/settings' },
  ]

  return (
    <aside className="w-64 bg-white border-r">
      <div className="p-6">
        <h1 className="text-xl font-bold text-red-500">Faction Analysis</h1>
      </div>
      <nav className="px-4">
        {menuItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className="flex items-center gap-3 px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg"
          >
            <item.icon className="w-5 h-5" />
            {item.label}
          </Link>
        ))}
      </nav>
    </aside>
  )
}