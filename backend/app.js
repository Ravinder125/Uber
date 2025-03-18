const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const userRoutes = require('./src/routes/user.routes');
const captainRoutes = require('./src/routes/captain.routes')


app.use('/api/v1/users', userRoutes);
app.use('/api/v1/captains', captainRoutes)

module.exports = app;
