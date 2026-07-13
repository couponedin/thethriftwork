import { cn } from "@/lib/utils";

export type MaterialSymbolProps = {
  name: string;
  className?: string;
  "aria-hidden"?: boolean | "true" | "false";
};

export function MaterialSymbol({
  name,
  className,
  "aria-hidden": ariaHidden = true,
}: MaterialSymbolProps) {
  return (
    <span
      className={cn("material-symbols-outlined", className)}
      aria-hidden={ariaHidden}
    >
      {name}
    </span>
  );
}
