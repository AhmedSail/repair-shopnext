"use server";

import { db } from "@/db";
import { tickets } from "@/db/schema";
import { actionClient } from "@/lib/safe-action";
import {
  insertTicketSchema,
  type insertTicketSchemaType,
} from "@/zod-schemas/tickets";
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { eq } from "drizzle-orm";
import { flattenValidationErrors } from "next-safe-action";
import { redirect } from "next/navigation";

export const saveTicketAction = actionClient
  .metadata({
    actionName: "saveTicketAction",
  })
  .schema(insertTicketSchema, {
    handleValidationErrorsShape: async (ve) =>
      flattenValidationErrors(ve).fieldErrors,
  })
  .action(
    async ({
      parsedInput: ticket,
    }: {
      parsedInput: insertTicketSchemaType;
    }) => {
      const { isAuthenticated } = getKindeServerSession();
      const isAuth = await isAuthenticated();
      if (!isAuth) {
        redirect("login");
      }
      if (ticket.id === "New") {
        const result = await db
          .insert(tickets)
          .values({
            customerId: ticket.customerId,
            title: ticket.title,
            tech: ticket.tech,
            description: ticket.description,
          })
          .returning({ insertedId: tickets.id });
        return {
          message: `Ticket ID #${result[0].insertedId} created Successfully`,
        };
      }
      const result = await db
        .update(tickets)
        .set({
          customerId: ticket.customerId,
          title: ticket.title,
          completed: ticket.completed,
          tech: ticket.tech,
          description: ticket.description,
        })
        .where(eq(tickets.id, ticket.id!))
        .returning({ updatedId: tickets.id });
      return {
        message: `Ticket ID #${result[0].updatedId} updated Successfully`,
      };
    }
  );
