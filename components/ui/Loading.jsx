"use client";

import { Spinner } from "@/components/ui/spinner";

export default function Loading({ className = "", message = "Loading..." }) {
  return (
    <div
      className={`flex flex-col items-center justify-center p-6 ${className}`}
    >
      <Spinner className="h-8 w-8" />
      {message ? (
        <p className="mt-3 text-sm text-muted-foreground">{message}</p>
      ) : null}
    </div>
  );
}
