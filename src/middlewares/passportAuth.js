import passport from 'passport';

// Middleware de autenticación con Passport y estrategia JWT
export const requireAuth = passport.authenticate('jwt', { session: false });