"use client";
import { useFormContext } from "react-hook-form";
import {
  FormControl,
  FormField,
  FormMessage,
  FormItem,
  FormLabel,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { SelectHTMLAttributes } from "react";

type Props<S> = {
  fieldTitle: string;
  nameInSchema: keyof S & string;
  data: DataObj[];
  className?: string;
} & SelectHTMLAttributes<HTMLSelectElement>;
type DataObj = {
  id: string;
  description: string;
};
export default function SelectWithLabel<S>({
  fieldTitle,
  nameInSchema,
  data,
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
          <FormLabel className="text-base" htmlFor={nameInSchema}>
            {fieldTitle}
          </FormLabel>
          <Select {...field} onValueChange={field.onChange}>
            <FormControl>
              <SelectTrigger
                name={nameInSchema}
                className={`w-full max-w-xs ${className}`}
              >
                <SelectValue placeholder="Select"></SelectValue>
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data.map((i) => (
                <SelectItem key={`${nameInSchema}_${i.id}`} value={i.id}>
                  {i.description}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <FormMessage />
        </FormItem>
      )}
    ></FormField>
  );
}
