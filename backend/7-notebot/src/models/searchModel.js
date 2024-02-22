const mongoose = require('mongoose');

const latestSearchSchema = new mongoose.Schema({
    user_id: {
        type: String,
        required: true,
    },
    search_query: {
        type: String,
        required: true,
    },
    timestamp: {
        type: Date,
        default: Date.now,
        expires: 60 * 60 * 24 * 7
    },
});
latestSearchSchema.index({ timestamp: 1 }, { expireAfterSeconds: 0 });

const Search = mongoose.model('Search', latestSearchSchema);

module.exports = Search;

