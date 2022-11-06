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

const electionRoutes = require('./routes/election.routes');
app.use('/election', electionRoutes);

const partyRoutes = require('./routes/party.routes');
app.use('/party', partyRoutes);

const candidateRoutes = require('./routes/candidate.routes');
app.use('/candidate', candidateRoutes);

app.listen(process.env.PORT, (err)=>{
    if(err) throw err;
    console.log(`server running on port ${process.env.PORT}`);
});