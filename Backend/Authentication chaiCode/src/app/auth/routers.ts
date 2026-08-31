import express from 'express'

import type{ Router } from 'express'
import AuthenticationController from './controller.js';


const authenticationController = new AuthenticationController();
export const authRouter : Router = express.Router()

authRouter.post('/signUp',authenticationController.handleSignUp.bind(authenticationController));
authRouter.post('/signin',authenticationController.handleSignin.bind(authenticationController));
