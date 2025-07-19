"use server";
import { neon } from "@neondatabase/serverless";

export async function getData() {
  const sql = neon(process.env.POSTGRES_URL!);
  const data = await sql`...`;
  return data;
}
