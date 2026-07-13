import type {
  InputHTMLAttributes,
  TextareaHTMLAttributes,
} from "react";
import { cn } from "@/lib/utils";

const fieldClassName =
  "w-full bg-surface/80 border border-white/[0.08] rounded-xl px-4 py-[18px] text-on-surface placeholder:text-muted-text/70 transition-[border-color,background-color] duration-500 ease-[var(--ease-luxury)] focus:outline-none focus:border-primary/80 focus:bg-surface focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary";

type BaseProps = {
  id: string;
  label: string;
  className?: string;
};

type FormInputProps = BaseProps &
  Omit<InputHTMLAttributes<HTMLInputElement>, "id" | "className"> & {
    as?: "input";
  };

type FormTextareaProps = BaseProps &
  Omit<TextareaHTMLAttributes<HTMLTextAreaElement>, "id" | "className"> & {
    as: "textarea";
  };

export function FormField(props: FormInputProps | FormTextareaProps) {
  const { id, label, className } = props;

  return (
    <div className={cn("space-y-2.5", className)}>
      <label
        htmlFor={id}
        className="font-label-mono text-label-mono uppercase text-muted-text tracking-[0.12em]"
      >
        {label}
      </label>
      {props.as === "textarea" ? (
        <textarea
          id={id}
          className={cn(fieldClassName, "resize-none min-h-[120px]")}
          name={props.name}
          placeholder={props.placeholder}
          rows={props.rows}
          required={props.required}
          autoComplete={props.autoComplete}
          disabled={props.disabled}
        />
      ) : (
        <input
          id={id}
          className={fieldClassName}
          name={props.name}
          type={props.type}
          placeholder={props.placeholder}
          required={props.required}
          autoComplete={props.autoComplete}
          disabled={props.disabled}
        />
      )}
    </div>
  );
}
