import express from 'express';

const app = express();

app.get('/', (req: any, res: any) => {
    res.send('Hello Products!');
});


app.listen(3002, () => {
    console.log(`Server is running on port 3002`);
});