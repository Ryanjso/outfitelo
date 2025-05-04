import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "~/db";
import { galaEvent } from "~/db/schema";

// TODO cache in redis
export const getRankings = createServerFn()
  .validator(
    z.object({
      year: z.number(),
    })
  )
  .handler(async ({ data }) => {
    const galaEvent = await db.query.galaEvent.findFirst({
      where: (galaEvent, { eq }) => eq(galaEvent.year, data.year),
      with: {
        outfits: {
          with: {
            ratings: true,
          },
        },
      },
    });

    if (!galaEvent) {
      throw notFound();
    }

    const rankings = galaEvent.outfits.map((outfit) => {
      const { ratings, ...rest } = outfit;

      return {
        ...rest,
        rating:
          outfit.ratings.reduce(
            (acc, rating) => acc + Number(rating.rating),
            0
          ) / outfit.ratings.length,
      };
    });

    return rankings;
  });
