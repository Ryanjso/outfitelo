import { createServerFn } from "@tanstack/react-start";
import { sql } from "drizzle-orm";
import { db } from "~/db";

export const getPair = createServerFn().handler(async () => {
  const pair = await db.query.outfit.findMany({
    orderBy: sql`RANDOM()`,
    limit: 2,
  });

  // ensures tuple and typesafety
  if (pair[0] && pair[1]) {
    return [pair[0], pair[1]];
  } else {
    throw new Error("No pair found");
  }
});
