// drizzle.config.ts
import { config } from "dotenv";
config({ path: ".env.local" });

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.POSTGRES_URL!,
  },
};
