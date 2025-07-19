import { migrate } from "drizzle-orm/neon-http/migrator";
import { db } from "./index";

const main = async () => {
  try {
    await migrate(db, {
      migrationsFolder: "src/db/migrations",
    });
  } catch (error) {
    console.log("Error during Migration :", error);
    process.exit(1);
  }
};
main();
