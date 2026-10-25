import { Router} from "express";
import { RegisterDto } from "./dto/register.dto.js";
import validate from "../../common/middleware/validate.middleware.js";
import * as controller from './auth.controller.js'
import loginDto from "./dto/login.dto.js";
import { authenticate } from "./auth.middleware.js";
import { upload } from "../../common/middleware/multer.middleware.js";

const router = Router()

router.post('/register',validate(RegisterDto), controller.register)

router.post('/verifyEmail/:token', controller.verifyEmail)
router.post('/resend-verification', controller.resendVerificationEmail);

router.post('/login', validate(loginDto),controller.login)
router.post('/logout',authenticate, controller.logOut)

router.post('/avtar', authenticate, upload.single('avtar'), controller.uploadAvtar)

router.get('/me',authenticate, controller.getMe);

router.delete("/me", authenticate, controller.deleteUser);

export default router;
