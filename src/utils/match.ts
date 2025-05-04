import { createServerFn } from "@tanstack/react-start";
import { eq } from "drizzle-orm";
import { sql } from "drizzle-orm";
import { z } from "zod";
import { db } from "~/db";
import { calculateElo } from "./elo";
import { match, outfitRating } from "~/db/schema";

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

export const vote = createServerFn()
  .validator(
    z.object({
      winnerOutfitId: z.number(),
      loserOutfitId: z.number(),
    })
  )
  .handler(async ({ data }) => {
    const { winnerOutfitId, loserOutfitId } = data;

    try {
      const result = await db.transaction(async (tx) => {
        const [winner, loser] = await Promise.all([
          tx.query.outfitRating.findFirst({
            where: (outfitRating, { eq }) =>
              eq(outfitRating.outfitId, winnerOutfitId),
          }),
          tx.query.outfitRating.findFirst({
            where: (outfitRating, { eq }) =>
              eq(outfitRating.outfitId, loserOutfitId),
          }),
        ]);

        if (!winner || !loser) {
          throw new Error(
            `Outfit not found: ${winnerOutfitId}, ${loserOutfitId}`
          );
        }

        const { RaPrime, RbPrime } = calculateElo(winner.rating, loser.rating);

        const [matchRecord] = await tx
          .insert(match)
          .values({
            outfit1Id: winnerOutfitId,
            outfit2Id: loserOutfitId,
            winnerId: winnerOutfitId,
            loserId: loserOutfitId,
            rating1Before: winner.rating,
            rating2Before: loser.rating,
            rating1After: RaPrime,
            rating2After: RbPrime,
          })
          .returning();

        const [updatedWinner] = await tx
          .update(outfitRating)
          .set({
            rating: RaPrime,
          })
          .where(eq(outfitRating.outfitId, winnerOutfitId))
          .returning();

        const [updatedLoser] = await tx
          .update(outfitRating)
          .set({
            rating: RbPrime,
          })
          .where(eq(outfitRating.outfitId, loserOutfitId))
          .returning();

        return { matchRecord, updatedWinner, updatedLoser };
      });

      const { matchRecord, updatedWinner, updatedLoser } = result;

      return {
        matchRecord,
        newRatings: { winner: updatedWinner, loser: updatedLoser },
      };
    } catch (error) {
      console.error(error);
      throw new Error("Failed to vote");
    }
  });
