import * as React from "react";

import { cn } from "@/lib/utils";

const Input = React.forwardRef<
  HTMLInputElement,
  React.ComponentProps<"input"> & { prefix?: string; suffix?: string }
>(({ className, type, prefix, suffix, ...props }, ref) => {
  return (
    <div className="relative flex items-center">
      {prefix && (
        <span className="absolute left-3 text-muted-foreground">{prefix}</span>
      )}
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          prefix ? "pl-10" : "",
          suffix ? "pr-10" : "",
          className
        )}
        ref={ref}
        {...props}
      />
      {suffix && (
        <span className="absolute right-3 text-muted-foreground">{suffix}</span>
      )}
    </div>
  );
});
Input.displayName = "Input";

export { Input };
