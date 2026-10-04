import { Router } from "express";
import validate from '../../common/middleware/validate.middleware.js'
import * as Controller from './auth.controller.js'
import RegisterDTO from '../../module/dto/register.dto.js'
import loginDTO from '../../module/dto/login.dto.js'

const router = Router();

router.get("/login", (req, res) => {
    res.sendFile("login.html", { root: "frontend" });
});

router.get("/register", (req, res) => {
    res.sendFile("register.html", { root: "frontend" });
});

router.post('/register', validate(RegisterDTO), Controller.register)
router.post('/login', validate(loginDTO), Controller.login)



export default router;