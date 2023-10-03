const express = require("express");
const userRouter = require('./router/userRouter')
const authRouter = require("./router/authRouter")
const bodyParser = require('body-parser');

const app = express();
const port = 3500;

app.use(bodyParser.json());

app.use('/api', userRouter);
app.use('/api', authRouter);

app.listen(port, () => {
    console.log("Server Online!!!")
})