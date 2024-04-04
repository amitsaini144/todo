import express from 'express';
import bodyParser from 'body-parser';
import cors from "cors";
import userRouter  from './routes/user';
import todoRouter  from './routes/todo';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(bodyParser.json());

app.use('/api/v1/user', userRouter);
app.use('/api/v1/todo', todoRouter);

app.listen(PORT, () => {
    console.log("Listning at port 3000");
})
