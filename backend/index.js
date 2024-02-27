const express = require('express');
const dotenv = require('dotenv').config(); 
const app = express();
const bodyParser = require('body-parser');
const adminRouter = require('./Routes/admin');
const userRouter = require('./Routes/user');
const cors = require('cors');

app.use(cors())
app.use(bodyParser.json())
app.use('/admin', adminRouter)
app.use('/user', userRouter)

const PORT = process.env.PORT || 5000;
app.listen(PORT , ()=>{
    console.log(`Server is running on port ${PORT}`);
})