// utils/scormUploader.js
const axios = require('axios');
require('dotenv').config();

const uploadToSCORMCloud = async (videoPath, metadata) => {
    try {
        const scormCloudAPI = 'https://cloud.scorm.com/api/v2/content/upload';
        const formData = new FormData();
        formData.append('file', fs.createReadStream(videoPath));
        formData.append('metadata', JSON.stringify(metadata));

        const response = await axios.post(scormCloudAPI, formData, {
            headers: {
                'Authorization': `Bearer ${process.env.SCORM_CLOUD_API_KEY}`,
                ...formData.getHeaders()
            }
        });

        // Handle response and store the SCORM Cloud ID
        const { contentId } = response.data;
        console.log('Video uploaded to SCORM Cloud with ID:', contentId);

        return contentId;
    } catch (error) {
        console.error('Error uploading video to SCORM Cloud:', error);
        throw new Error('SCORM Cloud upload failed.');
    }
};

module.exports = { uploadToSCORMCloud };
