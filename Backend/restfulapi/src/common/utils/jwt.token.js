import crypto from 'crypto'
import jwt from 'jsonwebtoken'
import dotenv from 'dotenv'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const envPath = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../.env');
dotenv.config({ path: envPath });

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn : process.env.JWT_ACCESS_EXPIRES_IN
    })
}


const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn : process.env.JWT_REFRESH_EXPIRES_IN,
    })
}


const verifyREFRESHToken = (data) => {
    return jwt.verify(data, process.env.JWT_REFRESH_SECRET)
}

const verifyAccessToken = (data) => {//return payload
    return jwt.verify(data, process.env.JWT_ACCESS_SECRET)
}


const generateResetToken = () => {
    const rawToken = crypto.randomBytes(32).toString('hex');

    const HashedToken = crypto.createHash('sha256').update(rawToken).digest('hex')
    return {rawToken, HashedToken}
}

export {
    generateAccessToken,
    generateRefreshToken,
    verifyREFRESHToken,
    verifyAccessToken,
    generateResetToken,
}