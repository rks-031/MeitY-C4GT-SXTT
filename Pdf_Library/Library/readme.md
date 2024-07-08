# PDF Rendering Library
The PDF Rendering Library is designed to facilitate the rendering of PDF files from various sources including user interface uploads and cloud databases such as MongoDB and SCORM Cloud. This library is designed to handle PDFs from various sources, including user-uploaded files, cloud databases like MongoDB, and specialized educational platforms like SCORM Cloud. By providing a consistent and easy-to-use interface, the library simplifies the integration of PDF viewing and downloading functionality into your applications.

## Features
- Render course materials and assessments stored in SCORM Cloud.
- Display and manage PDFs stored in MongoDB.
- Allow users to upload, view, and download their PDF documents.

# Prerequisites
Ensure you have the following software installed:
- Node.js (>= 14.x)
- npm (>= 6.x)
- Install Supported Library
```shell 
npm install react-pdf pdfjs-dist
```

# Getting Started
1. Install the package using npm or yarn
```shell
npm install pdfrenderlib
```
<center> or </center>  
  
```shell
yarn add pdfrenderlib
```
2. Import the package in Module
```shell
import { PdfComp } from 'pdfrenderlib';
```
3. Library Auth
```shell
import { pdfjs } from "react-pdf";
import PdfComp from "pdfrenderlib";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();
```

4 Call Library  
```
  <PdfComp pdfFile={pdfFile} />
```
# Documentation
For detailed documentation, including all available props and methods, visit the [PDF Rendering Library Documentation](URL).

