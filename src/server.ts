import 'dotenv/config';
import cors from 'cors';
import express from 'express';
import router from './routes/routes';

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(process.env.PORT, () => {
    console.log(`Rodando no endereço: http://localhost:${process.env.PORT}`);
});