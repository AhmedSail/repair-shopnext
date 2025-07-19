"use client";

import { LoaderCircle } from "lucide-react";
import { useFormStatus } from "react-dom";
import { Button } from "./ui/button";
export default function SearchButton() {
  const status = useFormStatus();
  return (
    <Button type="submit" className="w-20" disabled={status.pending}>
      {status.pending ? <LoaderCircle className="animate-spin" /> : "Search"}
    </Button>
  );
}
