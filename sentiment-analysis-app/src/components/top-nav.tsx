import { BellIcon, UserIcon } from 'lucide-react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

export function TopNav() {
  return (
    <header className="h-16 border-b bg-white px-6 flex items-center justify-between">
      <div className="flex items-center gap-4">
        <h2 className="text-lg font-semibold">Product Reviews</h2>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <BellIcon className="w-5 h-5" />
        </Button>
        <Link href="/login">
          <Button variant="ghost" size="icon">
            <UserIcon className="w-5 h-5" />
          </Button>
        </Link>
      </div>
    </header>
  )
}