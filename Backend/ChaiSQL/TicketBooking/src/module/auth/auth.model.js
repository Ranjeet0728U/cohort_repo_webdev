import { boolean, timestamp, varchar, text, pgTable, uuid } from "drizzle-orm/pg-core";

export const userTable = pgTable('users', {
    id : uuid("id").unique().primaryKey().defaultRandom(),
    
    name : varchar('name',{length : 50}).notNull(),

    email : varchar('email', {length : 322}).unique().notNull(),

    password : varchar('password').notNull(),

    emailVerified : boolean('email_verified').notNull().default(false),

    salt : text('salt'),

    verificationToken : text('verification_token'),

    createdAt : timestamp('created_at').defaultNow().notNull(),
    updatedAt : timestamp('updated_at').defaultNow().$onUpdate(() => new Date())
})

export default userTable