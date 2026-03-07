import {
  OnlineUsersPanel,
  UsersPanel,
} from "@/components/Admin" 
import MetricWidget from "@/components/Admin/SessionsPanel"


export default function AdminPage() {
  return (
    <section className="grid grid-cols-3 gap-6 p-8">
      <OnlineUsersPanel />
      <UsersPanel />

       <MetricWidget
        title="Valid Sessions"
        endpoint="/api/admin/auth-health"
        valueKey="validSessions"
        refreshInterval={30000}
      />
    </section>
  )
}