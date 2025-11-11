import express from 'express';
import handlebars from 'express-handlebars';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import passport from 'passport';

import initializePassport from './config/passportConfig.js';
import productRouter from './routes/productRouter.js';
import cartRouter from './routes/cartRouter.js';
import sessionRouter from './routes/sessionRouter.js';
import viewsRouter from './routes/viewsRouter.js';
import __dirname from './utils/constantsUtil.js';

dotenv.config();
const app = express();
const PORT = process.env.PORT || 8080;

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('🟢 Conectado a MongoDB'))
  .catch(err => console.error('🔴 Error de conexión:', err));

initializePassport();
app.use(passport.initialize());

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/../views');
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use('/api/products', productRouter);
app.use('/api/carts', cartRouter);
app.use('/api/sessions', sessionRouter);
app.use('/', viewsRouter);

app.use((req, res) => {
  res.status(404).render('notFound', {
    title: '404',
    style: 'index.css'
  });
});

app.listen(PORT, () => {
  console.log(`🚀 Servidor activo en puerto ${PORT}`);
});
