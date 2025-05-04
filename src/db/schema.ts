import { relations } from "drizzle-orm";
import {
  timestamp,
  integer,
  text,
  pgTable,
  numeric,
} from "drizzle-orm/pg-core";

// This db is for a project that compares meta gala outfits using ELO ratings

const timestamps = {
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").notNull().defaultNow(),
};

export const galaEvent = pgTable("gala_event", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  year: integer("year").notNull().unique(),
  theme: text("theme").notNull(),
  description: text("description"),
  ...timestamps,
});

export const outfit = pgTable("outfit", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  wearerName: text("wearer_name").notNull(),
  designerName: text("designer_name"),
  galaEventId: integer("gala_event_id").references(() => galaEvent.id),
  imageUrl: text("image_url").notNull(),
  ...timestamps,
});

export const outfitRating = pgTable("outfit_rating", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  outfitId: integer("outfit_id")
    .references(() => outfit.id)
    .notNull()
    .unique(),
  rating: numeric("rating", { precision: 10, scale: 2 })
    .notNull()
    .default("1500"),
  ...timestamps,
});

export const outfitRatingRelations = relations(outfitRating, ({ one }) => ({
  outfit: one(outfit, {
    fields: [outfitRating.outfitId],
    references: [outfit.id],
  }),
}));

export const match = pgTable("match", {
  id: integer("id").primaryKey().generatedAlwaysAsIdentity(),
  outfit1Id: integer("outfit1_id")
    .references(() => outfit.id)
    .notNull(),
  outfit2Id: integer("outfit2_id")
    .references(() => outfit.id)
    .notNull(),
  winnerId: integer("winner_id")
    .references(() => outfit.id)
    .notNull(),
  loserId: integer("loser_id")
    .references(() => outfit.id)
    .notNull(),
  rating1Before: numeric("rating1_before", {
    precision: 10,
    scale: 2,
  }).notNull(),
  rating2Before: numeric("rating2_before", {
    precision: 10,
    scale: 2,
  }).notNull(),
  rating1After: numeric("rating1_after", { precision: 10, scale: 2 }).notNull(),
  rating2After: numeric("rating2_after", { precision: 10, scale: 2 }).notNull(),
  // TODO add ip address for abuse prevention
  ...timestamps,
});
