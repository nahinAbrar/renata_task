"use client";

import React from "react";
import { cn } from "@/utils/utils"; // your classnames helper

export default function MagicBorderButton({
  children,
  gradient = ["#E2CBFF 0%", "#393BB2 50%", "#E2CBFF 100%"],
  bgClass   = "bg-slate-950",
  textClass = "text-white",
  className,
  ...props
}) {
  // Build the conic-gradient CSS string:
  const gradientCss = `conic-gradient(from 90deg at 50% 50%, ${gradient.join(
    ", "
  )})`;

  return (
    <button
      {...props}
      className={cn(
        "relative inline-flex h-12 overflow-hidden rounded-full p-[1px] focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2 focus:ring-offset-slate-50",
        className
      )}
    >
      {/* Animated border layer */}
      <span
        className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite]"
        style={{ backgroundImage: gradientCss }}
      />

      {/* Inner content */}
      <span
        className={cn(
          "inline-flex h-full w-full cursor-pointer hover:bg-slate-600 items-center justify-center rounded-full px-6 py-3 text-sm font-medium backdrop-blur-3xl",
          bgClass,
          textClass
        )}
      >
        {children}
      </span>
    </button>
  );
}
