import "dotenv/config";
import jwt from "jsonwebtoken";

const generateAccessToken = (payload: object): string => {
    return jwt.sign(
        payload,
        process.env.JWT_ACCESS_SECRET!,
        {
            expiresIn: process.env.JWT_ACCESS_EXPIRES_IN as jwt.SignOptions["expiresIn"]
        }
    );
};

export default generateAccessToken;