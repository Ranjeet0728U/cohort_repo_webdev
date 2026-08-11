import { Router } from "express";
import * as controller from './auth.controller.js'

const router = router();

router.post('/Register',validate(RegisterDto), controller.register(req.body))