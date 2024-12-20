'use client'
import { logoutAction } from '@/app/actions/login'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import type { User } from '@/types/place'

interface UserAvatarProps {
  user: Pick<User, 'id' | 'email'>
}

export function UserAvatar({ user }: UserAvatarProps) {
  function logout() {
    logoutAction()
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-border bg-background text-foreground shadow-md">
          <span className="sr-only">User settings</span>
          {user.email?.slice(0, 1).toUpperCase()}
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex items-center justify-start gap-2 p-2">
          {user.email && (
            <p className="w-[200px] truncate text-sm text-zinc-700">
              {user.email}
            </p>
          )}
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem className="cursor-pointer" onSelect={logout}>
          Sair
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
