import { Router } from "express";

import * as controller from '../controller/team.controller.js'
import {authenticate} from '../../auth/auth.middleware.js'

const router = Router()

router.get('/',authenticate, controller.getAllTeams)
router.post('/', authenticate, controller.addTeam)

router.patch('/changeOwner', authenticate, controller.changeTeamOwner)

export default router