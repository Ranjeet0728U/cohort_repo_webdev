import {
    boolean,
    timestamp,
    varchar,
    text,
    pgTable,
    uuid,
    serial,
    pgEnum
} from "drizzle-orm/pg-core";

export const roleEnum = pgEnum("role", [
    "customer",
    "admin",
    "seller"
]);

const userTable = pgTable("users", {
    id: uuid("id")
        .primaryKey()
        .defaultRandom(),

    name: varchar("name", {
        length: 50
    }).notNull(),

    email: varchar("email", {
        length: 322
    })
        .unique()
        .notNull(),

    password: varchar("password", {
        length: 255
    }).notNull(),

    emailVerified: boolean("email_verified")
        .notNull()
        .default(false),

    role: roleEnum("role")
        .notNull()
        .default("customer"),

    verificationToken: text("verification_token"),

    refreshToken: text("refresh_token"),

    createdAt: timestamp("created_at")
        .notNull()
        .defaultNow(),

    updatedAt: timestamp("updated_at")
        .notNull()
        .defaultNow()
});

const seat = pgTable("seats", {
    id: serial("id").primaryKey(),

    customerId: uuid("customer_id")
        .references(() => userTable.id, {
            onDelete: "set null"
        }),

    name: varchar("name", {
        length: 255
    })
        .notNull()
        .default(""),

    seatNumber: text("seat_number")
        .unique()
        .notNull(),

    isBooked: boolean("is_booked")
        .notNull()
        .default(false)
});

export {
    userTable,
    seat
};