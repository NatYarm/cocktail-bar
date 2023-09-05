import express from 'express';
import dotenv from 'dotenv';
import router from './routes/drinksRoutes.js';

const app = express();
const dotenv = dotenv.config();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use('/', router);
app.use('/drink/:idDrink', router);
app.use('/ingredient/:ingrName', router);
app.use('/findCocktail', router);
app.use('/browse/:letter', router);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
