import passport from 'passport';
import { Strategy as LocalStrategy } from 'passport-local';
import { Strategy as JwtStrategy, ExtractJwt } from 'passport-jwt';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import usersRepo from '../repositories/users.repository.js';
import { UserDTO } from '../dtos/user.dto.js';

dotenv.config();

function initializePassport() {
  
  passport.use(
    'register',
    new LocalStrategy(
      { usernameField: 'email', passReqToCallback: true },
      async (req, email, password, done) => {
        try {
          const exists = await usersRepo.getRawByEmail(email);
          if (exists) return done(null, false, { message: 'Email ya registrado' });

          const hash = await bcrypt.hash(password, 10);
          const userRole = req.body.role === 'admin' ? 'admin' : 'user';

          const newUser = await usersRepo.create({
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            email,
            age: req.body.age,
            password: hash,
            role: userRole
          });

          return done(null, newUser);
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  
  passport.use(
    'login',
    new LocalStrategy(
      { usernameField: 'email' },
      async (email, password, done) => {
        try {
          const user = await usersRepo.getRawByEmail(email);
          if (!user) return done(null, false, { message: 'Credenciales inválidas' });

          const valid = await bcrypt.compare(password, user.password);
          if (!valid) return done(null, false, { message: 'Credenciales inválidas' });

          return done(null, user); 
        } catch (err) {
          return done(err);
        }
      }
    )
  );

  
  passport.use(
    'current',
    new JwtStrategy(
      {
        jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        secretOrKey: process.env.JWT_SECRET
      },
      async (jwtPayload, done) => {
        try {
          const user = await usersRepo.getRawById(jwtPayload.id);
          if (!user) return done(null, false, { message: 'Usuario no encontrado' });

          return done(null, user);
        } catch (err) {
          return done(err, false);
        }
      }
    )
  );
}

export default initializePassport;