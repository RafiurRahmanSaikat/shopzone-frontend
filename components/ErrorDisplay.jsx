"use client";

import { Button } from "@/components/ui/button";
import { AlertCircle, RotateCw } from "lucide-react";

export function ErrorDisplay({
  error,
  onRetry,
  title = "Failed to load",
  showRetry = true,
}) {
  const message = error?.message || "An error occurred. Please try again.";

  return (
    <div className="flex flex-col items-center justify-center rounded-lg border border-destructive/20 bg-destructive/5 px-4 py-8 text-center">
      <AlertCircle className="h-10 w-10 text-destructive mb-3" />
      <h3 className="font-semibold text-foreground mb-1">{title}</h3>
      <p className="text-sm text-muted-foreground mb-4 max-w-md">{message}</p>
      {showRetry && onRetry && (
        <Button variant="outline" size="sm" onClick={onRetry} className="gap-2">
          <RotateCw className="h-3 w-3" />
          Try again
        </Button>
      )}
    </div>
  );
}

export function ErrorMessage({ error, inline = false }) {
  if (!error) return null;

  const message = error?.message || "Something went wrong";

  if (inline) {
    return (
      <div className="flex items-center gap-2 rounded-md bg-destructive/10 px-3 py-2 text-sm text-destructive">
        <AlertCircle className="h-4 w-4 flex-shrink-0" />
        <span>{message}</span>
      </div>
    );
  }

  return <ErrorDisplay error={error} title="Error" showRetry={false} />;
}
