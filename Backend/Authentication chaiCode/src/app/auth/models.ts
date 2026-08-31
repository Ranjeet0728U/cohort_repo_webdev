import {z} from 'zod'

export const signupPayloadModel = z.object({
    firstName : z.string().min(2).max(5),
    lastName : z.string().nullable().optional(),
    email : z.email(),
    password : z.string().min(6).max(255)
})

export const signinPayloadModel = z.object({
    email : z.email(),
    password : z.string().min(6).max(255)
})