require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const TinCan = require('tincanjs');

const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());

app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
    next();
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

app.post('/api/quiz-result', (req, res) => {
    const { learner, quizResult } = req.body;

    const statement = new TinCan.Statement({
        actor: {
            mbox: `mailto:${learner.email}`,
            name: learner.name,
        },
        verb: {
            id: "http://adlnet.gov/expapi/verbs/completed",
            display: { "en-US": "completed" }
        },
        object: {
            id: "http://example.com/activities/quiz",
            definition: {
                name: { "en-US": "Quiz" },
                description: { "en-US": "A quiz to test the learner's knowledge." }
            }
        },
        result: {
            score: {
                raw: quizResult.correctPoints,
                max: quizResult.totalPoints
            },
            success: quizResult.numberOfCorrectAnswers > 0,
            completion: true
        }
    });

    lrs.saveStatement(statement, {
        callback: function (err, xhr) {
            if (err !== null) {
                console.error("Failed to save statement: ", err);
                console.error("Error details:", xhr.responseText);
                res.status(500).send("Failed to save statement");
            } else {
                console.log("Statement saved successfully");
                res.status(200).send("Statement saved successfully");
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
