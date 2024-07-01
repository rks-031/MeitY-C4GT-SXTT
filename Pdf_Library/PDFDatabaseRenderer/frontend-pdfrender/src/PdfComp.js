import { useState } from "react";
import { Document, Page } from "react-pdf";

function PdfComp(props) {
  const [numPages, setNumPages] = useState(null);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.5); 

  function onDocumentLoadSuccess({ numPages }) {
    setNumPages(numPages);
  }

  return (
    <div className="pdf-div">
      {props.pdfFile ? (
        <>
          <p>
            Page {pageNumber} of {numPages}
          </p>
          <Document file={props.pdfFile} onLoadSuccess={onDocumentLoadSuccess}>
            {Array.from(new Array(numPages), (el, index) => (
              <Page
                key={`page_${index + 1}`}
                pageNumber={index + 1}
                renderTextLayer={false}
                renderAnnotationLayer={false}
                scale={scale} 
              />
            ))}
          </Document>
        </>
      ) : (
        <p>No PDF selected</p>
      )}
    </div>
  );
}

export default PdfComp;
