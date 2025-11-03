import React from "react";
import { Input } from "../ui/input";
import { ListFilter, Search } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const ProjectSearchInput: React.FC<{
  searchQuery: string;
  setQuerychange: (value: string) => void;
  placeholder?: string;
}> = ({ searchQuery, setQuerychange, placeholder }) => {
  return (
    <div className="flex gap-3 justify-between items-center">
      <div className="flex gap-1 flex-1 items-center max-w-144 border border-border rounded-lg bg-card">
        <Input
          className="flex-1"
          type="text"
          value={searchQuery}
          onChange={(e) => setQuerychange(e.target.value)}
          placeholder={placeholder || "Input your search"}
        />
        <Search
          size={40}
          className="hover:bg-surface-2 h-full p-2 rounded-2xl"
        />
      </div>{" "}
      <DropdownMenu>
        <DropdownMenuTrigger>
          {" "}
          <ListFilter
            className="bg-card p-2 rounded-lg hover:bg-surface-2 hover:shadow-shadow-strong hover:shadow"
            size={40}
          />
        </DropdownMenuTrigger>
        <DropdownMenuContent>
          <DropdownMenuLabel>Sort By</DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuItem>Profile</DropdownMenuItem>
          <DropdownMenuItem>Billing</DropdownMenuItem>
          <DropdownMenuItem>Team</DropdownMenuItem>
          <DropdownMenuItem>Subscription</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default ProjectSearchInput;
