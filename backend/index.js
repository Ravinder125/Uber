const http = require('http');
const app = require('./app');
const connectToDb = require('./src/db/db');

const port = process.env.PORT || 3000;

const server = http.createServer(app);

connectToDb()
    .then(() => {
        console.log('Connected to database');
        server.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });

    }).catch((error) => {
        console.log('Error connecting to database: ', error.message);
    })

