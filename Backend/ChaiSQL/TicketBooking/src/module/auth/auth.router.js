import { Router } from "express";
import validate from '../../common/middleware/validate.middleware.js'
import * as Controller from './auth.controller.js'
import RegisterDTO from '../dto/register.dto.js'
import loginDTO from '../dto/login.dto.js'

const router = Router();

router.post('/register', validate(RegisterDTO), Controller.register)
router.post('/login', validate(loginDTO), Controller.login)



export default router;