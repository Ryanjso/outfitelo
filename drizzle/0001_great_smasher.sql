ALTER TABLE "match" ALTER COLUMN "rating1_before" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "match" ALTER COLUMN "rating2_before" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "match" ALTER COLUMN "rating1_after" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "match" ALTER COLUMN "rating2_after" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "outfit_rating" ALTER COLUMN "rating" SET DATA TYPE numeric(10, 2);--> statement-breakpoint
ALTER TABLE "outfit_rating" ALTER COLUMN "rating" SET DEFAULT '1500';