import { db } from "@/db";
import { customers, tickets } from "@/db/schema";
import { ilike, or, eq, asc } from "drizzle-orm";
import { email } from "zod/v4";

export async function getOpenTickets(searchText: string) {
  const results = await db
    .select({
      id: tickets.id,
      ticketDate: tickets.createdAt,
      title: tickets.title,
      firstName: customers.firstName,
      lastName: customers.lastName,
      email: customers.email,
      tech: tickets.tech,
      completed: tickets.completed,
    })
    .from(tickets)
    .leftJoin(customers, eq(tickets.customerId, customers.id))
    .orderBy(asc(tickets.createdAt));
  return results;
}
