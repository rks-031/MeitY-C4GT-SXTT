// models/Video.js
const mongoose = require('mongoose');

const videoSchema = new mongoose.Schema({
    format: String,
    duration: Number,
    size: Number,
    resolution: String,
    codec: String,
    videoPath: String,
    scormCloudId: String, // Will be populated after SCORM Cloud upload
});

module.exports = mongoose.model('Video', videoSchema);
