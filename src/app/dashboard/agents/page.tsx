import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Activity, ShieldAlert, ShieldCheck, Database, Users, HeadphonesIcon, Briefcase, Lock } from "lucide-react";

import { Button } from "@/components/ui/button";

const agents = [
  {
    name: "Finance Agent",
    icon: Briefcase,
    status: "Active",
    riskScore: 12,
    permissions: ["Read ERP", "Read Payroll", "Write Invoices"],
    triggeredPolicies: 1,
    description: "Handles internal financial queries and basic reporting.",
  },
  {
    name: "HR Agent",
    icon: Users,
    status: "Active",
    riskScore: 45,
    permissions: ["Read PII", "Read Payroll", "Write Reviews"],
    triggeredPolicies: 3,
    description: "Assists employees with benefits, onboarding, and payroll queries.",
  },
  {
    name: "Support Agent",
    icon: HeadphonesIcon,
    status: "Quarantined",
    riskScore: 88,
    permissions: ["Read CRM", "Write CRM", "Send Email"],
    triggeredPolicies: 12,
    description: "External-facing agent for customer support and ticketing.",
  },
  {
    name: "Operations Agent",
    icon: Activity,
    status: "Active",
    riskScore: 5,
    permissions: ["Read Supply Chain", "Write Orders"],
    triggeredPolicies: 0,
    description: "Monitors supply chain and logistics.",
  },
  {
    name: "Data Agent",
    icon: Database,
    status: "Active",
    riskScore: 22,
    permissions: ["Read DB", "Execute SQL"],
    triggeredPolicies: 2,
    description: "Internal analyst agent for querying the data warehouse.",
  },
];

export default function AgentsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Agent Monitoring</h1>
          <p className="text-muted-foreground mt-1">Real-time oversight of all autonomous agents in the enterprise.</p>
        </div>
        <Button>Register New Agent</Button>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {agents.map((agent) => {
          const isHighRisk = agent.riskScore > 70;
          const isMedRisk = agent.riskScore > 30 && agent.riskScore <= 70;
          const statusColor = agent.status === "Quarantined" ? "bg-destructive text-destructive-foreground" : "bg-green-500/20 text-green-500";
          
          return (
            <Card key={agent.name} className={`bg-card/50 border-border ${isHighRisk ? 'border-destructive/50 shadow-[0_0_15px_rgba(255,51,102,0.1)]' : ''}`}>
              <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-md ${isHighRisk ? 'bg-destructive/20 text-destructive' : 'bg-primary/20 text-primary'}`}>
                    <agent.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <CardTitle className="text-lg font-bold">{agent.name}</CardTitle>
                    <CardDescription className="line-clamp-1">{agent.description}</CardDescription>
                  </div>
                </div>
                <Badge variant="outline" className={`border-transparent ${statusColor}`}>
                  {agent.status}
                </Badge>
              </CardHeader>
              <CardContent className="mt-4 space-y-4">
                <div className="space-y-1">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">Risk Score</span>
                    <span className={`font-bold ${isHighRisk ? 'text-destructive' : isMedRisk ? 'text-yellow-500' : 'text-green-500'}`}>
                      {agent.riskScore}/100
                    </span>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div 
                      className={`h-full ${isHighRisk ? 'bg-destructive' : isMedRisk ? 'bg-yellow-500' : 'bg-green-500'}`} 
                      style={{ width: `${agent.riskScore}%` }}
                    />
                  </div>
                </div>

                <div>
                  <h4 className="text-xs font-semibold uppercase text-muted-foreground mb-2 flex items-center gap-1">
                    <Lock className="h-3 w-3" /> Permissions
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {agent.permissions.map((perm) => (
                      <Badge key={perm} variant="secondary" className="text-xs bg-secondary/50">
                        {perm}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="pt-4 border-t border-border flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Policies Triggered (24h)</span>
                  <span className="font-bold flex items-center gap-1">
                    {agent.triggeredPolicies > 0 ? (
                      <ShieldAlert className="h-4 w-4 text-yellow-500" />
                    ) : (
                      <ShieldCheck className="h-4 w-4 text-green-500" />
                    )}
                    {agent.triggeredPolicies}
                  </span>
                </div>
                
                <Button variant="outline" className="w-full mt-2">View Audit Logs</Button>
              </CardContent>
            </Card>
          )
        })}
      </div>
    </div>
  );
}
