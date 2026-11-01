import { Router } from "express";

import validation from '../../../common/middleware/validate.middleware.js'
import ownerDto from  '../dto/owner/owner.dto.js'
import * as Ownercontroller from '../controller/owner.controller.js'
import {authenticate} from '../../auth/auth.middleware.js'

const router = Router();

//create owner
router.post('/',authenticate, validation(ownerDto), Ownercontroller.createOwner)

//get all owner
router.get('/', authenticate, Ownercontroller.getAllOwner)

//getownerby id
router.get('/getOwner/:id', authenticate, Ownercontroller.getbyId);

//update owner
router.put('/:id', authenticate, Ownercontroller.updateOwner)

//delete owner
router.delete('/deleteOwner/:id',authenticate, Ownercontroller.deleteOwner)


export default router