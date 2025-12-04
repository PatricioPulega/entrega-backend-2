import passport from 'passport';
import { Strategy as JWTStrategy, ExtractJwt } from 'passport-jwt';
import { Strategy as LocalStrategy } from 'passport-local';
import User from '../dao/models/user.model.js'
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

const JWT_SECRET = process.env.JWT_SECRET;


passport.use('register', new LocalStrategy(
  {
    usernameField: 'email',
    passReqToCallback: true
  },
  async (req, email, password, done) => {
    try {
      const { first_name, last_name, age } = req.body;
      const existe = await User.findOne({ email });
      if (existe) return done(null, false, { message: 'Email ya registrado' });

      const passwordEncriptada = bcrypt.hashSync(password, bcrypt.genSaltSync(10));
      const nuevoUsuario = await User.create({
        first_name,
        last_name,
        email,
        age,
        password: passwordEncriptada
      });

      return done(null, nuevoUsuario);
    } catch (error) {
      return done(error);
    }
  }
));


passport.use('login', new LocalStrategy(
  { usernameField: 'email' },
  async (email, password, done) => {
    try {
      const user = await User.findOne({ email });
      if (!user || !bcrypt.compareSync(password, user.password)) {
        return done(null, false, { message: 'Credenciales inválidas' });
      }
      return done(null, user);
    } catch (error) {
      return done(error);
    }
  }
));


passport.use('jwt', new JWTStrategy(
  {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: JWT_SECRET
  },
  async (jwt_payload, done) => {
    try {
      const user = await User.findById(jwt_payload.id).populate('cart');
      return done(null, user);
    } catch (error) {
      return done(error, false);
    }
  }
));

export default function initializePassport() {
  // Las estrategias ya se registran al importar este módulo
}
