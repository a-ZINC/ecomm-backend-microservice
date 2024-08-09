import { config} from 'dotenv';

if (process.env.NODE_ENV?.trim() !== 'prod') {
    const configuration = `.env.${process.env.NODE_ENV?.trim()}`;
    config({ path: configuration });
} else {
    config();
}

export default{
    PORT: process.env.PORT,
    NODE_ENV: process.env.NODE_ENV,
}

