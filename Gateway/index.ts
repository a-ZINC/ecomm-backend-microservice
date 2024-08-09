import express from 'express';
import cors from 'cors';
import proxy from 'express-http-proxy';

const app = express();

app.use(express.json());
app.use(cors());

app.use('/api/v1/customer', proxy('http://localhost:3000'));
app.use('/api/v1/shopping', proxy('http://localhost:3001'));
app.use('/api/v1/', proxy('http://localhost:3002'));

app.get('/', (req: any, res: any) => {
    res.send('Hello Gateway!');
});


app.listen(8080,() => {
    console.log(`Server is running on port 8080`);
});