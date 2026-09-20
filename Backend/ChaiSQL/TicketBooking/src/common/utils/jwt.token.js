import 'dotenv/config'
import crypto from 'crypto'
import jwt from 'jsonwebtoken'

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn : process.env.JWT_ACCESS_EXPIRES_IN
    })
}

const generateRefressToken = (payload) => {
    return jwt.sign(
        payload,
        process.env.JWT_REFRESH_SECRET, {
            expiresIn : process.env.JWT_REFRESH_EXPIRES_IN
        }
    )
}

const verifyAccessToken = (data) => {
    return jwt.verify(data, process.env.JWT_ACCESS_SECRET)
}


const verifyRefressToken = (data) => {
    return jwt.verify(data, process.env.JWT_REFRESH_SECRET)
}

const generateResetToken = () => {
    const rawToken = crypto.randomBytes(32).toString('hex')

    const hashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');

    return { rawToken, hashedToken }
}

export {
    generateAccessToken,
    generateRefressToken,
    verifyAccessToken,
    verifyRefressToken,
    generateResetToken
}