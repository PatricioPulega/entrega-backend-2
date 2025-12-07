import { Router } from 'express';
import passport from 'passport';
import {
  current,
  login,
  register,
  resetRequest,
  resetConfirm
} from '../controllers/sessions.controller.js';

const router = Router();

router.post(
  '/register',
  passport.authenticate('register', { session: false }),
  register
);


router.post(
  '/login',
  passport.authenticate('login', { session: false }),
  login
);


router.get(
  '/current',
  passport.authenticate('current', { session: false }),
  current
);


router.post('/password-reset', resetRequest);


router.post('/password-reset/confirm', resetConfirm);

export default router;