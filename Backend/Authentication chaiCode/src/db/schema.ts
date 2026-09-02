import { boolean, timestamp, varchar, text, pgTable, uuid } from "drizzle-orm/pg-core";

export const userTable = pgTable("user",{
    id: uuid("id").primaryKey().defaultRandom(),
    firstName : varchar('first_name',{length : 45 }).notNull(),
    lastName : varchar("last_name",{length : 45}),
    email : varchar('email', {length : 322}).unique().notNull(),
    password: text("password").notNull(),
    emailVerified : boolean("email_verified").notNull().default(false),
    salt: text('salt'),
    createdAt : timestamp('created_at').defaultNow().notNull(),
    updatedAt : timestamp('updated_at').$onUpdate(() => new Date())
})

