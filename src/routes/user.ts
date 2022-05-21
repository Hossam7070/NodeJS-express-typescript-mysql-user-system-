import { Router } from "express";
import {registerUser} from "../controllers/user"
import { login ,protect} from "../controllers/auth"
const router = Router();

router.route('/login')
    .post(login);
router.route('/register')
    .post(registerUser);
router.route('/')
    .post(protect);
export default router ;