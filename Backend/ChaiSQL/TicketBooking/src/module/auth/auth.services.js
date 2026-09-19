import crypto from 'crypto';
import db from '../../common/config/db.js'
import userTable from './auth.model.js';
import ApiError from '../../common/utils/apiError.js';
import bcrypt from "bcryptjs";

import {
    generateAccessToken,
    generateRefressToken,
    verifyAccessToken,
    verifyRefressToken,
    generateResetToken
}from '../../common/utils/jwt.token.js'

const hashToken = (token) =>  crypto.createHash('sha256').update(token).digest('hex')
const hashPassword = async(password) => await bcrypt.hash(password, 12);

const register = async ({ name, email, password, role}) => {
    const existing = await db.select().from(userTable).where(eq(userTable.email, email));

    if(existing.length > 0) throw ApiError.conflict("Email already exist")

    const hashedPassword = await hashPassword(password);

    const { rawToken, hashedToken } = generateResetToken();

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








export{
    register,
    
}