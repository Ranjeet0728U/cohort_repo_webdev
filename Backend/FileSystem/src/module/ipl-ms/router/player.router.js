import { Router } from "express";

import * as controller from '../controller/player.controller.js'
import {authenticate} from '../../auth/auth.middleware.js'

const router = Router()

router.get('/', controller.AllPlayer)

router.post('/', authenticate, controller.addPlayer)

router.patch('/playerTransfer', authenticate, controller.transferPlayer)


export default router