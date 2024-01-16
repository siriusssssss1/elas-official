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
// ttl index on timestamp
latestSearchSchema.index({ timestamp: 1 }, { expireAfterSeconds: 0 });

const LatestSearch = mongoose.model('LatestSearch', latestSearchSchema);

module.exports = LatestSearch;

