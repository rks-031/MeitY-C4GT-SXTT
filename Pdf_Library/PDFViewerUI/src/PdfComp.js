import { useState } from "react";
import { Document, Page } from "react-pdf";
import "./PdfComp.css"; 

function PdfComp({ pdfFile }) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.5); 

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  function goToPrevPage() {
    setPageNumber((prevPage) => Math.max(prevPage - 1, 1));
  }

  function goToNextPage() {
    setPageNumber((prevPage) => Math.min(prevPage + 1, numPages));
  }

  return (
    <div className="pdf-div">
      <div className="navigation">
        <button
          className="btn btn-secondary"
          onClick={goToPrevPage}
          disabled={pageNumber <= 1}
        >
          Previous Page
        </button>
        <span>
          Page {pageNumber} of {numPages}
        </span>
        <button
          className="btn btn-secondary"
          onClick={goToNextPage}
          disabled={pageNumber >= numPages}
        >
          Next Page
        </button>
      </div>
      <Document file={pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
        <Page
          pageNumber={pageNumber}
          renderTextLayer={false}
          renderAnnotationLayer={false}
          scale={scale} 
        />
      </Document>
    </div>
  );
}

export default PdfComp;
