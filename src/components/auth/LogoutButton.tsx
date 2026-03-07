'use client';
import { logout } from '@/app/actions/killSession'

export default function LogoutButton() {
  return (
    <form action={logout} method="post">
      <button type="submit" className="atom-nav-link">
        LOGOUT
      </button>
    </form>
  )
}