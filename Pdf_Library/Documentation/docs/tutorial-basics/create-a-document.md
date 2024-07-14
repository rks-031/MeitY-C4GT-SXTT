---
sidebar_position: 2
---

# PDF Database Renderer Frontend

## Introduction

This codebase allows users to render PDF data that comes from a database on the UI, with options to show and hide the PDF. The project enables users to upload and render PDF files on the UI. It provides functionalities to upload PDFs to a server, fetch PDF files from a database, and toggle their visibility on the UI. This application aims to make it easy for users to manage and view PDF files directly in their browser..


## Features

- **Render PDF files using react-pdf**: Utilizes the `react-pdf` library to display PDF files on the web interface accurately.
- **Toggle the visibility of the PDF**: Provides a button to show or hide the rendered PDF, allowing users to manage the display as needed.
- **Upload PDF files**: Users can upload PDF files to the server, which are then stored and made available for viewing.
- **Fetch PDF files from the server**: Retrieves a list of PDF files from the server and displays them on the UI.

## Usage

1. Upload a PDF file using the provided upload form.
2. The uploaded PDF will be rendered on the UI.
3. Use the show/hide button to toggle the visibility of the PDF.

## Prerequisites

You need to have Node.js and npm installed on your machine. You can download them from [Node.js](https://nodejs.org/).

## Getting Started

1. Clone the repository:

    ```bash
    git clone Github Repo
    ```

2. Install the dependencies:

    ```bash
    npm install
    ```

3. Start the development server:

    ```bash
    npm start
    ```

## Configuration

1. **Fetching and Rendering PDFs:**

   ```javascript
   const getPdf = async () => {
     const result = await axios.get("http://localhost:5000/get-files");
     console.log(result.data.data);
     setAllImage(result.data.data);
   };

2. **Uploading PDFs**
  ```bash
    const submitImage = async (e) => {
  e.preventDefault();
  const formData = new FormData();
  formData.append("title", title);
  formData.append("file", file);
  console.log(title, file);

  const result = await axios.post(
    "http://localhost:5000/upload-files",
    formData,
    {
      headers: { "Content-Type": "multipart/form-data" },
    }
  );
  console.log(result);
  if (result.data.status === "ok") {
    alert("Uploaded Successfully!!!");
    getPdf();
  }
};
```

3. **Toggling PDF Visibility**
  ```bash
    const togglePdf = (pdf) => {
  if (pdfFile === `http://localhost:5000/files/${pdf}`) {
    setPdfFile(null); // Hide PDF if already shown
  } else {
    setPdfFile(`http://localhost:5000/files/${pdf}`); // Show PDF
  }
};
```

## Tech Stack
- React: A JavaScript library for building user interfaces.
- react-pdf: A React component to display PDFs.
- axios: Promise-based HTTP client for the browser and Node.js.
- bootstrap: CSS framework for developing responsive and mobile-first websites.
- @testing-library/jest-dom: Custom jest matchers to test the state of the DOM.
- @testing-library/react: Simple and complete React DOM testing utilities.
- @testing-library/user-event: Simulates user events for testing.

