import 'dotenv/config'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'


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
    const rawToken = crypto .randomInt(0, 1000000) .toString() .padStart(6, '0');
    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex')
    return {rawToken, hashedToken}
}

export {
    generateAccessToken,
    generateRefreshToken,
    verifyREFRESHToken,
    verifyAccessToken,
    generateResetToken,
}