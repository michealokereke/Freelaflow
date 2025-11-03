"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Mail,
  Phone,
  MapPin,
  MoreVertical,
  Edit2,
  Trash2,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

// Mock data - replace with real API calls
const mockClient = {
  id: "client-001",
  name: "Acme Corporation",
  email: "contact@acme.com",
  phone: "+1 (555) 123-4567",
  address: "123 Business Ave, San Francisco, CA 94105",
  company: "Acme Corp",
  website: "www.acme.com",
  joinedDate: "2024-01-15",
  totalInvoiced: 45250,
  totalPaid: 38500,
  outstandingBalance: 6750,
  status: "active",
  projects: [
    {
      id: "proj-001",
      name: "Website Redesign",
      status: "in-progress",
      amount: 12500,
    },
    {
      id: "proj-002",
      name: "Mobile App Development",
      status: "completed",
      amount: 32750,
    },
  ],
  recentInvoices: [
    {
      id: "inv-001",
      number: "INV-2024-001",
      amount: 5250,
      status: "paid",
      date: "2024-10-15",
    },
    {
      id: "inv-002",
      number: "INV-2024-002",
      amount: 8500,
      status: "pending",
      date: "2024-10-20",
    },
    {
      id: "inv-003",
      number: "INV-2024-003",
      amount: 3000,
      status: "overdue",
      date: "2024-09-20",
    },
  ],
};

export default function ClientDetailPage() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link
            href="/clients"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Clients
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {mockClient.name}
              </h1>
              <p className="text-muted-foreground mt-1">{mockClient.company}</p>
            </div>
            <div className="relative">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setShowMenu(!showMenu)}
              >
                <MoreVertical className="w-5 h-5" />
              </Button>
              {showMenu && (
                <div className="absolute right-0 mt-2 w-48 bg-card border border-border rounded-lg shadow-lg z-10">
                  <button className="w-full px-4 py-2 text-left hover:bg-muted flex items-center gap-2 text-sm">
                    <Edit2 className="w-4 h-4" />
                    Edit Client
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-muted flex items-center gap-2 text-sm text-destructive">
                    <Trash2 className="w-4 h-4" />
                    Delete Client
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Contact Info */}
          <div className="lg:col-span-1">
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">
                Contact Information
              </h2>
              <div className="space-y-4">
                <div className="flex items-start gap-3">
                  <Mail className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Email</p>
                    <a
                      href={`mailto:${mockClient.email}`}
                      className="text-foreground hover:text-primary"
                    >
                      {mockClient.email}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <Phone className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Phone</p>
                    <a
                      href={`tel:${mockClient.phone}`}
                      className="text-foreground hover:text-primary"
                    >
                      {mockClient.phone}
                    </a>
                  </div>
                </div>
                <div className="flex items-start gap-3">
                  <MapPin className="w-5 h-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Address</p>
                    <p className="text-foreground">{mockClient.address}</p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Status Card */}
            <Card className="p-6 mt-6">
              <h2 className="text-lg font-semibold mb-4">Status</h2>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full bg-green-500"></div>
                <span className="capitalize text-foreground font-medium">
                  {mockClient.status}
                </span>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                Client since{" "}
                {new Date(mockClient.joinedDate).toLocaleDateString()}
              </p>
            </Card>
          </div>

          {/* Right Column - Financial & Projects */}
          <div className="lg:col-span-2 space-y-6">
            {/* Financial Summary */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">
                  Total Invoiced
                </p>
                <p className="text-2xl font-bold text-foreground">
                  ${mockClient.totalInvoiced.toLocaleString()}
                </p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Total Paid</p>
                <p className="text-2xl font-bold text-green-600">
                  ${mockClient.totalPaid.toLocaleString()}
                </p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">
                  Outstanding
                </p>
                <p className="text-2xl font-bold text-orange-600">
                  ${mockClient.outstandingBalance.toLocaleString()}
                </p>
              </Card>
            </div>

            {/* Projects */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Projects</h2>
                <Button size="sm">New Project</Button>
              </div>
              <div className="space-y-3">
                {mockClient.projects.map((project) => (
                  <Link
                    key={project.id}
                    href={`/projects/${project.id}`}
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {project.name}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        ${project.amount.toLocaleString()}
                      </p>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        project.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                      }`}
                    >
                      {project.status}
                    </span>
                  </Link>
                ))}
              </div>
            </Card>

            {/* Recent Invoices */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Recent Invoices</h2>
                <Button size="sm">Create Invoice</Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                        Invoice
                      </th>
                      <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                        Amount
                      </th>
                      <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                        Date
                      </th>
                      <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockClient.recentInvoices.map((invoice) => (
                      <tr
                        key={invoice.id}
                        className="border-b border-border hover:bg-muted"
                      >
                        <td className="py-3 px-3 text-foreground">
                          {invoice.number}
                        </td>
                        <td className="py-3 px-3 text-foreground font-medium">
                          ${invoice.amount.toLocaleString()}
                        </td>
                        <td className="py-3 px-3 text-muted-foreground">
                          {invoice.date}
                        </td>
                        <td className="py-3 px-3">
                          <span
                            className={`text-xs px-2 py-1 rounded-full ${
                              invoice.status === "paid"
                                ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                                : invoice.status === "pending"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                                : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200"
                            }`}
                          >
                            {invoice.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
