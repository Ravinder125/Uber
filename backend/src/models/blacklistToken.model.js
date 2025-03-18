const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const blacklistTokenSchema = new Schema({
    token: {
        type: String,
        required: [true, 'Token is required'],
        unique: [true, 'Token is already blacklisted'],
    },
    createdAt: {
        type: Date,
        required: [true, 'Created at is required'],
        default: Date.now,
        expires: 86400, // 24 hours in seconds
    }
});
module.exports = mongoose.model('BlacklistToken', blacklistTokenSchema);
