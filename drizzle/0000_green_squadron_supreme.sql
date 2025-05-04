CREATE TABLE "gala_event" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "gala_event_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"year" integer NOT NULL,
	"theme" text NOT NULL,
	"description" text,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "gala_event_year_unique" UNIQUE("year")
);
--> statement-breakpoint
CREATE TABLE "match" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "match_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"outfit1_id" integer NOT NULL,
	"outfit2_id" integer NOT NULL,
	"winner_id" integer NOT NULL,
	"loser_id" integer NOT NULL,
	"rating1_before" integer NOT NULL,
	"rating2_before" integer NOT NULL,
	"rating1_after" integer NOT NULL,
	"rating2_after" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "outfit" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "outfit_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"wearer_name" text NOT NULL,
	"designer_name" text,
	"gala_event_id" integer,
	"image_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "outfit_rating" (
	"id" integer PRIMARY KEY GENERATED ALWAYS AS IDENTITY (sequence name "outfit_rating_id_seq" INCREMENT BY 1 MINVALUE 1 MAXVALUE 2147483647 START WITH 1 CACHE 1),
	"outfit_id" integer NOT NULL,
	"rating" integer DEFAULT 1500 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "outfit_rating_outfit_id_unique" UNIQUE("outfit_id")
);
--> statement-breakpoint
ALTER TABLE "match" ADD CONSTRAINT "match_outfit1_id_outfit_id_fk" FOREIGN KEY ("outfit1_id") REFERENCES "public"."outfit"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "match" ADD CONSTRAINT "match_outfit2_id_outfit_id_fk" FOREIGN KEY ("outfit2_id") REFERENCES "public"."outfit"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "match" ADD CONSTRAINT "match_winner_id_outfit_id_fk" FOREIGN KEY ("winner_id") REFERENCES "public"."outfit"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "match" ADD CONSTRAINT "match_loser_id_outfit_id_fk" FOREIGN KEY ("loser_id") REFERENCES "public"."outfit"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "outfit" ADD CONSTRAINT "outfit_gala_event_id_gala_event_id_fk" FOREIGN KEY ("gala_event_id") REFERENCES "public"."gala_event"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "outfit_rating" ADD CONSTRAINT "outfit_rating_outfit_id_outfit_id_fk" FOREIGN KEY ("outfit_id") REFERENCES "public"."outfit"("id") ON DELETE no action ON UPDATE no action;