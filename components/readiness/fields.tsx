"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import type { Choice } from "@/lib/readiness/options";

/** Single-select grid of cards. */
export function ChoiceGroup({
  options,
  value,
  onChange,
  columns = 1,
}: {
  options: Choice[];
  value: string;
  onChange: (value: string) => void;
  columns?: 1 | 2;
}) {
  return (
    <div
      className={cn(
        "grid gap-3",
        columns === 2 ? "sm:grid-cols-2" : "grid-cols-1",
      )}
    >
      {options.map((option) => {
        const selected = value === option.value;
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => onChange(option.value)}
            className={cn(
              "flex items-start gap-3 rounded-2xl border px-5 py-4 text-left transition-all duration-200",
              selected
                ? "border-blue bg-blue-soft shadow-soft"
                : "border-line bg-white hover:border-blue/40 hover:bg-blue-soft/40",
            )}
          >
            <span
              className={cn(
                "mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
                selected ? "border-blue bg-blue text-white" : "border-line bg-white",
              )}
            >
              {selected ? <Check className="size-3" strokeWidth={3} /> : null}
            </span>
            <span>
              <span className="block text-sm font-semibold text-navy">{option.label}</span>
              {option.description ? (
                <span className="mt-0.5 block text-sm text-muted">{option.description}</span>
              ) : null}
            </span>
          </button>
        );
      })}
    </div>
  );
}

/** Multi-select grid of cards. */
export function MultiChoiceGroup({
  options,
  values,
  onChange,
  columns = 2,
}: {
  options: Choice[];
  values: string[];
  onChange: (values: string[]) => void;
  columns?: 1 | 2;
}) {
  const toggle = (value: string) => {
    if (values.includes(value)) {
      onChange(values.filter((v) => v !== value));
    } else {
      onChange([...values, value]);
    }
  };

  return (
    <div
      className={cn(
        "grid gap-3",
        columns === 2 ? "sm:grid-cols-2" : "grid-cols-1",
      )}
    >
      {options.map((option) => {
        const selected = values.includes(option.value);
        return (
          <button
            key={option.value}
            type="button"
            onClick={() => toggle(option.value)}
            className={cn(
              "flex items-center gap-3 rounded-2xl border px-5 py-4 text-left transition-all duration-200",
              selected
                ? "border-blue bg-blue-soft shadow-soft"
                : "border-line bg-white hover:border-blue/40 hover:bg-blue-soft/40",
            )}
          >
            <span
              className={cn(
                "flex size-5 shrink-0 items-center justify-center rounded-md border-2 transition-colors",
                selected ? "border-blue bg-blue text-white" : "border-line bg-white",
              )}
            >
              {selected ? <Check className="size-3" strokeWidth={3} /> : null}
            </span>
            <span className="text-sm font-semibold text-navy">{option.label}</span>
          </button>
        );
      })}
    </div>
  );
}

export function TextField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-navy">{label}</span>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-line bg-white px-5 py-3.5 text-sm text-ink shadow-soft outline-none transition-colors focus:border-blue"
      />
    </label>
  );
}

export function TextAreaField({
  label,
  value,
  onChange,
  placeholder,
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-navy">{label}</span>
      <textarea
        value={value}
        placeholder={placeholder}
        onChange={(e) => onChange(e.target.value)}
        rows={3}
        className="w-full resize-none rounded-2xl border border-line bg-white px-5 py-3.5 text-sm text-ink shadow-soft outline-none transition-colors focus:border-blue"
      />
    </label>
  );
}

export function SelectField({
  label,
  value,
  onChange,
  options,
  placeholder = "Select an option",
}: {
  label: string;
  value: string;
  onChange: (value: string) => void;
  options: Choice[];
  placeholder?: string;
}) {
  return (
    <label className="block">
      <span className="mb-2 block text-sm font-semibold text-navy">{label}</span>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full rounded-2xl border border-line bg-white px-5 py-3.5 text-sm text-ink shadow-soft outline-none transition-colors focus:border-blue"
      >
        <option value="" disabled>
          {placeholder}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </label>
  );
}
