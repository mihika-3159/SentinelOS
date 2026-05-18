"use client"

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
// Note: This page uses mock policy data for demo purposes.
// CSV export is enabled using json2csv.

import { useState } from "react"
import { exportToCsv } from "@/lib/exportCsv"

// Mock policies data – demo only
const initialPolicies = {
  ALLOW: { description: "Allow action", enabled: true },
  DENY: { description: "Deny action", enabled: false },
  LOG: { description: "Log activity", enabled: true },
  HUMAN_REVIEW: { description: "Require human review", enabled: false },
  QUARANTINE: { description: "Quarantine suspect activity", enabled: true },
  RATE_LIMIT: { description: "Rate limit calls", enabled: true }
}

export default function PoliciesPage() {
  const [policies, setPolicies] = useState(initialPolicies)



  const handleExport = () => {
    const rows = Object.entries(policies).map(([key, val]) => ({
      policy: key,
      description: val.description,
      enabled: val.enabled
    }))
    exportToCsv(rows, "policies_report.csv")
  }

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle>Policy Engine</CardTitle>
          <CardDescription className="text-muted-foreground">
            *Mock data for demo – edit policies directly in the UI.*
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
                    <textarea
            className="w-full h-64 p-2 border rounded bg-background text-foreground font-mono"
            value={JSON.stringify(policies, null, 2)}
            onChange={(e) => {
              try {
                const parsed = JSON.parse(e.target.value);
                setPolicies(parsed);
              } catch (err) {
                // ignore invalid JSON
              }
            }}
          />
          <Button className="mt-4" onClick={handleExport} variant="secondary">
            Export Policies CSV
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}
