"use client";

import { Button } from "@/components/ui/button";

export default function Error({ reset }: { error: Error; reset: () => void }) {
  return (
    <div className="grid min-h-[70vh] place-items-center px-6 text-center">
      <div className="max-w-md">
        <p className="text-sm font-medium tracking-[0.2em] text-indigo">ERROR</p>
        <h1 className="mt-3 text-3xl font-semibold">Something went wrong</h1>
        <p className="mt-3 text-muted">
          An unexpected error occurred while loading this section.
        </p>
        <div className="mt-7">
          <Button onClick={reset}>Try again</Button>
        </div>
      </div>
    </div>
  );
}
