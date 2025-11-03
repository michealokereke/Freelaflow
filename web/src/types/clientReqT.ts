export interface GetclientT {
  email: string;
  name: string;
  id: string;
  _count: { projects: number };
  createdAt: Date;
}

export interface ClientDetailsT {
  id: string;
  organizationId: string;
  name: string;
  email?: string;
  phone?: string;
  address?: string;
  createdAt: Date;
}
