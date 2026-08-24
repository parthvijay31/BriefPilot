export type AnalysisResult = {
  required_fields: {
    design_request: string | null;
    purpose: string | null;
    deadline: string | null;
    brand_guidelines: string | null;
    budget: string | null;
  };
  missing_fields: string[];
  designer_type?: string;
  assigned_to: { name: string; team: string };
  follow_up_email: string;
  analysis_error?: string | null;
};

export const API_BASE_URL =
  (import.meta.env["VITE_API_BASE_URL"] as string | undefined) ??
  "https://briefpilot-backend.onrender.com";

export async function analyzeEmail(email: string): Promise<AnalysisResult> {
  const response = await fetch(`${API_BASE_URL}/analyze-email`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ email }),
  });

  if (!response.ok) {
    throw new Error(`Analysis failed (${response.status})`);
  }

  return (await response.json()) as AnalysisResult;
}

export function initialsOf(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]!.toUpperCase())
    .join("");
}
