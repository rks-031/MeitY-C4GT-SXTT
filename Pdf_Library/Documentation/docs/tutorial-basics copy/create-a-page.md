---
sidebar_position: 1
---
# Transferring Data from xAPI to SCORM Cloud

## Introduction

This guide provides a step-by-step approach for transferring data from an xAPI-based system to SCORM Cloud using JavaScript and the TinCanJS package. SCORM Cloud is a cloud-based service that supports SCORM and xAPI (Tin Can API) content. TinCanJS is a JavaScript library that facilitates communication with xAPI endpoints.

## Prerequisites

- **Node.js**: Ensure you have Node.js installed on your system.
- **NPM/Yarn**: Node package manager to install dependencies.
- **SCORM Cloud Account**: Access to SCORM Cloud credentials (endpoint, key, and secret).
- **TinCanJS Library**: JavaScript library for xAPI interactions.

## Setup

### 1. Install Dependencies

Start by setting up a new Node.js project and installing the required packages:

```bash
mkdir xapi-to-scorm
cd xapi-to-scorm
npm init -y
npm install tincanjs axios
```

### 2. Configure SCORM Cloud Credentials
Create a .env file in the root directory of your project to store SCORM Cloud credentials securely:
```bash
SCORM_CLOUD_ENDPOINT=https://cloud.scorm.com/lrs/VRIH0Z14DH/
SCORM_CLOUD_KEY=4gPlyMtlpy18FccetKM
SCORM_CLOUD_SECRET=vV4rzTZ8Q-yjnpakVIY
```
### 3. Create a JavaScript File for Data Transfer
Create a file transferData.js in the root directory of your project:
```bash 
// Define the xAPI statements to be transferred
const statements = [
    // Example xAPI statement
    {
        actor: {
            mbox: "mailto:example@example.com",
            name: "Example Learner"
        },
        verb: {
            id: "http://adlnet.gov/expapi/verbs/completed",
            display: { "en-US": "completed" }
        },
        object: {
            id: "http://example.com/activities/example-activity",
            objectType: "Activity",
            name: { "en-US": "Example Activity" }
        },
        result: {
            score: {
                scaled: 0.9
            }
        },
        timestamp: new Date().toISOString()
    }
];
```
## Explanation
TinCanJS Configuration: Configures the library with SCORM Cloud credentials.
Statements Definition: Defines the xAPI statements that you wish to transfer.
Data Transfer Function: Sends the xAPI statements to the SCORM Cloud endpoint using Axios for HTTP requests.
Execution: Runs the data transfer script.
## Error Handling
Ensure valid SCORM Cloud credentials are provided in the .env file.
Check network connectivity and SCORM Cloud endpoint status.
Monitor the console output for successful or failed transfer messages.
## Conclusion
This documentation outlines the process of transferring data from an xAPI system to SCORM Cloud using JavaScript and the TinCanJS library. Adjust the xAPI statements as needed for your specific use case.
