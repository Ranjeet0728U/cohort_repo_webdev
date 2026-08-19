import crypto from 'crypto';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import path from 'node:path';

dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const generateAccessToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_ACCESS_SECRET, {
        expiresIn: process.env.JWT_ACCESS_EXPIRES_IN,
    });
};

const verifyAccessToken = (data) => {
    return jwt.verify(data, process.env.JWT_ACCESS_SECRET);
}

const generateRefreshToken = (payload) => {
    return jwt.sign(payload, process.env.JWT_REFRESH_SECRET, {
        expiresIn: process.env.JWT_REFRESH_EXPIRES_IN,
    });
};

const verifyREFRESHToken = (data) => {
    return jwt.verify(data, process.env.JWT_REFRESH_SECRET);
}

const generateResetToken = () =>{
    const rawToken = crypto.randomBytes(32).toString("hex");

    const HashedToken = crypto.createHash('sha256').update(rawToken).digest('hex');
    console.log(rawToken);
    console.log(HashedToken);

    return {rawToken, HashedToken};
}

export {
    generateAccessToken,
    generateRefreshToken,
    generateResetToken,
    verifyAccessToken,
    verifyREFRESHToken
}
