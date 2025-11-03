"use client";

import { useState } from "react";
import {
  ArrowLeft,
  Calendar,
  MoreVertical,
  Edit2,
  Trash2,
  Play,
  Pause,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import Link from "next/link";

// Mock data - replace with real API calls
const mockProject = {
  id: "proj-001",
  name: "Website Redesign",
  clientId: "client-001",
  clientName: "Acme Corporation",
  description:
    "Complete redesign of the company website with modern UI/UX and improved performance.",
  status: "in-progress",
  budget: 12500,
  spent: 8750,
  startDate: "2024-09-01",
  endDate: "2024-11-30",
  progress: 70,
  teamMembers: [
    { id: "user-001", name: "Sarah Johnson", role: "Designer", avatar: "👩‍💼" },
    { id: "user-002", name: "Mike Chen", role: "Developer", avatar: "👨‍💻" },
  ],
  tasks: [
    { id: "task-001", name: "Design mockups", status: "completed", hours: 40 },
    {
      id: "task-002",
      name: "Frontend development",
      status: "in-progress",
      hours: 60,
    },
    {
      id: "task-003",
      name: "Backend integration",
      status: "pending",
      hours: 30,
    },
    { id: "task-004", name: "Testing & QA", status: "pending", hours: 20 },
  ],
  timeEntries: [
    {
      id: "time-001",
      date: "2024-10-20",
      member: "Sarah Johnson",
      task: "Design mockups",
      hours: 8,
      rate: 75,
    },
    {
      id: "time-002",
      date: "2024-10-20",
      member: "Mike Chen",
      task: "Frontend development",
      hours: 6,
      rate: 85,
    },
    {
      id: "time-003",
      date: "2024-10-19",
      member: "Sarah Johnson",
      task: "Design mockups",
      hours: 4,
      rate: 75,
    },
  ],
  invoices: [
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
      amount: 3500,
      status: "pending",
      date: "2024-10-20",
    },
  ],
};

export default function ProjectDetailPage() {
  const [showMenu, setShowMenu] = useState(false);
  const [timerActive, setTimerActive] = useState(false);

  const remainingBudget = mockProject.budget - mockProject.spent;
  const budgetPercentage = (mockProject.spent / mockProject.budget) * 100;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b border-border bg-card">
        <div className="max-w-7xl mx-auto px-6 py-6">
          <Link
            href="/projects"
            className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-4 w-fit"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
          <div className="flex items-start justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">
                {mockProject.name}
              </h1>
              <Link
                href={`/clients/${mockProject.clientId}`}
                className="text-muted-foreground hover:text-primary mt-1"
              >
                {mockProject.clientName}
              </Link>
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
                    Edit Project
                  </button>
                  <button className="w-full px-4 py-2 text-left hover:bg-muted flex items-center gap-2 text-sm text-destructive">
                    <Trash2 className="w-4 h-4" />
                    Delete Project
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
          {/* Left Column - Overview */}
          <div className="lg:col-span-1 space-y-6">
            {/* Status Card */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Status</h2>
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-blue-500"></div>
                <span className="capitalize text-foreground font-medium">
                  {mockProject.status}
                </span>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Progress</span>
                  <span className="font-medium">{mockProject.progress}%</span>
                </div>
                <div className="w-full bg-muted rounded-full h-2">
                  <div
                    className="bg-primary h-2 rounded-full transition-all"
                    style={{ width: `${mockProject.progress}%` }}
                  ></div>
                </div>
              </div>
            </Card>

            {/* Timeline */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Timeline</h2>
              <div className="space-y-3">
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">Start Date</p>
                    <p className="text-foreground font-medium">
                      {new Date(mockProject.startDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Calendar className="w-5 h-5 text-muted-foreground" />
                  <div>
                    <p className="text-sm text-muted-foreground">End Date</p>
                    <p className="text-foreground font-medium">
                      {new Date(mockProject.endDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </div>
            </Card>

            {/* Team Members */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Team Members</h2>
              <div className="space-y-3">
                {mockProject.teamMembers.map((member) => (
                  <div key={member.id} className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">
                      {member.avatar}
                    </div>
                    <div>
                      <p className="text-foreground font-medium text-sm">
                        {member.name}
                      </p>
                      <p className="text-muted-foreground text-xs">
                        {member.role}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>

          {/* Right Column - Details */}
          <div className="lg:col-span-2 space-y-6">
            {/* Budget Overview */}
            <div className="grid grid-cols-3 gap-4">
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Budget</p>
                <p className="text-2xl font-bold text-foreground">
                  ${mockProject.budget.toLocaleString()}
                </p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Spent</p>
                <p className="text-2xl font-bold text-orange-600">
                  ${mockProject.spent.toLocaleString()}
                </p>
              </Card>
              <Card className="p-4">
                <p className="text-sm text-muted-foreground mb-1">Remaining</p>
                <p className="text-2xl font-bold text-green-600">
                  ${remainingBudget.toLocaleString()}
                </p>
              </Card>
            </div>

            {/* Budget Progress */}
            <Card className="p-6">
              <h2 className="text-lg font-semibold mb-4">Budget Allocation</h2>
              <div className="space-y-3">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Spent</span>
                  <span className="font-medium">
                    {budgetPercentage.toFixed(1)}%
                  </span>
                </div>
                <div className="w-full bg-muted rounded-full h-3">
                  <div
                    className="bg-orange-500 h-3 rounded-full transition-all"
                    style={{ width: `${budgetPercentage}%` }}
                  ></div>
                </div>
              </div>
            </Card>

            {/* Tasks */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Tasks</h2>
                <Button size="sm">Add Task</Button>
              </div>
              <div className="space-y-3">
                {mockProject.tasks.map((task) => (
                  <div
                    key={task.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="checkbox"
                        className="w-4 h-4 rounded"
                        checked={task.status === "completed"}
                        readOnly
                      />
                      <div>
                        <p
                          className={`font-medium ${
                            task.status === "completed"
                              ? "line-through text-muted-foreground"
                              : "text-foreground"
                          }`}
                        >
                          {task.name}
                        </p>
                        <p className="text-sm text-muted-foreground">
                          {task.hours}h estimated
                        </p>
                      </div>
                    </div>
                    <span
                      className={`text-xs px-2 py-1 rounded-full ${
                        task.status === "completed"
                          ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                          : task.status === "in-progress"
                          ? "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200"
                          : "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-200"
                      }`}
                    >
                      {task.status}
                    </span>
                  </div>
                ))}
              </div>
            </Card>

            {/* Time Entries */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Time Entries</h2>
                <Button
                  size="sm"
                  variant={timerActive ? "destructive" : "default"}
                  onClick={() => setTimerActive(!timerActive)}
                  className="gap-2"
                >
                  {timerActive ? (
                    <>
                      <Pause className="w-4 h-4" />
                      Stop Timer
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4" />
                      Start Timer
                    </>
                  )}
                </Button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b border-border">
                      <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                        Date
                      </th>
                      <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                        Member
                      </th>
                      <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                        Task
                      </th>
                      <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                        Hours
                      </th>
                      <th className="text-left py-2 px-3 text-muted-foreground font-medium">
                        Amount
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {mockProject.timeEntries.map((entry) => (
                      <tr
                        key={entry.id}
                        className="border-b border-border hover:bg-muted"
                      >
                        <td className="py-3 px-3 text-foreground">
                          {entry.date}
                        </td>
                        <td className="py-3 px-3 text-foreground">
                          {entry.member}
                        </td>
                        <td className="py-3 px-3 text-muted-foreground">
                          {entry.task}
                        </td>
                        <td className="py-3 px-3 text-foreground font-medium">
                          {entry.hours}h
                        </td>
                        <td className="py-3 px-3 text-foreground font-medium">
                          ${(entry.hours * entry.rate).toLocaleString()}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </Card>

            {/* Invoices */}
            <Card className="p-6">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-lg font-semibold">Invoices</h2>
                <Button size="sm">Create Invoice</Button>
              </div>
              <div className="space-y-3">
                {mockProject.invoices.map((invoice) => (
                  <div
                    key={invoice.id}
                    className="flex items-center justify-between p-3 border border-border rounded-lg hover:bg-muted transition-colors"
                  >
                    <div>
                      <p className="font-medium text-foreground">
                        {invoice.number}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        {invoice.date}
                      </p>
                    </div>
                    <div className="flex items-center gap-4">
                      <p className="font-medium text-foreground">
                        ${invoice.amount.toLocaleString()}
                      </p>
                      <span
                        className={`text-xs px-2 py-1 rounded-full ${
                          invoice.status === "paid"
                            ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-200"
                            : "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-200"
                        }`}
                      >
                        {invoice.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
