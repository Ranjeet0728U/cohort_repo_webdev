import { Router} from "express";
import { RegisterDto } from "./dto/register.dto.js";
import validate from "../../common/middleware/validate.middleware.js";
import * as controller from './auth.controller.js'
import loginDto from "./dto/login.dto.js";
import verifyEmailDto  from "./dto/verifyEmail.js";
import { authenticate } from "./auth.middleware.js";

const router = Router()

router.post('/register',validate(RegisterDto), controller.register)
router.post('/verifyEmail', validate(verifyEmailDto), controller.verifyEmail)

router.post('/login', validate(loginDto),controller.login)
router.post('/logout',authenticate, controller.logOut)

router.get('/me', authenticate, controller.getMe);

export default router;
