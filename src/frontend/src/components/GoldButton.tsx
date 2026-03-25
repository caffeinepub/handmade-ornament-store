import { cn } from "@/lib/utils";
import type { ButtonHTMLAttributes } from "react";

interface GoldButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "filled" | "outlined";
  size?: "sm" | "md" | "lg";
}

export default function GoldButton({
  variant = "filled",
  size = "md",
  className,
  children,
  ...props
}: GoldButtonProps) {
  const sizeClasses = {
    sm: "px-5 py-2 text-[11px]",
    md: "px-7 py-3 text-[12px]",
    lg: "px-10 py-4 text-[13px]",
  };

  if (variant === "outlined") {
    return (
      <button
        className={cn(
          "font-nunito tracking-[0.25em] uppercase font-semibold border border-coral-main text-coral-main rounded",
          "hover:bg-coral-main hover:text-white transition-all duration-300",
          sizeClasses[size],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  }

  return (
    <button
      className={cn(
        "shimmer-coral-hover font-nunito tracking-[0.25em] uppercase font-semibold text-white rounded",
        sizeClasses[size],
        className,
      )}
      style={{
        background:
          "linear-gradient(90deg, #E8547A 0%, #F0905A 40%, #D4821A 60%, #E8547A 100%)",
        backgroundSize: "200% 100%",
        backgroundPosition: "100% 0",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundPosition =
          "0% 0";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLButtonElement).style.backgroundPosition =
          "100% 0";
      }}
      {...props}
    >
      {children}
    </button>
  );
}
