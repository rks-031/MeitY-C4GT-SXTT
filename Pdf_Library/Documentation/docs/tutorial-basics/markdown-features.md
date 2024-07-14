---
sidebar_position: 4
---
# PDF Rendering Library

The PDF Rendering Library is designed to simplify the rendering of PDF files from various sources, including user interface uploads and cloud databases like MongoDB and SCORM Cloud. It provides a straightforward interface for integrating PDF viewing and downloading functionalities into applications.

## Features

- **Render course materials and assessments stored in SCORM Cloud**: Facilitates the display and management of educational content stored in SCORM Cloud.
- **Display and manage PDFs stored in MongoDB**: Allows users to view and interact with PDF documents stored in MongoDB.
- **Upload, view, and download PDF documents**: Provides functionalities to upload PDF files via the user interface, view them, and offer options for downloading.

## Prerequisites

Ensure you have the following software installed:

- Node.js (>= 14.x)
- npm (>= 6.x)

## Install Supported Library

Install the necessary dependencies:

```bash
npm install react-pdf pdfjs-dist
```
## Getting Started
1.Install the PDF Rendering Library package using npm or yarn:
```bash 
npm install pdfrenderlib
```
    OR
```bash 
yarn add pdfrenderlib
```
2.Import the necessary components from the library:
```bash
import { PdfComp } from 'pdfrenderlib';
```
3.Set up necessary configurations and imports for the library:
```bash
import { pdfjs } from "react-pdf";
import PdfComp from "pdfrenderlib";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
```
4.Use the PdfComp component to render PDF files:
```bash
<PdfComp pdfFile={pdfFile} />
```

## PdfComp Component Explanation

- useState: React hook used for managing state variables (numPages, pageNumber, scale) within the component.
- onDocumentLoadSuccess: Callback function that sets the number of pages in the PDF when it is successfully loaded.
- goToPrevPage, goToNextPage: Functions to navigate through the PDF pages.
- Document and Page components: Provided by react-pdf to render the PDF document and its individual pages with specified configurations (pageNumber, scale, etc.).
- renderTextLayer, renderAnnotationLayer: Props passed to Page component to control rendering of text and annotations in the PDF.

## Source Code and npm Registry
- Github:-**[https://github.com/vinayakjaas/MeitY-C4GT-SXTT/tree/main/Pdf_Library/Library](https://github.com/vinayakjaas/MeitY-C4GT-SXTT/tree/main/Pdf_Library/Library)**

- npm:-**[https://www.npmjs.com/package/pdfrenderlib](https://www.npmjs.com/package/pdfrenderlib)**

