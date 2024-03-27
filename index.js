const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config();

const app = express();

app.use(express.json());

mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log('Mongo'))
  .catch(err => console.error('Error', err));

const authRoutes = require('./auth-service/routes');
const evenementsRoutes = require('./evenements/routes');
const inscriptionRoutes = require('./inscription/routes');

app.use('/api/auth', authRoutes); 
app.use('/api/evenements', evenementsRoutes); 
app.use('/api/inscription', inscriptionRoutes); 

const PORT = process.env.PORT ;
app.listen(PORT, () => {
  console.log(`serveur : ${PORT}`);
});
