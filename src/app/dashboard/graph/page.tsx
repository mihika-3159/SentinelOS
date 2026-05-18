"use client";

import { useCallback } from "react";
import {
  ReactFlow,
  MiniMap,
  Controls,
  Background,
  useNodesState,
  useEdgesState,
  addEdge,
  MarkerType,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";

const initialNodes = [
  // Orchestrator / Center
  { id: "1", position: { x: 400, y: 150 }, data: { label: "SentinelOS Trust Engine" }, style: { background: "#11111a", color: "#00f0ff", border: "1px solid #00f0ff", borderRadius: "8px", padding: "10px", width: 180, textAlign: "center" as const } },
  
  // Agents
  { id: "2", position: { x: 100, y: 50 }, data: { label: "Finance Agent" }, style: { background: "#11111a", color: "#fff", border: "1px solid #333", borderRadius: "8px", padding: "10px" } },
  { id: "3", position: { x: 100, y: 250 }, data: { label: "HR Agent" }, style: { background: "#11111a", color: "#fff", border: "1px solid #333", borderRadius: "8px", padding: "10px" } },
  { id: "4", position: { x: 700, y: 50 }, data: { label: "Support Agent\n(QUARANTINED)" }, style: { background: "#330000", color: "#ff3366", border: "1px solid #ff3366", borderRadius: "8px", padding: "10px", textAlign: "center" as const } },
  { id: "5", position: { x: 700, y: 250 }, data: { label: "Data Agent" }, style: { background: "#11111a", color: "#fff", border: "1px solid #333", borderRadius: "8px", padding: "10px" } },

  // External APIs / DBs
  { id: "6", position: { x: 400, y: -50 }, data: { label: "ERP Database" }, style: { background: "#222", color: "#aaa", border: "1px dashed #555", borderRadius: "4px", padding: "5px" } },
  { id: "7", position: { x: 400, y: 350 }, data: { label: "CRM System" }, style: { background: "#222", color: "#aaa", border: "1px dashed #555", borderRadius: "4px", padding: "5px" } },
];

const initialEdges = [
  // Normal flows
  { id: "e2-1", source: "2", target: "1", animated: true, style: { stroke: "#00ff9d" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#00ff9d" } },
  { id: "e1-6", source: "1", target: "6", animated: true, style: { stroke: "#00ff9d" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#00ff9d" } },
  
  { id: "e3-1", source: "3", target: "1", animated: true, style: { stroke: "#00ff9d" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#00ff9d" } },
  
  // Blocked flows
  { id: "e4-1", source: "4", target: "1", animated: true, style: { stroke: "#ff3366", strokeWidth: 2 }, label: "BLOCKED (Injection)", labelStyle: { fill: "#ff3366", fontWeight: 700 }, labelBgStyle: { fill: "#111" } },
  
  { id: "e5-1", source: "5", target: "1", animated: true, style: { stroke: "#ffaa00" }, label: "RATE LIMITED", labelStyle: { fill: "#ffaa00", fontWeight: 700 }, labelBgStyle: { fill: "#111" } },
  { id: "e1-7", source: "1", target: "7", animated: true, style: { stroke: "#00ff9d" }, markerEnd: { type: MarkerType.ArrowClosed, color: "#00ff9d" } },
];

export default function OversightGraphPage() {
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  const onConnect = useCallback(
    (params: any) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  return (
    <div className="space-y-6 h-[calc(100vh-120px)] flex flex-col">
      <div className="flex flex-col">
        <h1 className="text-3xl font-bold tracking-tight">Live Agent Oversight Graph</h1>
        <p className="text-muted-foreground mt-1">Real-time topology of agent behavior, API calls, and policy interventions.</p>
      </div>

      <Card className="flex-1 overflow-hidden bg-black border-border relative">
        <ReactFlow
          nodes={nodes}
          edges={edges}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          fitView
          colorMode="dark"
          minZoom={0.5}
        >
          <Controls className="bg-muted text-foreground border-border" />
          <MiniMap 
            nodeColor={(n) => {
              if (n.style?.background === '#330000') return '#ff3366';
              if (n.style?.background === '#11111a') return '#00f0ff';
              return '#555';
            }}
            maskColor="rgba(0, 0, 0, 0.7)"
            className="bg-black border border-border"
          />
          <Background color="#333" gap={16} />
        </ReactFlow>
        
        <div className="absolute top-4 left-4 flex flex-col gap-2 p-4 bg-background/80 backdrop-blur-md rounded-md border border-border">
          <h3 className="font-bold text-sm">Legend</h3>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-1 bg-[#00ff9d]" /> Safe Traffic
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-1 bg-[#ff3366]" /> Blocked Traffic
          </div>
          <div className="flex items-center gap-2 text-xs">
            <div className="w-4 h-1 bg-[#ffaa00]" /> Rate Limited
          </div>
        </div>
      </Card>
    </div>
  );
}
