type UserId = string;

interface User {
    id: UserId;
    fname: string;
    lname?: string;
    email: string;
    contact: {
        mobile: number;
    };
    address: {
        street: string;
        pincode: number;
        country: string;
    };
}

class InMemoryDB {
    private _db = new Map<UserId, User>();

    public insert(data: User): UserId {
        if (this._db.has(data.id)) {
            throw new Error("Already exists");
        }

        this._db.set(data.id, data);
        return data.id;
    }
    
    public fullName(id: UserId): string{
        const userName = this._db.get(id);
        if(!userName){
            throw new Error("Not found");
        }
        return `${userName.fname} ${userName.lname?? " "} `;
    }
}

const memory1 = new InMemoryDB();

memory1.insert({
    id : "2400602",
    fname : "Ranjeet",
    lname : "Upadhyay",
    email : "upadhyayr0728@gmail.com",
    contact : {mobile : 9507363124},
    address : {
        street : "Badki Patti",
        pincode : 802119,
        country : "India"
    }
})

console.log(memory1.fullName("2400602"));