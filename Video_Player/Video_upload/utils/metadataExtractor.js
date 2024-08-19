// utils/metadataExtractor.js
const ffmpeg = require('fluent-ffmpeg');

const extractMetadata = (videoPath) => {
    return new Promise((resolve, reject) => {
        ffmpeg.ffprobe(videoPath, (err, metadata) => {
            if (err) {
                return reject(err);
            }

            const videoMetadata = {
                format: metadata.format.format_name,
                duration: metadata.format.duration,
                size: metadata.format.size,
                resolution: `${metadata.streams[0].width}x${metadata.streams[0].height}`,
                codec: metadata.streams[0].codec_name,
            };

            resolve(videoMetadata);
        });
    });
};

module.exports = { extractMetadata };
