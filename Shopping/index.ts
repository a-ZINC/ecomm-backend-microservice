import express from 'express';

const app = express();

app.get('/', (req: any, res: any) => {
    res.send('Hello Shopping Service');
});


app.listen(3001, () => {
    console.log(`Server is running on port 3001`);
});