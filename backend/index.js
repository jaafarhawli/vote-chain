const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
require('./config/db.config');

app.listen(process.env.PORT, (err)=>{
    if(err) throw err;
    console.log(`server running on port ${process.env.PORT}`);
});