import 'dotenv/config';
import express from 'express';
import apiRoute from './routes/index';

const PORT = process.env.PORT!;

const app = express();

app.use(express.json())
app.use(express.urlencoded({ extended: true }))

app.use("/api", apiRoute);



app.listen(PORT, () => {
    console.log(`server up and running on ${PORT}`);
})
