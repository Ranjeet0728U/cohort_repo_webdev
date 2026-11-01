import { Router } from "express";

import validation from '../../../common/middleware/validate.middleware.js'
import ownerDto from  '../dto/owner/owner.dto.js'
import * as Ownercontroller from '../controller/owner.controlle.js'
import {authenticate} from '../../auth/auth.middleware.js'

const router = Router();

//create owner
router.post('/',authenticate, validation(ownerDto), Ownercontroller.createOwner)

//get all owner
// router.get('/')

// //getownerby id
// router.get('getOwner/:id');

// //update owner
// router.put('/:id')

// //delete owner
// router.delete('/:id')


export default router