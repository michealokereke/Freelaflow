import { Card } from "@/components/ui/card";
import React from "react";

const TeamMembers = () => {
  const teamMembers = [
    { id: "user-001", name: "Sarah Johnson", role: "Designer", avatar: "👩‍💼" },
    { id: "user-002", name: "Mike Chen", role: "Developer", avatar: "👨‍💻" },
  ];

  return (
    <Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Team Members</h2>
      <div className="space-y-3">
        {teamMembers.map((member) => (
          <div key={member.id} className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-muted flex items-center justify-center text-lg">
              {member.avatar}
            </div>
            <div>
              <p className="text-foreground font-medium text-sm">
                {member.name}
              </p>
              <p className="text-muted-foreground text-xs">{member.role}</p>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
};

export default TeamMembers;
