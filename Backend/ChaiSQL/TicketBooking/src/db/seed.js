import db from './index.js';
import { seat } from "./schema.js";

const seatData = [];

for (const row of ["A", "B", "C", "D"]) {
    for (let i = 1; i <= 8; i++) {
        seatData.push({
            seatNumber: `${row}${i}`
        });
    }
}

await db.insert(seat).values(seatData);

console.log("32 seats inserted successfully");

process.exit(0);