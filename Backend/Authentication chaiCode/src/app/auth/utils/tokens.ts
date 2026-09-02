import JWT from 'jsonwebtoken'

export interface userpayload {
    id : string
}

const JWT_SECRETE = 'myjwtsecret' // isko .env file se lena 

export function createUserToken (payload : userpayload) {s
    const token = JWT.sign(payload, JWT_SECRETE)
    return token
}


export function verifyUserToken (token : string){
    try{
        const payload  = JWT.verify(token, JWT_SECRETE) as userpayload

        return payload;
    }catch(eroor) {
        return null;
    }
}