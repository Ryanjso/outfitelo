import { createServerFn } from "@tanstack/react-start";
import { db } from "~/db";

// TODO cache in redis
export const getRankings = createServerFn().handler(async () => {
  const rankings = await db.query.outfitRating.findMany({
    orderBy: (outfitRating, { desc }) => [desc(outfitRating.rating)],
    with: {
      outfit: true,
    },
  });

  return rankings;
});
