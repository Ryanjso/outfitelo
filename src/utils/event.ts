import { notFound } from "@tanstack/react-router";
import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { db } from "~/db";

export const getEventByYear = createServerFn()
  .validator(z.number())
  .handler(async ({ data }) => {
    const event = await db.query.galaEvent.findFirst({
      where: (galaEvent, { eq }) => eq(galaEvent.year, data),
    });

    if (!event) {
      throw notFound();
    }

    return event;
  });
