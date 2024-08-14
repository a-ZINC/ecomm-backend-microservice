import express from 'express';
import env from './config';
import route from './route';

const app = express();

app.use("/", route);

app.listen(env.PORT, () => {
    console.log(`${env.NODE_ENV}Server is running on port ${env.PORT}`);
});