"use client";

import { useEffect } from "react";

export default function Page() {
  useEffect(() => {
    throw new Error("sentry Test Frontend Error");
  }, []);
}
