import { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
type Props = {
  icon: LucideIcon;
  label: string;
  href?: string;
};

export default function NavButton({ icon: Icon, label, href }: Props) {
  return (
    <Button
      variant="ghost"
      title={label}
      aria-label={label}
      className={`rounded-full p-2 mt-2`}
      asChild
    >
      {href ? (
        <Link href={href}>
          <Icon className=" block font-bold items-center " strokeWidth={2.5} />
        </Link>
      ) : (
        <Icon className=" block font-bold" strokeWidth={2.5} />
      )}
    </Button>
  );
}
