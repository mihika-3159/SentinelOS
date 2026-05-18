import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Shield, Activity, Lock, Zap } from "lucide-react";
import { motion } from "framer-motion";

export default function LandingPage() {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Navbar */}
      <header className="px-6 lg:px-14 h-16 flex items-center border-b border-border/40 backdrop-blur-md bg-background/80 fixed w-full z-50">
        <Link className="flex items-center justify-center gap-2" href="/">
          <Shield className="h-6 w-6 text-primary" />
          <span className="font-bold text-xl tracking-tight text-primary">SentinelOS</span>
        </Link>
        <nav className="ml-auto flex gap-4 sm:gap-6">
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#features">
            Features
          </Link>
          <Link className="text-sm font-medium hover:text-primary transition-colors" href="#about">
            About
          </Link>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="flex-1 pt-16">
        <section className="w-full py-24 md:py-32 lg:py-48 xl:py-56 relative overflow-hidden">
          {/* Background Glow */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/20 blur-[120px] rounded-full pointer-events-none" />
          
          <div className="container px-4 md:px-6 relative z-10 mx-auto text-center">
            <div className="flex flex-col items-center space-y-8">
              <div className="inline-flex items-center rounded-full border border-primary/30 bg-primary/10 px-3 py-1 text-sm text-primary backdrop-blur-sm">
                <Zap className="mr-2 h-4 w-4" />
                Track 1: Agent Security & AI Governance
              </div>
              <h1 className="text-4xl font-extrabold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl/none max-w-4xl mx-auto bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                The Trust Layer for Autonomous Enterprise AI.
              </h1>
              <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                Monitor agent behavior, detect prompt injections, enforce policies, and generate audit trails. SentinelOS is the missing security platform for the AI-driven enterprise.
              </p>
              <div className="space-x-4">
                <Link href="/dashboard">
                  <Button size="lg" className="h-12 px-8 text-base shadow-[0_0_20px_rgba(0,240,255,0.3)] hover:shadow-[0_0_30px_rgba(0,240,255,0.5)] transition-all">
                    Open Dashboard
                  </Button>
                </Link>
                <Link href="https://github.com/mihika-3159/SentinelOS" target="_blank">
                  <Button variant="outline" size="lg" className="h-12 px-8 text-base border-border hover:bg-white/5">
                    View on GitHub
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="w-full py-20 bg-card/30 border-y border-border/50">
          <div className="container px-4 md:px-6 mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">Enterprise-Grade Governance</h2>
              <p className="mt-4 text-muted-foreground md:text-lg max-w-2xl mx-auto">
                Comprehensive security controls inspired by top-tier enterprise platforms like Datadog and CrowdStrike.
              </p>
            </div>
            <div className="grid gap-8 md:grid-cols-3">
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-xl border border-border shadow-sm hover:border-primary/50 transition-colors">
                <Activity className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Live Agent Oversight</h3>
                <p className="text-muted-foreground">Real-time monitoring of all autonomous agents, their API calls, and resource access.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-xl border border-border shadow-sm hover:border-primary/50 transition-colors">
                <Shield className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Prompt Inspection</h3>
                <p className="text-muted-foreground">Detect malicious intent, prompt injection, and PII leakage before the agent executes.</p>
              </div>
              <div className="flex flex-col items-center text-center p-6 bg-background rounded-xl border border-border shadow-sm hover:border-primary/50 transition-colors">
                <Lock className="h-12 w-12 text-primary mb-4" />
                <h3 className="text-xl font-bold mb-2">Policy Enforcement</h3>
                <p className="text-muted-foreground">Define strict rules for agent behavior. Allow, deny, or quarantine actions based on risk scores.</p>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="w-full py-6 flex flex-col items-center border-t border-border/40 bg-background">
        <p className="text-xs text-muted-foreground">
          © 2026 SentinelOS. Built for Transforming Enterprise Through AI Hackathon.
        </p>
      </footer>
    </div>
  );
}
