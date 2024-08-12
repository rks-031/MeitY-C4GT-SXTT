require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const TinCan = require('tincanjs');
const jwt = require('jsonwebtoken');
const morgan = require('morgan');
const fs = require('fs');
const path = require('path');

const app = express();
const port = process.env.PORT || 5000;

// Middleware for logging requests
const accessLogStream = fs.createWriteStream(path.join(__dirname, 'access.log'), { flags: 'a' });
app.use(morgan('combined', { stream: accessLogStream }));

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
});

// JWT Authentication Middleware
const authenticateJWT = (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (token) {
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                console.error('JWT verification failed:', err);
                return res.status(403).send('Forbidden');
            }
            req.user = user;
            next();
        });
    } else {
        res.status(401).send('Unauthorized');
    }
};

// // Route to Generate JWT Token (For Testing Purposes)
// app.post('/api/login', (req, res) => {
//     const { username, email } = req.body;

//     // Generate a JWT token
//     const token = jwt.sign(
//         { name: username, email: email },
//         process.env.JWT_SECRET,
//         { expiresIn: '1h' }
//     );

//     res.json({ token });
// });
app.post('/api/login', (req, res) => {
    const { username, email } = req.body;

    // Generate a JWT token
    const token = jwt.sign(
        { name: username, email: email },
        process.env.JWT_SECRET,
        { expiresIn: '1h' }
    );

    res.json({ token });
});


// Setup the LRS (SCORM Cloud)
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

// Endpoint to Handle Video Content Metadata
app.post('/api/video-metadata', authenticateJWT, (req, res) => {
    const { videoId, title, description, duration, format } = req.body;

    if (!videoId || !title || !duration || !format) {
        console.error("Missing video metadata in request body");
        return res.status(400).send("Missing video metadata in request body");
    }

    // Log received metadata
    console.log("Received video metadata:", { videoId, title, description, duration, format });

    // Validate video format compatibility
    const supportedFormats = ['mp4', 'avi', 'mov'];
    if (!supportedFormats.includes(format)) {
        console.error(`Unsupported video format: ${format}`);
        return res.status(400).send(`Unsupported video format: ${format}`);
    }

    // Create a TinCan statement for storing in SCORM Cloud
    const statement = new TinCan.Statement({
        actor: {
            mbox: `mailto:${req.user.email}`,
            name: req.user.name,
        },
        verb: {
            id: "http://adlnet.gov/expapi/verbs/experienced",
            display: { "en-US": "experienced" }
        },
        object: {
            id: `http://example.com/videos/${videoId}`,
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
                "http://example.com/metadata/format": format
            }
        }
    });

    console.log("Attempting to save video metadata statement:", statement);

    // Save the statement to SCORM Cloud
    lrs.saveStatement(statement, {
        callback: function (err, xhr) {
            if (err !== null) {
                console.error("Failed to save statement:", err);
                console.error("Error details:", xhr ? xhr.responseText : "No response text");
                res.status(500).send("Failed to save video metadata");
            } else {
                console.log("Video metadata saved successfully to SCORM Cloud");
                res.status(200).send("Video metadata saved successfully");
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

