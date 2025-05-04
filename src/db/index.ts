// import { neon } from "@neondatabase/serverless";
// import { drizzle } from "drizzle-orm/neon-http";
import { drizzle } from "drizzle-orm/neon-serverless";
import ws from "ws";

import * as schema from "./schema";

if (!process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL is not set");
}

// const sql = neon(process.env.DATABASE_URL!);
// export const db = drizzle({ client: sql, schema });
export const db = drizzle({
  connection: process.env.DATABASE_URL,
  schema,
  ws,
});
