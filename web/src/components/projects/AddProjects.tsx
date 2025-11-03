import { Plus } from "lucide-react";
import Link from "next/link";
import React from "react";

const AddProjects = () => {
  return (
    <Link
      href={"/dashboard/projects/clientsearch"}
      className="p-2 bg-secondary text-secondary-foreground hover:bg-secondary-400 rounded-lg"
    >
      <Plus size={26} />
    </Link>
  );
};

export default AddProjects;
