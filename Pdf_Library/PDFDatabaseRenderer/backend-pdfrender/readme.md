# PDF Database Renderer Backend

## Description
PDF Database Renderer is a backend application that stores PDFs in a MongoDB database and provides API endpoints to retrieve these PDFs.I Used Node.js, Express, MongoDB, and Multer for handling file uploads.

## Features
- Implement server-side code for PDFDatabaseRenderer.
- Configure MongoDB as the database.
- Set up Multer to handle multipart/form-data.
- Create API endpoints for PDF retrieval.
- Integrate PDF processing and storage with MongoDB.
- Ensure error handling and validation for file uploads.

## Prerequisites
- Node.js and npm installed.
- MongoDB installed and running.

## Installation

1. Clone the repository:
    ```sh
    git clone PROJECT_REPO_LINK
    cd pdf-database-renderer
    ```

2. Install the dependencies:
    ```sh
    npm install
    ```

3. Create a `.env` file in the root directory and add your MongoDB URI:
    ```env
    MONGO_URI=your_mongodb_uri
    ```

## Usage

1. Start the server:
    ```sh
    npm run dev
    ```

2. The server will run on `http://localhost:5000`.

## API Endpoints

### Upload PDF
- **URL:** `/upload`
- **Method:** `POST`
- **Description:** Upload a PDF file.
- **Headers:**
    - `Content-Type: multipart/form-data`
- **Body:**
    - `file`: The PDF file to upload.
- **Response:**
    - `200 OK`: If the PDF is uploaded successfully.
    - `400 Bad Request`: If there's an error in the file upload.


## Dependencies

- **express:** Fast, unopinionated, minimalist web framework for Node.js.
- **mongoose:** MongoDB object modeling tool.
- **multer:** Node.js middleware for handling `multipart/form-data`.
- **nodemon:** Utility that monitors for any changes in your source and automatically restarts your server.

## Error Handling and Validation

- Proper error handling is implemented for file uploads, database operations, and invalid requests.
- Validation is done to ensure that only PDF files are uploaded.



## Demo

![Upload PDF](./screenshots/Screenshot%202024-06-20%20185045.png)
Get PDF 
             



![View PDF](./screenshots/Screenshot%202024-06-20%20185113.png)
Upload PDF



