import MetricWidget from "@/components/Admin/SessionsPanel"

export default function AdminPage() {
  return (
    <section className="grid grid-cols-3 gap-6 p-8">

    <MetricWidget
        title="Open Sessions"
        endpoint="/api/admin/auth-health"
        valueKey="openSessions"
        refreshInterval={30000}
    />


     <MetricWidget
        title="Valid Sessions"
        endpoint="/api/admin/auth-health"
        valueKey="validSessions"
        refreshInterval={30000}
      />

    <MetricWidget
        title="Active Users"
        endpoint="/api/admin/auth-health"
        valueKey="uniqueUsers"
        refreshInterval={30000}
      />

      <MetricWidget
        title="Stale Sessions"
        endpoint="/api/admin/auth-health"
        valueKey="staleSessions"
        refreshInterval={30000}
      /> 
    </section>
  )
}