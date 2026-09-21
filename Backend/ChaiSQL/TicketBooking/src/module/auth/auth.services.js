import db from '../../db/index.js'
import {userTable} from '../../db/schema.js';
import ApiError from '../../common/utils/apiError.js';
import bcrypt from "bcryptjs";
import crypto from 'crypto'
import { eq } from "drizzle-orm";

import {
    generateAccessToken,
    generateRefressToken,
    verifyAccessToken,
    verifyRefressToken,
    generateResetToken
}from '../../common/utils/jwt.token.js'

const hashToken = (token) => crypto.createHash("sha256").update(token).digest("hex");

const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(12)
    const hash = await bcrypt.hash(password, salt)

    return hash
}

const register = async ({ name, email, password}) => {
    const existing = await db.select().from(userTable).where(eq(userTable.email, email));

    if(existing.length > 0) throw ApiError.conflict("Email already exist")

    const hashedPassword = await hashPassword(password);

    const { rawToken, hashedToken } = generateResetToken();

    console.log("Raw token is " ,rawToken)

    const [user] = await db.insert(userTable).values({
        name,
        email,
        password : hashedPassword,
        emailVerified : false,
        verificationToken : hashedToken
    }).returning()

    //TODO : send email to user with token: rawtoken

    const {
        password : _password,
        verificationToken : _verificationToken,
        ...userObj
    } = user

    return userObj;
}

const login = async({email, password}) => {
    const existing = await db.select().from(userTable).where(eq(userTable.email, email));

    if(existing.length == 0) throw ApiError.unauthorized("Email not registerd ")

    const user = existing[0];
    const hashedStoredPassword = user.password;
    const result = await bcrypt.compare( password, hashedStoredPassword)

    if(!result){
        throw ApiError.unauthorized('Invalid email or password')
    }
    
    const accessToken = generateAccessToken({
        id : user.id,
        name : user.name,
    })

    const refreshToken = generateRefressToken({ id : user.id})

    await db.update(userTable).set({refreshToken : hashToken(refreshToken)}).where(eq(userTable.id, user.id))

    const {
        password : _password,
        verificationToken : _verificationToken,
        refreshToken : _refreshToken,
        ...userObj
    } = user

    return {refreshToken, accessToken, userObj};
}

export{
    register,
    login
}