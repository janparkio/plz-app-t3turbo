import { relations, sql } from "drizzle-orm";
import { pgTable, primaryKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const Post = pgTable("post", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  title: t.varchar({ length: 256 }).notNull(),
  content: t.text().notNull(),
  createdAt: t.timestamp().defaultNow().notNull(),
  updatedAt: t
    .timestamp({ mode: "date", withTimezone: true })
    .$onUpdateFn(() => sql`now()`),
}));

export const CreatePostSchema = createInsertSchema(Post, {
  title: z.string().max(256),
  content: z.string().max(256),
}).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const User = pgTable("user", (t) => ({
  id: t.uuid().notNull().primaryKey(),  // Supabase manages the UUID
  email: t.varchar({ length: 255 }).notNull().unique(),
  emailVerified: t.timestamp({ mode: "date", withTimezone: true }),
  name: t.varchar({ length: 255 }),
  image: t.varchar({ length: 255 }),
  createdAt: t.timestamp({ mode: "date", withTimezone: true }).defaultNow().notNull(),
  updatedAt: t.timestamp({ mode: "date", withTimezone: true }).$onUpdateFn(() => sql`now()`),
}));

export const UserRelations = relations(User, ({ many }) => ({
  sessions: many(Session),
}));

export const Session = pgTable("session", (t) => ({
  id: t.uuid().notNull().primaryKey().defaultRandom(),
  userId: t.uuid().notNull().references(() => User.id, { onDelete: "cascade" }),
  expiresAt: t.timestamp({ mode: "date", withTimezone: true }).notNull(),
  createdAt: t.timestamp({ mode: "date", withTimezone: true }).defaultNow().notNull(),
}));

export const SessionRelations = relations(Session, ({ one }) => ({
  user: one(User, { fields: [Session.userId], references: [User.id] }),
}));