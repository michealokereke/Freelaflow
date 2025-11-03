export interface GetProjectsT {
  name: string;
  description?: string;
  clientId: string;
  status: "ACTIVE" | "ARCHIVED" | "COMPLETED";
  budgetCents: number;
  id: string;
}

export interface ProjectDetailT {
  name: string;
  description: string;
  status: "ACTIVE" | "ARCHIVED" | "COMPLETED";
  id: string;
  clientId: string;
  clientName: string;
  budget: number;
}
