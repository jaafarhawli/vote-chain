const express = require('express');
const app = express();
app.use(express.json());
require('dotenv').config();
require('./config/db.config');
const http = require("http").Server(app);
app.use(express.urlencoded({ extended: true }));
const cors = require("cors");
app.use(cors({
    origin:'http://localhost:3000',
    methods:['GET', 'POST', 'PUT', 'DELETE']
}));

var path = require('path');
app.use("/public", express.static(path.join(__dirname, 'public')));

const socketIO = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
    }
});

const users = {};

socketIO.on('connection', (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`);

   socket.on('login', (email) => {
    users[email] = socket.id;
    console.log(users);
    });
   
    socket.on('logout', (email) => {
    delete users[email];
    console.log(users);
    });

    socket.on('notification', (user_email, election_title, receiver_email) => {
        const message = `${user_email} wants to add you as a moderator to his election "${election_title}"`;
        const socketid = users[receiver_email];
        socket.to(socketid).emit('notification', message);
    })

    socket.on('disconnect', () => {
      console.log('🔥: A user disconnected');
    });
});

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

const moderatorRoutes = require('./routes/moderator.routes');
app.use('/moderator', moderatorRoutes);

const statisticsRoutes = require('./routes/statistics.routes');
app.use('/statistics', statisticsRoutes);

const emailRoutes = require('./routes/email.routes');
app.use('/email', emailRoutes);

http.listen(process.env.PORT, (err)=>{
    if(err) throw err;
    console.log(`server running on port ${process.env.PORT}`);
});