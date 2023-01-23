import { Router } from "express"
import verifyJWT from "../controllers/authController.js";
import { getUserName, login, register } from "../controllers/userController.js";

const router = Router();

router.post('/login', login);

router.post('/register', register);

router.get('/getUserName', verifyJWT, getUserName);

export default router;