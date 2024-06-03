ALTER TABLE "tasks" RENAME TO "Tasks";--> statement-breakpoint
ALTER TABLE "Tasks" ALTER COLUMN "wallet_address" DROP NOT NULL;--> statement-breakpoint
ALTER TABLE "Tasks" ALTER COLUMN "description" DROP NOT NULL;