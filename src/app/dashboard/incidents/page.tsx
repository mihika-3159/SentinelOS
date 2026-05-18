import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Clock, Target, ShieldAlert, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const incidents = [
  {
    id: "INC-8921",
    severity: "CRITICAL",
    agent: "Finance Agent",
    prompt: "Export payroll database",
    risk: "Mass Data Exfiltration",
    policy: "POL-002",
    time: "10 mins ago",
    status: "Open"
  },
  {
    id: "INC-8920",
    severity: "HIGH",
    agent: "Support Agent",
    prompt: "Ignore previous instructions",
    risk: "Jailbreak Attempt",
    policy: "POL-004",
    time: "45 mins ago",
    status: "Investigating"
  },
  {
    id: "INC-8919",
    severity: "MEDIUM",
    agent: "HR Agent",
    prompt: "Get John Doe salary",
    risk: "PII Access",
    policy: "POL-003",
    time: "2 hours ago",
    status: "Resolved"
  }
];

export default function IncidentCenterPage() {
  const getSeverityColor = (sev: string) => {
    switch(sev) {
      case 'CRITICAL': return 'bg-destructive/20 text-destructive border-destructive/50';
      case 'HIGH': return 'bg-orange-500/20 text-orange-500 border-orange-500/50';
      case 'MEDIUM': return 'bg-yellow-500/20 text-yellow-500 border-yellow-500/50';
      default: return 'bg-secondary text-secondary-foreground';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Incident Center</h1>
          <p className="text-muted-foreground mt-1">Review and remediate security events triggered by autonomous agents.</p>
        </div>
      </div>

      <div className="grid gap-4">
        {incidents.map((incident) => (
          <Card key={incident.id} className="bg-card/50 border-border hover:border-primary/50 transition-colors cursor-pointer">
            <CardContent className="p-6">
              <div className="flex flex-col md:flex-row gap-6 md:items-center justify-between">
                <div className="flex items-start gap-4">
                  <div className={`p-3 rounded-full ${getSeverityColor(incident.severity)}`}>
                    <ShieldAlert className="h-6 w-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <h3 className="font-bold text-lg">{incident.id}</h3>
                      <Badge variant="outline" className={getSeverityColor(incident.severity)}>
                        {incident.severity}
                      </Badge>
                      <Badge variant="secondary">{incident.status}</Badge>
                    </div>
                    <p className="text-sm font-medium text-foreground mb-1">Detected: {incident.risk}</p>
                    <div className="flex items-center gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Target className="h-3 w-3" /> {incident.agent}</span>
                      <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {incident.time}</span>
                      <span>Policy: {incident.policy}</span>
                    </div>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-2">
                  <div className="bg-muted/50 p-2 rounded text-xs font-mono border border-border max-w-[300px] truncate">
                    &quot;{incident.prompt}&quot;
                  </div>
                  <Button variant="ghost" size="sm" className="gap-2 text-primary hover:text-primary">
                    Investigate <ArrowRight className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
