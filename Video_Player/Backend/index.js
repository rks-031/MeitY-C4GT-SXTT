require('dotenv').config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const path = require("path");
const TinCan = require('tincanjs');

const app = express();

app.use(express.json());
app.use(cors());

const mediaRoutes = require("./routes/media");

app.use("/api/v1/media", mediaRoutes);
app.use("/public", express.static(path.join(__dirname, "public")));
 
const mongodbUri = process.env.mongodbUri;

mongoose.connect(mongodbUri, {
  useNewUrlParser: true,
});

mongoose.connection.on("connected", () => {
  console.log("Connected to MongoDB...");
});

mongoose.connection.on("error", (err) => {
  console.log("Error connecting to MongoDB", err);
});

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


app.post('/api/upload-video-metadata', (req, res) => {
    const { title, description, duration } = req.body;

    if (!title || !duration) {
        console.error("Missing video metadata in request body");
        return res.status(400).send("Missing video metadata in request body");
    }

    console.log("Received video metadata:", { title, description, duration });

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
            id: `http://example.com/videos/${Date.now()}`, 
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
                "http://example.com/metadata/format": "N/A" 
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
                res.status(200).json({ message: "Video metadata saved successfully" });
            }
        }
    });
});

app.post('/api/v1/media/track-progress', (req, res) => {
    const { mediaId, videoIndex, progressPercentage } = req.body;

    if (!mediaId || typeof videoIndex !== "number" || typeof progressPercentage !== "number") {
        return res.status(400).send("Invalid request data");
    }

    console.log("Tracking progress for media:", { mediaId, videoIndex, progressPercentage });

    const statement = new TinCan.Statement({
        actor: {
            mbox: `mailto:unknown@example.com`, 
            name: "Unknown User",
        },
        verb: {
            id: "http://adlnet.gov/expapi/verbs/progressed",
            display: { "en-US": "progressed" }
        },
        object: {
            id: `http://example.com/videos/${mediaId}/video${videoIndex}`, 
            definition: {
                name: { "en-US": `Video ${videoIndex + 1}` },
                description: { "en-US": "User is progressing through the video." }
            }
        },
        result: {
            completion: progressPercentage >= 90, 
            extensions: {
                "http://example.com/progress": progressPercentage
            }
        },
        context: {
            extensions: {
                "http://example.com/mediaId": mediaId,
                "http://example.com/videoIndex": videoIndex
            }
        }
    });

    lrs.saveStatement(statement, {
        callback: function (err, xhr) {
            if (err !== null) {
                console.error("Failed to save progress statement:", err);
                res.status(500).send("Failed to save video progress");
            } else {
                console.log("Video progress saved successfully to SCORM Cloud");
                res.status(200).json({ message: "Video progress saved successfully" });
            }
        }
    });
});

app.listen(4000, () => {
  console.log("App is running on PORT 4000");
});
