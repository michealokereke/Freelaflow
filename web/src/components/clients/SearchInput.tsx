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

interface SearchParamsT {
  value: string;
  sort: string;
  onChange: (field: "q" | "sort", fieldValue: string | number) => void;
  handleSearch: () => void;
}

const sortList = ["profile", " billing", "team", "Subscription"];

const SearchInput: React.FC<SearchParamsT> = ({
  value,
  sort,
  onChange,
  handleSearch,
}) => {
  return (
    <div className="flex gap-3 justify-between items-center">
      <div className="flex gap-1 flex-1 items-center max-w-144 rounded-lg bg-card">
        <Input
          className="flex-1"
          value={value}
          type="email"
          placeholder="Search clients name or email here"
          onChange={(e) => {
            onChange("q", e.target.value);
          }}
        />
        <Search
          size={40}
          onClick={() => {
            handleSearch();
          }}
          className="hover:bg-surface-2 h-full p-2 rounded-2xl"
        />
      </div>
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
          {sortList.map((item, i) => (
            <DropdownMenuItem
              key={i}
              onClick={() => {
                onChange("sort", item);
              }}
            >
              {item}
            </DropdownMenuItem>
          ))}
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default SearchInput;
