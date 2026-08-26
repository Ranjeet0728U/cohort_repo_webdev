import { Router } from "express";
import { RegisterDto } from "./dto/register.dto.js";
import validate from "../../common/middleware/validate.middleware.js";
import * as controller from './auth.controller.js'
import loginDto from "./dto/login.dto.js";
import { authenticate, authorize } from "./auth.middleware.js";

const router = Router()
router.use(router.json())

router.post('/register',validate(RegisterDto), controller.register)

router.post('/login', validate(loginDto),controller.login)
router.post('/logout',authenticate, controller.logOut)

router.get('/me', authenticate, controller.getMe);
router.get('/verify-email/:token', controller.getMe);

export default router;
