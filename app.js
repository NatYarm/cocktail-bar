import express from 'express';
import {} from 'dotenv/config';
import routes from './routes/drinksRoutes.js';

const app = express();

const PORT = process.env.PORT || 5000;

app.use(express.static('public'));
app.use(express.urlencoded({ extended: true }));

app.use(routes);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
