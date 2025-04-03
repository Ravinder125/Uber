const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const app = express();

const whitelist = ['http://localhost:5173', 'http://localhost:4000', 'http://localhost:5000'];
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'));
        }
    }
}
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const authRoutes = require('./src/routes/auth.routes');
const userRoutes = require('./src/routes/user.routes');
const captainRoutes = require('./src/routes/captain.routes');

app.use('/api/v1/auths', authRoutes);
app.use('/api/v1/users', userRoutes);
app.use('/api/v1/captains', captainRoutes);

module.exports = app;
