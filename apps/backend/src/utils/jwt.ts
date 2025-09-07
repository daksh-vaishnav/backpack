import jwt, { JwtPayload } from 'jsonwebtoken'
import 'dotenv/config'

const JWT_SECRETE = process.env.JWT_SECRETE!;
const JWT_AUTH_SECRETE = process.env.JWT_AUTH_SECRETE!;


export const generateJWT = (email: string): string => {
    return jwt.sign({ email }, JWT_SECRETE, { expiresIn: '5m' })
}

export const verifyJWT = (token: string): JwtPayload | null => {
    try {
        return jwt.verify(token, JWT_SECRETE) as JwtPayload;
    } catch (error) {
        console.log(error);
        return null
    }
}

export const generateAuthJWT = (email: string): string => {
    return jwt.sign({ email }, JWT_AUTH_SECRETE, { expiresIn: '1d' })
}


export const verifyAuthJWT = (token: string): JwtPayload | null => {
    try {
        return jwt.verify(token, JWT_AUTH_SECRETE) as JwtPayload
    } catch (error) {
        return null
    }
}