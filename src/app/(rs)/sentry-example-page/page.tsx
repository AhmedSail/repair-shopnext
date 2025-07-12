"use client";
import { useCallback } from "react";

export default function Page() {
  const triggerError = useCallback(() => {
    throw new Error("sentry Test Frontend Error");
  }, []);

  return (
    <main className="flex h-dvh items-center justify-center">
      <button
        onClick={triggerError}
        className="px-6 py-3 bg-red-500 text-white rounded"
      >
        اختبار Sentry الآن
      </button>
    </main>
  );
}
