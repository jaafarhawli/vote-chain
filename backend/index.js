const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
require('./config/db.config');
const cors = require("cors");
app.use(cors());

const authRoutes = require('./routes/auth.routes');
app.use('/auth', authRoutes);

const userRoutes = require('./routes/user.routes');
app.use('/user', userRoutes);

const voterRoutes = require('./routes/voter.routes');
app.use('/voter', voterRoutes);

app.listen(process.env.PORT, (err)=>{
    if(err) throw err;
    console.log(`server running on port ${process.env.PORT}`);
});