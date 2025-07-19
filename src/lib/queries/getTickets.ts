import { db } from "@/db";
import { tickets } from "@/db/schema";
import { eq } from "drizzle-orm"; //equivelent

export async function getTickets(id: number) {
  const ticket = await db.select().from(tickets).where(eq(tickets.id, id));

  return ticket[0];
}
