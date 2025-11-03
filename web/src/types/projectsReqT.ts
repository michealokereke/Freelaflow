export interface GetProjectsT {
  name: string;
  description?: string;
  clientId: string;
  status: "ACTIVE" | "ARCHIVED" | "COMPLETED";
  budgetCents: number;
  id: string;
}

interface Tasks {
  id: string;
  title: string;
  status: "OPEN" | "IN_PROGRESS" | "REVIEW" | "DONE" | "BLOCKED";
  estimateMins: number;
}

export interface ProjectDetailT {
  name: string;
  description: string;
  status: "ACTIVE" | "ARCHIVED" | "COMPLETED";
  id: string;
  clientId: string;
  clientName: string;
  budget: number;
  tasks: Tasks[];
}
