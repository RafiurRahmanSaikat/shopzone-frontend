"use client"

import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"

export default function CategoryFilter({ categories, value, onChange }) {
  return (
    <ScrollArea className="w-full whitespace-nowrap">
      <div className="flex gap-2 pb-3">
        <Button
          variant={!value ? "default" : "outline"}
          size="sm"
          onClick={() => onChange(null)}
          className="rounded-full"
        >
          All
        </Button>
        {categories.map((c) => (
          <Button
            key={c.id}
            variant={value === c.id ? "default" : "outline"}
            size="sm"
            onClick={() => onChange(c.id)}
            className="rounded-full"
          >
            {c.name}
          </Button>
        ))}
      </div>
      <ScrollBar orientation="horizontal" />
    </ScrollArea>
  )
}
