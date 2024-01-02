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
    },
});
// TODO: ttl index on timestamp

const LatestSearch = mongoose.model('LatestSearch', latestSearchSchema);

module.exports = LatestSearch;

