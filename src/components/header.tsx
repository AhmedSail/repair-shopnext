"use client";
import { HomeIcon, File, UserRound, LogOut } from "lucide-react";
import Link from "next/link";
import NavButton from "@/components/NavButton";
import { ModeToggle } from "./ModeToggle";
import { LogoutLink } from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "./ui/button";
import NavButtonMenu from "./NavButtonMenu";

export function Header() {
  return (
    <header className="slide-in bg-background h-12 p-2 border-b sticky top-0 z-20 ">
      <div className="flex h-8 items-center justify-between w-full">
        <div className="flex items-center gap-2">
          <NavButton href="/home" label="Home" icon={HomeIcon} />
          <Link
            href="/home"
            className="flex justify-center items-center gap-2 ml-0"
            title="Home"
          >
            <h1 className="hidden sm:block text-xl font-bold m-0 mt-1">
              Computer Repair Shop
            </h1>
          </Link>
        </div>
        <div className="flex items-center">
          <NavButton href="/tickets" label="Ticket" icon={File} />
          <NavButtonMenu
            icon={UserRound}
            label="Customer Menu"
            choices={[
              { title: "Search Customers", href: "/customers" },
              { title: "New Customer", href: "/customers/form" },
            ]}
          />
          <ModeToggle />
          <Button
            asChild
            variant="ghost"
            size="icon"
            aria-label="LogOut"
            title="Logout"
            className="rounded-full mt-2"
          >
            <LogoutLink>
              <LogOut />
            </LogoutLink>
          </Button>
        </div>
      </div>
    </header>
  );
}
