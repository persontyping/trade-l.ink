"use client"

import { useEffect, useState } from "react"

type MetricWidgetProps = {
  title: string
  endpoint: string
  valueKey: string
  refreshInterval?: number
}

export default function MetricWidget({
  title,
  endpoint,
  valueKey,
  refreshInterval
}: MetricWidgetProps) {

  const [value, setValue] = useState<number | string>("—")
  const [loading, setLoading] = useState(false)

  const fetchMetric = async () => {
    try {
      setLoading(true)

      const res = await fetch(endpoint)
      const data = await res.json()

      setValue(data[valueKey])

    } catch (err) {
      console.error(err)
      setValue("error")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMetric()

    if (!refreshInterval) return

    const interval = setInterval(fetchMetric, refreshInterval)

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="border rounded-xl p-4 shadow-sm bg-white w-64">

      <div className="flex justify-between items-center mb-2">
        <h3 className="font-medium text-sm text-gray-600">
          {title}
        </h3>

        <button
          onClick={fetchMetric}
          className="text-xs px-2 py-1 border rounded hover:bg-gray-100"
        >
          {loading ? "..." : "Refresh"}
        </button>
      </div>

      <div className="text-3xl font-semibold">
        {value}
      </div>

    </div>
  )
}

/** 
  import MetricWidget from "@/components/admin/MetricWidget"

export default function AdminDashboard() {

  return (
    <div className="flex gap-4 flex-wrap">

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

    </div>
  )
}
  ****/