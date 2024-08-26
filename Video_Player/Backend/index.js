require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const TinCan = require('tincanjs');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 5000;

const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// Multer setup for file upload
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads/');
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({ 
    storage: storage,
    fileFilter: (req, file, cb) => {
        const filetypes = /mp4|avi|mov/;
        const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
        const mimetype = filetypes.test(file.mimetype);

        if (mimetype && extname) {
            return cb(null, true);
        } else {
            cb("Error: Only videos are allowed!");
        }
    }
});

// Initialize the LRS object globally
let lrs;
try {
    lrs = new TinCan.LRS({
        endpoint: process.env.LRS_ENDPOINT,
        username: process.env.LRS_KEY,
        password: process.env.LRS_SECRET,
        allowFail: false
    });
    console.log("LRS object setup successfully.");
} catch (ex) {
    console.error("Failed to setup LRS object: ", ex);
    process.exit(1);
}

// Route to upload video and save metadata
app.post('/api/upload-video', upload.single('video'), (req, res) => {
    const { title, description, duration } = req.body;
    const video = req.file;

    if (!video) {
        console.error("No video file uploaded");
        return res.status(400).send("No video file uploaded");
    }

    if (!title || !duration) {
        console.error("Missing video metadata in request body");
        return res.status(400).send("Missing video metadata in request body");
    }

    console.log("Received video metadata:", { title, description, duration, format: video.mimetype });

    const statement = new TinCan.Statement({
        actor: {
            mbox: `mailto:unknown@example.com`,
            name: "Unknown User",
        },
        verb: {
            id: "http://adlnet.gov/expapi/verbs/experienced",
            display: { "en-US": "experienced" }
        },
        object: {
            id: `http://example.com/videos/${video.filename}`,
            definition: {
                name: { "en-US": title },
                description: { "en-US": description }
            }
        },
        result: {
            duration: `PT${Math.floor(duration / 60)}M${duration % 60}S`
        },
        context: {
            extensions: {
                "http://example.com/metadata/format": video.mimetype
            }
        }
    });

    console.log("Attempting to save video metadata statement:", statement);

    lrs.saveStatement(statement, {
        callback: function (err, xhr) {
            if (err !== null) {
                console.error("Failed to save statement:", err);
                console.error("Error details:", xhr ? xhr.responseText : "No response text");
                res.status(500).send("Failed to save video metadata");
            } else {
                console.log("Video metadata saved successfully to SCORM Cloud");
                res.status(200).json({ message: "Video uploaded and metadata saved successfully", videoPath: `/uploads/${video.filename}` });
            }
        }
    });
});

// Error handling middleware
app.use((err, req, res, next) => {
    console.error("An error occurred:", err.message);
    res.status(500).send("Internal Server Error");
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
