const mongoose = require('mongoose');

module.exports = connectToDb = async () => {
    try {
        await mongoose.connect(process.env.DB_URI);
    } catch (err) {
        console.error(`MongoDB connection failed: ${err.message}`);
        process.exit(1);
    }
};

