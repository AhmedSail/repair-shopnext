"use client";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import NavButton from "./NavButton";
import { LucideIcon } from "lucide-react";
import Link from "next/link";
type Props = {
  icon: LucideIcon;
  label: string;
  choices: {
    title: string;
    href: string;
  }[];
};
export default function NavButtonMenu({ icon: Icon, label, choices }: Props) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full">
          <Icon className="h-[1.2rem] w-[1.2rem]" />
          <span className="sr-only">{label}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        {choices.map((c) => (
          <DropdownMenuItem key={c.title} asChild>
            <Link href={c.href}>{c.title}</Link>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
