import { boolean, timestamp, varchar, text, pgTable, uuid } from "drizzle-orm/pg-core";

const userTable = pgTable("user",{
    id: uuid("id").primaryKey().defaultRandom(),
    firstName : varchar('fist_name',{length : 45 }).notNull(),
    lastName : varchar("last_name",{length : 45}),
    email : varchar('email', {length : 322}).notNull(),
    emailVerified : boolean("email_verified").unique().notNull().default(false),
    salt: text('salt'),
    createdAt : timestamp('created_at').defaultNow().notNull(),
    updatedAt : timestamp('updated_at').$onUpdate(() => new Date())
})

export default userTable