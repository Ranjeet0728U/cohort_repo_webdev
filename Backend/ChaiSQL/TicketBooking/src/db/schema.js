
import { boolean, timestamp, varchar, text, pgTable, uuid, integer, serial} from "drizzle-orm/pg-core";

const userTable = pgTable('users', {
    id : uuid("id").unique().primaryKey().defaultRandom(),
    
    name : varchar('name',{length : 50}).notNull(),

    email : varchar('email', {length : 322}).unique().notNull(),

    password : varchar('password').notNull(),

    emailVerified : boolean('email_verified').notNull().default(false),

    salt : text('salt'),

    verificationToken : text('verification_token'),
    refreshToken : text('refresh_token'),

    createdAt : timestamp('created_at').defaultNow().notNull(),
    updatedAt : timestamp('updated_at').defaultNow().$onUpdate(() => new Date())
})

const seat = pgTable('seats', {
    id : serial('id').primaryKey(),
    name : varchar('name', {length : 255}).notNull(),
    isbooked : integer('is_booked').default(0)
});

export {
    userTable,
    seat
} 