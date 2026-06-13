type UserId = string

interface user {
    id : number,
    fname : string,
    lname?: string,
    email : string,
    contact : {
        mobile : number
    },
    address : {
        street : string,
        pincode : number,
        country : string
    }
}

