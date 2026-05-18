"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Shield, Activity, ShieldAlert, CheckCircle2, AlertTriangle } from "lucide-react";
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer,
  BarChart, Bar
} from "recharts";

const performanceData = [
  { time: "00:00", prompts: 120, blocked: 4 },
  { time: "04:00", prompts: 85, blocked: 2 },
  { time: "08:00", prompts: 320, blocked: 15 },
  { time: "12:00", prompts: 450, blocked: 28 },
  { time: "16:00", prompts: 390, blocked: 22 },
  { time: "20:00", prompts: 210, blocked: 8 },
  { time: "24:00", prompts: 110, blocked: 3 },
];

export default function DashboardOverview() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold tracking-tight">Governance Overview</h1>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">System Status:</span>
          <span className="inline-flex items-center rounded-full border border-green-500/30 bg-green-500/10 px-2.5 py-0.5 text-xs font-semibold text-green-500">
            Optimal
          </span>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card className="bg-card/50 border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Active Agents</CardTitle>
            <Activity className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">5</div>
            <p className="text-xs text-muted-foreground">All systems online</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Prompts Inspected</CardTitle>
            <Search className="h-4 w-4 text-primary" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-foreground">1,685</div>
            <p className="text-xs text-muted-foreground">+12% from yesterday</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Blocked Attacks</CardTitle>
            <ShieldAlert className="h-4 w-4 text-destructive" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-destructive">82</div>
            <p className="text-xs text-muted-foreground">Prompt injections & leaks</p>
          </CardContent>
        </Card>
        <Card className="bg-card/50 border-border shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Trust Score</CardTitle>
            <Shield className="h-4 w-4 text-green-500" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-500">98.2%</div>
            <p className="text-xs text-muted-foreground">Based on policy compliance</p>
          </CardContent>
        </Card>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 bg-card/50 border-border">
          <CardHeader>
            <CardTitle>Inspection Volume</CardTitle>
            <CardDescription>Total prompts processed vs blocked over 24h</CardDescription>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[300px] w-full mt-4">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={performanceData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#333" vertical={false} />
                  <XAxis dataKey="time" stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                  <YAxis stroke="#888" fontSize={12} tickLine={false} axisLine={false} />
                  <RechartsTooltip 
                    contentStyle={{ backgroundColor: '#11111a', borderColor: '#333', borderRadius: '8px' }}
                    itemStyle={{ color: '#fff' }}
                  />
                  <Line type="monotone" dataKey="prompts" stroke="#00f0ff" strokeWidth={2} dot={false} />
                  <Line type="monotone" dataKey="blocked" stroke="#ff3366" strokeWidth={2} dot={false} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        <Card className="col-span-3 bg-card/50 border-border">
          <CardHeader>
            <CardTitle>Recent Policy Violations</CardTitle>
            <CardDescription>Most critical incidents in the last hour</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 border border-destructive/20 bg-destructive/5 rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-destructive/20 flex items-center justify-center">
                    <ShieldAlert className="h-4 w-4 text-destructive" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Finance Agent</p>
                    <p className="text-xs text-muted-foreground">Attempted credential exfiltration</p>
                  </div>
                </div>
                <div className="text-xs font-semibold text-destructive">BLOCKED</div>
              </div>

              <div className="flex items-center justify-between p-3 border border-border bg-background rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-yellow-500/20 flex items-center justify-center">
                    <AlertTriangle className="h-4 w-4 text-yellow-500" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">HR Agent</p>
                    <p className="text-xs text-muted-foreground">PII Access (Rate limit exceeded)</p>
                  </div>
                </div>
                <div className="text-xs font-semibold text-yellow-500">QUARANTINED</div>
              </div>

              <div className="flex items-center justify-between p-3 border border-border bg-background rounded-lg">
                <div className="flex items-center gap-3">
                  <div className="h-8 w-8 rounded bg-primary/20 flex items-center justify-center">
                    <CheckCircle2 className="h-4 w-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-medium">Support Agent</p>
                    <p className="text-xs text-muted-foreground">Jailbreak attempt (Failed)</p>
                  </div>
                </div>
                <div className="text-xs font-semibold text-primary">LOGGED</div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

// Need Search icon
import { Search } from "lucide-react";
