const express = require('express');
const bodyParser = require('body-parser');
const TinCan = require('tincanjs');
require('dotenv').config();

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
        username: process.env.LRS_USERNAME,
        password: process.env.LRS_PASSWORD,
        allowFail: false
    });
} catch (ex) {
    console.log("Failed to setup LRS object: ", ex);
    process.exit(1);
}

app.post('/api/statements', (req, res) => {
    const statement = new TinCan.Statement(req.body);

    lrs.saveStatement(statement, {
        callback: function (err, xhr) {
            if (err !== null) {
                console.log("Failed to save statement: ", err);
                res.status(500).send("Failed to save statement");
            } else {
                console.log("Statement saved successfully");
                res.status(200).send("Statement saved successfully");
            }
        }
    });
});

app.get('/api/statements', (req, res) => {
    const params = {
        limit: req.query.limit || 10,
        agent: req.query.agent,
        verb: req.query.verb,
        activity: req.query.activity
    };

    lrs.queryStatements({
        params: params,
        callback: function (err, response) {
            if (err !== null) {
                console.log("Failed to fetch statements: ", err);
                res.status(500).send("Failed to fetch statements");
                return;
            }
            if (response !== null) {
                console.log("Statements fetched successfully");
                res.status(200).json(response.statements);
            } else {
                res.status(404).send("No statements found");
            }
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

