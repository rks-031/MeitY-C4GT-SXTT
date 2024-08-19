// // // server.js
// // const express = require('express');
// // const multer = require('multer');
// // const mongoose = require('mongoose');
// // const { extractMetadata } = require('./utils/metadataExtractor');
// // const { uploadToSCORMCloud } = require('./utils/scormUploader');
// // const Video = require('./models/Video');

// // const app = express();
// // app.use(express.json());

// // // Connect to MongoDB
// // mongoose.connect('mongodb+srv://vinayakrajqaz:ilMrRGlfBThyTBeF@cluster0.kiqayjc.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { useNewUrlParser: true, useUnifiedTopology: true });

// // // Configure Multer for file uploads
// // const storage = multer.diskStorage({
// //     destination: (req, file, cb) => cb(null, 'uploads/'),
// //     filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
// // });
// // const upload = multer({ storage });

// // // // Video Upload Endpoint
// // // app.post('/upload', upload.single('video'), async (req, res) => {
// // //     try {
// // //         const videoPath = req.file.path;

// // //         // Step 1: Extract metadata
// // //         const metadata = await extractMetadata(videoPath);

// // //         // Step 2: Store metadata in MongoDB
// // //         const video = new Video({ ...metadata, videoPath });
// // //         await video.save();

// // //         // Step 3: Upload video and metadata to SCORM Cloud
// // //         await uploadToSCORMCloud(videoPath, metadata);

// // //         res.status(200).json({ message: 'Video uploaded and metadata extracted successfully!', video });
// // //     } catch (error) {
// // //         res.status(500).json({ message: 'Error processing video upload.', error: error.message });
// // //     }
// // // });
// // app.post('/upload', upload.single('video'), async (req, res) => {
// //     try {
// //         const videoPath = req.file.path;

// //         // Step 1: Extract metadata
// //         const metadata = await extractMetadata(videoPath);

// //         // Step 2: Upload video and metadata to SCORM Cloud
// //         const scormCloudId = await uploadToSCORMCloud(videoPath, metadata);

// //         // Step 3: Store metadata in MongoDB, including SCORM Cloud ID
// //         const video = new Video({ ...metadata, videoPath, scormCloudId });
// //         await video.save();

// //         res.status(200).json({ message: 'Video uploaded, metadata extracted, and stored successfully!', video });
// //     } catch (error) {
// //         res.status(500).json({ message: 'Error processing video upload.', error: error.message });
// //     }
// // });


// // app.listen(3000, () => console.log('Server running on http://localhost:3000'));
// const express = require('express');
// const multer = require('multer');

// const app = express();

// // Configure Multer for file uploads
// const storage = multer.diskStorage({
//     destination: (req, file, cb) => cb(null, 'uploads/'),
//     filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
// });
// const upload = multer({ storage });

// app.post('/upload', upload.single('video'), (req, res) => {
//     try {
//         // Access the file and process
//         console.log(req.file); // Information about the uploaded file
//         res.send('File uploaded successfully');
//     } catch (error) {
//         res.status(500).send('Error uploading file');
//     }
// });

// app.listen(3000, () => console.log('Server running on http://localhost:3000'));
// server.js
const express = require('express');
const multer = require('multer');
const fs = require('fs');
const path = require('path');
const { extractMetadata } = require('./utils/metadataExtractor');
const { uploadToSCORMCloud } = require('./utils/scormUploader');

const app = express();
app.use(express.json());

// Configure Multer for file uploads
const storage = multer.diskStorage({
    destination: (req, file, cb) => cb(null, 'uploads/'),
    filename: (req, file, cb) => cb(null, `${Date.now()}-${file.originalname}`)
});
const upload = multer({ storage });

// Load existing metadata
const loadVideos = () => {
    if (!fs.existsSync('videos.json')) {
        return [];
    }
    const data = fs.readFileSync('videos.json');
    return JSON.parse(data);
};

// Save updated metadata
const saveVideos = (videos) => {
    fs.writeFileSync('videos.json', JSON.stringify(videos, null, 2));
};

// Video Upload Endpoint
app.post('/upload', upload.single('video'), async (req, res) => {
    try {
        const videoPath = req.file.path;

        // Step 1: Extract metadata
        const metadata = await extractMetadata(videoPath);

        // Step 2: Upload video and metadata to SCORM Cloud
        const scormCloudId = await uploadToSCORMCloud(videoPath, metadata);

        // Step 3: Store metadata locally
        const video = { ...metadata, videoPath, scormCloudId };
        const videos = loadVideos();
        videos.push(video);
        saveVideos(videos);

        res.status(200).json({ message: 'Video uploaded, metadata extracted, and stored successfully!', video });
    } catch (error) {
        res.status(500).json({ message: 'Error processing video upload.', error: error.message });
    }
});

app.listen(3000, () => console.log('Server running on http://localhost:3000'));
