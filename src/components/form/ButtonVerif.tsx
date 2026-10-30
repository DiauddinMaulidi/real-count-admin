"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface DropdownMenuBasicProps {
  status: string;
  onStatusChange: (status: string) => void;
}

export function DropdownMenuBasic({
  status,
  onStatusChange,
}: DropdownMenuBasicProps) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger
        className={
          status === "TERVERIFIKASI"
            ? "bg-green-600"
            : status === "DITOLAK"
              ? "bg-red-600"
              : "bg-amber-300"
        }
        render={<Button variant="outline">{status}</Button>}
      />
      <DropdownMenuContent className="bg-white">
        <DropdownMenuGroup>
          <DropdownMenuItem onClick={() => onStatusChange("DRAFT")}>
            DRAFT
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusChange("TERVERIFIKASI")}>
            TERVERIFIKASI
          </DropdownMenuItem>
          <DropdownMenuItem onClick={() => onStatusChange("DITOLAK")}>
            DITOLAK
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
