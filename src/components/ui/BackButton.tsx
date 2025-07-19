"use client";

import { useRouter } from "next/navigation";
import { Button } from "./button";
import { ButtonHTMLAttributes } from "react";
type props = {
  title: string;
  className?: string;
  variant?:
    | "default"
    | "destructive"
    | "outline"
    | "secondary"
    | "ghost"
    | "link"
    | null
    | undefined;
} & ButtonHTMLAttributes<HTMLButtonElement>;
export default function BackButton({
  title,
  variant,
  className,
  ...props
}: Props) {
  const router = useRouter();
  return (
    <Button
      className={className}
      variant={variant}
      title={title}
      onClick={() => router.back()}
    >
      {title}
    </Button>
  );
}
