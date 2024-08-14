import { Router } from 'express';
import { auth, oauthCallback } from '../controller/auth.controller';

const router = Router();

router.get("/", auth);
router.get("/oauth", oauthCallback);

export default router;