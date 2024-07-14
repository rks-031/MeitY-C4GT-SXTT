---
sidebar_position: 1
---

# PDFViewer UI

This is a PDFViewer UI that allows users to choose a PDF file through a UI and then open and view it. The library provides a simple and intuitive user interface, enabling users to easily upload their PDF files from their local storage. Once a file is selected, it is processed and displayed within the application, allowing users to view the content directly in their browser. This eliminates the need for external PDF readers and ensures a seamless viewing experience. The library also supports additional functionalities like downloading the PDF, enhancing the overall usability and convenience for the users.

## Features

- **Choose a PDF file via UI**: The library provides an intuitive user interface where users can easily select a PDF file from their local storage. By integrating a file input component, users are guided to upload their desired PDF file with minimal effort. This feature ensures that the process of selecting a PDF is straightforward and accessible to users of all technical levels.

- **Open and view PDF files**: Once a PDF file is selected, the library seamlessly processes and renders the document within the application. Users can view the content of the PDF directly in their browser, eliminating the need for external PDF readers. This feature leverages the `react-pdf` library to ensure high-quality rendering and smooth navigation through the PDF pages. Additionally, it supports various viewing options, such as zooming and scrolling, to enhance the user experience.

### Prerequisites

You need to have Node.js and npm installed on your machine. You can download them from [Node.js](https://nodejs.org/).

### Installation

1.Clone the repository to your local machine:

```bash
git clone REPO_URL
cd PDFVIEWERUI
```

2.Install the dependencies:
```bash 
npm install 
```

3.Start the development server:
```bash 
npm start
```
Open your browser and navigate to http://localhost:3000.

## Configuration
Imports and Initialization:
```bash 
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
```
App Component
```bash 
const submitImage = (e) => {
    e.preventDefault();
    const fileReader = new FileReader();

    fileReader.onload = function () {
      setPdfFile(fileReader.result);
    };

    if (file) {
      fileReader.readAsDataURL(file);
      alert("File loaded successfully!");
    }
  };

  const downloadPdf = () => {
    const link = document.createElement("a");
    link.href = pdfFile;
    link.download = "download.pdf";
    link.click();
  };
```
## Tech Stack
- React: A JavaScript library for building user interfaces.
- react-pdf: A React component to display PDFs.
- @testing-library/jest-dom: Custom jest matchers to test the state of the DOM.
- @testing-library/react: Simple and complete React DOM testing utilities.
- @testing-library/user-event: Simulates user events for testing.