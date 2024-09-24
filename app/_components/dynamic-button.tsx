import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";
import { ButtonHTMLAttributes } from "react";

interface DynamicButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  text: string;
  Icon?: LucideIcon;
}

export default function DynamicButton({
  text,
  Icon,
  className,
  ...props
}: DynamicButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 text-sm font-semibold text-white rounded-md bg-gradient-to-b from-gray-700 to-gray-800 hover:from-gray-600 hover:to-gray-700 active:from-gray-800 active:to-gray-900 focus:outline-none focus:ring-2 focus:ring-gray-400 focus:ring-opacity-50 shadow-md transition-colors duration-200 flex items-center justify-center",
        className
      )}
      {...props}
    >
      {text}
      {Icon && <Icon className="w-4 h-4 ml-2" />}
    </button>
  );
}
