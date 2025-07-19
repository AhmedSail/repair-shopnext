"use client";
import {
  FormControl,
  FormField,
  FormLabel,
  FormItem,
  FormMessage,
} from "../ui/form";
import { TextareaHTMLAttributes } from "react";
import { Textarea } from "../ui/textarea";
import { useFormContext } from "react-hook-form";

type Props<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  className?: string;
} & TextareaHTMLAttributes<HTMLTextAreaElement>;

export function TextareaWithLabel<S>({
  fieldTitle,
  nameInSchema,
  className,
  ...props
}: Props<S>) {
  const form = useFormContext();
  return (
    <FormField
      control={form.control}
      name={nameInSchema}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="text-base mb-2" htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>
          <FormControl>
            <Textarea
              id={nameInSchema}
              className={`w-full max-w-xs disabled:text-blue-500 dark:disabled:text-yellow-300 disabled:opacity-75 ${className}`}
              {...props}
              {...field}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  );
}
