"use client"

import { useEffect, useState, useCallback } from "react"

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
  refreshInterval = 30000,
}: MetricWidgetProps) {

  const [value, setValue] = useState<number | string>("—")
  const [loading, setLoading] = useState(false)

  // memoized fetch function to avoid re-creating on every render
  const fetchMetric = useCallback(async () => {
    try {
      setLoading(true)
      const res = await fetch(endpoint)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const data = await res.json()
      setValue(data[valueKey] ?? "—")
    } catch (err) {
      console.error(err)
      setValue("error")
    } finally {
      setLoading(false)
    }
  }, [endpoint, valueKey])

  // fetch immediately and set up interval
  useEffect(() => {
    fetchMetric() // initial fetch

    const interval = setInterval(fetchMetric, refreshInterval)
    return () => clearInterval(interval) // cleanup on unmount or deps change
  }, [fetchMetric, refreshInterval])

  return (<div className="border rounded-xl p-4 w-64">
    <div className="flex justify-between items-center mb-2">
      <h3 className="text-yellow-100 text-lg">{title}</h3>
      <button
        onClick={fetchMetric}
        className="px-2 py-1 border pink rounded"
      >
        {loading ? "..." : "Refresh"}
      </button>
    </div>
    <div className="text-3xl ">{value}</div>
  </div>
  )
}