import type{ Request, Response } from "express";
import { signinPayloadModel, signupPayloadModel } from "./models.js";
import {db} from '../../db/index.js'
import { userTable } from '../../db/schema.js'
import { eq } from 'drizzle-orm'
import { randomBytes, createHmac } from "node:crypto";
import { createUserToken, verifyUserToken } from "./utils/tokens.js";
import type { userpayload } from "./utils/tokens.js";

class AuthenticationController{
    public async handleSignUp(req : Request, res : Response){
        const validationResult = await signupPayloadModel.safeParseAsync(req.body);
        
        if(validationResult.error) return res.status(400).json({message: 'body validation failed', error : validationResult.error.issues})
        
    
        const {firstName, lastName, email, password} = validationResult.data

        const userEmailResult = await db.select().from(userTable).where(eq(userTable.email, email))

        if(userEmailResult.length > 0) return res.status(400).json({
            error : 'duplicate entry',
            massage: `user with email ${email} already exist`,
        })

        const salt = randomBytes(32).toString('hex')

        const hash = createHmac('sha256',salt).update(password).digest('hex')

        const [result] = await db.insert(userTable).values({
            firstName,
            lastName,
            email,
            password : hash,
            salt
            
        }).returning({id: userTable.id})

        return res.status(201).json({
            message : 'user has been created successfully',
            data : {id : result?.id}
        })
    }

    public async handleSignin(req: Request, res : Response) {
        const validationResult = await signinPayloadModel.safeParseAsync(req.body)

        if(validationResult.error) return res.status(404).json({
            message : `body validation failed`,
            error : validationResult.error.issues
        })

        const { email, password } = validationResult.data

        const [userSelect] = await db.select().from(userTable).where(eq(userTable.email, email))

        if(!userSelect) return res.status(404).json({
            message : `user with email ${email} does not exist`
        })

        const salt = userSelect.salt!

        const hash = createHmac('sha256', salt).update(password).digest('hex')

        if(userSelect.password !== hash) return res.status(400).json({
            message : `email or password is incorrect`
        })

        const token = createUserToken({id :userSelect.id})

        return res.json({message : `Signin success`, data : { token } })

    }

    public async handleMe (req: Request, res :Response) {
        //@ts-ignore
        const {id} = req.user! as userpayload

        const [userResult] = await db.select().from(userTable).where(eq(userTable.id, id))

        return res.json({
            firstName : userResult?.firstName,
            lastName : userResult?.lastName,
            email: userResult?.email
        })

    }
}

export default AuthenticationController;