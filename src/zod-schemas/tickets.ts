import { tickets } from "@/db/schema";
import {
  createInsertSchema,
  CreateInsertSchema,
  createSelectSchema,
} from "drizzle-zod";
import { z } from "zod/v4";

export const insertTicketSchema = createInsertSchema(tickets, {
  id: z.union([z.number(), z.literal("New")]),
  title: () => z.string().min(1, "Title is required"),
  description: () => z.string().min(1, "Description is required"),
  tech: () => z.string().email("Invalid Email address"),
});
export const selectTicketSchema = createSelectSchema(tickets);

export type insertTicketSchemaType = z.infer<typeof insertTicketSchema>;
export type selectTicketSchemaType = z.infer<typeof selectTicketSchema>;
