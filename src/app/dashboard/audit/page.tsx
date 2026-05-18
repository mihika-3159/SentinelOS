"use client";

import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { exportToCsv } from "@/lib/exportCsv";
import { useState } from "react";

// Mock audit entries
const initialAudits = [
  { id: "EVT-001", event: "Agent blocked unauthorized file access", time: "5 mins ago", severity: "HIGH" },
  { id: "EVT-002", event: "Prompt injection attempt detected", time: "12 mins ago", severity: "CRITICAL" },
  { id: "EVT-003", event: "Policy changed by admin", time: "30 mins ago", severity: "MEDIUM" },
];

export default function AuditPage() {
  const [audits, setAudits] = useState(initialAudits);

  const updateEvent = (id: string, field: keyof typeof initialAudits[0], value: string) => {
    setAudits((prev) =>
      prev.map((a) => (a.id === id ? { ...a, [field]: value } : a))
    );
  };

  const handleExport = () => {
    exportToCsv(audits, "audit_report.csv");
  };

  return (
    <div className="space-y-6">
      <Card className="bg-card/50 border-border">
        <CardHeader>
          <CardTitle>Audit Trail</CardTitle>
          <CardDescription className="text-muted-foreground">
            *This data is mock data for demo purposes.*
          </CardDescription>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid gap-4">
            {audits.map((a) => (
              <Card key={a.id} className="bg-muted/30 border-border">
                <CardHeader className="flex flex-col space-y-0 p-3">
                  <CardTitle className="text-sm font-medium">{a.id}</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2 p-3">
                  <div>
                    <span className="font-medium">Event:</span>{" "}
                    <input
                      className="bg-transparent border-b border-gray-500 focus:outline-none w-full"
                      value={a.event}
                      onChange={(e) => updateEvent(a.id, "event", e.target.value)}
                    />
                  </div>
                  <div>
                    <span className="font-medium">Time:</span>{" "}
                    <input
                      className="bg-transparent border-b border-gray-500 focus:outline-none w-full"
                      value={a.time}
                      onChange={(e) => updateEvent(a.id, "time", e.target.value)}
                    />
                  </div>
                  <div>
                    <span className="font-medium">Severity:</span>{" "}
                    <input
                      className="bg-transparent border-b border-gray-500 focus:outline-none w-full"
                      value={a.severity}
                      onChange={(e) => updateEvent(a.id, "severity", e.target.value)}
                    />
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <Button className="mt-4" onClick={handleExport} variant="secondary">
            Export CSV
          </Button>
        </CardContent>
      </Card>
    </div>
  );
}
