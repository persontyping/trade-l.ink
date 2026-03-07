import {
  OnlineUsersPanel,
  UsersPanel,
  SessionsPanel
} from "@/components/Admin" 

export default function AdminPage() {
  return (
    <section className="grid grid-cols-3 gap-6 p-8">
      <OnlineUsersPanel />
      <UsersPanel />
      <SessionsPanel />
    </section>
  )
}