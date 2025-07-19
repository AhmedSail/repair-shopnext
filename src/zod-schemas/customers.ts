import { customers } from "@/db/schema";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { z } from "zod/v4";
export const insertCustomerSchema = createInsertSchema(customers, {
  id: () => z.union([z.number(), z.literal("New")]),
  firstName: () => z.string().min(1, "First Name is required"),
  lastName: () => z.string().min(1, "Last Name is required"),
  address1: () => z.string().min(1, "Address is required"),
  city: () => z.string().min(1, "City is required"),
  state: () => z.string().length(2, "State must be exactly 2 characters"),
  email: () => z.string().trim().email("Invalid email format").min(1),
  phone: () =>
    z
      .string()
      .regex(/^\d{3}-\d{3}-\d{4}?$/, "Phone number format , Use XXX-XXX-XXXX"),
  zip: () =>
    z
      .string()
      .regex(
        /^\d{5}(-\d{4})?$/,
        "Invalid Zip code. Use 5 digits or 5 digits followed by a hyphen and 4 digits "
      ),
});
export const selectCustomerSchema = createSelectSchema(customers);
export type insertCustomerSchemaType = z.infer<typeof insertCustomerSchema>;
export type selectCustomerSchemaType = z.infer<typeof selectCustomerSchema>;
