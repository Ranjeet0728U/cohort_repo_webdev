"use strict";
class InMemoryDB {
    _db = new Map();
    insert(data) {
        if (this._db.has(data.id)) {
            throw new Error("Already exists");
        }
        this._db.set(data.id, data);
        return data.id;
    }
    fullName(id) {
        const userName = this._db.get(id);
        if (!userName) {
            throw new Error("Not found");
        }
        return `${userName.fname} ${userName.lname ?? " "} `;
    }
}
const memory1 = new InMemoryDB();
memory1.insert({
    id: "2400602",
    fname: "Ranjeet",
    lname: "Upadhyay",
    email: "upadhyayr0728@gmail.com",
    contact: { mobile: 9507363124 },
    address: {
        street: "Badki Patti",
        pincode: 802119,
        country: "India"
    }
});
console.log(memory1.fullName("2400602"));
