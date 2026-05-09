"use client"

import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

export default function StarRating({ value = 0, size = 16, interactive = false, onChange, className }) {
  const stars = [1, 2, 3, 4, 5]
  const rounded = Math.round(value)

  return (
    <div className={cn("inline-flex items-center gap-0.5", className)} role="img" aria-label={`Rating: ${value} of 5`}>
      {stars.map((s) => {
        const filled = s <= rounded
        const Element = interactive ? "button" : "span"
        return (
          <Element
            key={s}
            type={interactive ? "button" : undefined}
            onClick={interactive ? () => onChange && onChange(s) : undefined}
            className={cn(
              interactive && "cursor-pointer transition-transform hover:scale-110",
              !interactive && "pointer-events-none",
            )}
            aria-label={interactive ? `Rate ${s} stars` : undefined}
          >
            <Star
              style={{ width: size, height: size }}
              className={cn(
                filled ? "fill-yellow-400 text-yellow-400" : "fill-transparent text-muted-foreground/40",
              )}
            />
          </Element>
        )
      })}
    </div>
  )
}
