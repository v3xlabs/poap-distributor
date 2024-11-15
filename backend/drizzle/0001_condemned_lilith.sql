PRAGMA foreign_keys=OFF;--> statement-breakpoint
CREATE TABLE `__new_links` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`url` text NOT NULL,
	`used` integer DEFAULT false NOT NULL,
	`claimed` integer DEFAULT false NOT NULL
);
--> statement-breakpoint
INSERT INTO `__new_links`("id", "url", "used", "claimed") SELECT "id", "url", "used", "claimed" FROM `links`;--> statement-breakpoint
DROP TABLE `links`;--> statement-breakpoint
ALTER TABLE `__new_links` RENAME TO `links`;--> statement-breakpoint
PRAGMA foreign_keys=ON;