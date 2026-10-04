import {Router} from "express"
import { asc } from "drizzle-orm";
import { authenticate } from "../auth/auth.middle.js";
import booking from "./booking.js";
import db from "../../db/index.js";
import {seat} from '../../db/schema.js'

const router = Router();

router.get('/book' ,authenticate,(req, res) => {
    res.sendFile('booking.html', {root : 'frontend'})
})

router.post('/book',authenticate, booking)

router.get('/seats', authenticate, async(req, res, next) => {
    try{
        const seats = await db.select().from(seat).orderBy(asc(seat.id))
        return res.status(200).json(seats)
    }catch(err){
        return next(err)
    }
})


export default router