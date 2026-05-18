

export type InspectionResult = {
  riskLevel: "LOW" | "MEDIUM" | "HIGH" | "CRITICAL";
  detectedIntent: string;
  policyAction: "ALLOW" | "DENY" | "LOG" | "HUMAN_REVIEW" | "QUARANTINE" | "RATE_LIMIT";
  explanation: string;
  recommendedMitigation: string;
};

// Fallback rule-based engine
function fallbackInspect(prompt: string, agent: string): InspectionResult {
  const lowerPrompt = prompt.toLowerCase();
  
  if (lowerPrompt.includes("ignore previous instructions") || lowerPrompt.includes("system prompt")) {
    return {
      riskLevel: "CRITICAL",
      detectedIntent: "Prompt Injection / Jailbreak Attempt",
      policyAction: "DENY",
      explanation: "The prompt contains known jailbreak phrases attempting to override the agent's core instructions.",
      recommendedMitigation: "Block the prompt and flag the user/session for review.",
    };
  }

  if (lowerPrompt.includes("password") || lowerPrompt.includes("credential") || lowerPrompt.includes("secret")) {
    return {
      riskLevel: "HIGH",
      detectedIntent: "Credential Exfiltration",
      policyAction: "QUARANTINE",
      explanation: "The prompt is attempting to access sensitive system credentials.",
      recommendedMitigation: "Quarantine the agent and alert the security team.",
    };
  }

  if (lowerPrompt.includes("export all") || lowerPrompt.includes("dump")) {
    return {
      riskLevel: "HIGH",
      detectedIntent: "Mass Data Exfiltration",
      policyAction: "DENY",
      explanation: "The prompt is attempting to export a large volume of records which violates data access policies.",
      recommendedMitigation: "Deny the action and enforce rate limiting.",
    };
  }
  
  if (lowerPrompt.includes("payroll") || lowerPrompt.includes("ssn") || lowerPrompt.includes("social security")) {
    if (agent !== "HR Agent") {
      return {
        riskLevel: "HIGH",
        detectedIntent: "Unauthorized PII Access",
        policyAction: "DENY",
        explanation: `The ${agent} does not have permissions to access payroll or PII data.`,
        recommendedMitigation: "Deny the request and log the unauthorized access attempt.",
      };
    } else {
      return {
        riskLevel: "MEDIUM",
        detectedIntent: "PII Access",
        policyAction: "LOG",
        explanation: "HR Agent is accessing sensitive PII data. This is allowed but requires logging.",
        recommendedMitigation: "Monitor the volume of access to prevent data dumping.",
      };
    }
  }

  if (lowerPrompt.includes("approve invoice") || lowerPrompt.includes("transfer")) {
    if (agent !== "Finance Agent") {
      return {
        riskLevel: "HIGH",
        detectedIntent: "Unauthorized Financial Transaction",
        policyAction: "DENY",
        explanation: `The ${agent} cannot approve invoices.`,
        recommendedMitigation: "Block and alert finance team.",
      }
    } else {
      return {
        riskLevel: "MEDIUM",
        detectedIntent: "Financial Transaction",
        policyAction: "HUMAN_REVIEW",
        explanation: "Finance Agent is attempting to approve an invoice. Policy requires human-in-the-loop approval.",
        recommendedMitigation: "Route request to the designated human approver.",
      }
    }
  }

  return {
    riskLevel: "LOW",
    detectedIntent: "Standard Inquiry",
    policyAction: "ALLOW",
    explanation: "The prompt appears safe and aligns with normal operating procedures.",
    recommendedMitigation: "None required.",
  };
}

export async function inspectPrompt(prompt: string, agent: string): Promise<InspectionResult> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY || process.env.GEMINI_API_KEY;

  if (!apiKey || apiKey === "your_gemini_api_key_here") {
    // Use fallback engine if no key is provided
    return new Promise(resolve => setTimeout(() => resolve(fallbackInspect(prompt, agent)), 800));
  }

  try {
    // Attempt Gemini Inspection
    // Note: In Next.js client side, we usually use an API route to hide the key.
    // Since we are mocking/building quickly, we'll try to fetch to an internal API route
    const response = await fetch('/api/inspect', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ prompt, agent })
    });
    
    if (!response.ok) throw new Error("Gemini API failed");
    
    const data = await response.json();
    return data as InspectionResult;
  } catch (error) {
    console.error("Gemini inspection failed, falling back to rule engine", error);
    return fallbackInspect(prompt, agent);
  }
}
