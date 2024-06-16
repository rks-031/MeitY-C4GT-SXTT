import { useState } from "react";
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";
import "./App.css"; 

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function App() {
  const [file, setFile] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

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

  return (
    <div className="App">
      <form className="formStyle" onSubmit={submitImage}>
        <h4>Upload Pdf</h4>
        <br />
        <br />
        <input
          type="file"
          className="form-control"
          accept="application/pdf"
          required
          onChange={(e) => setFile(e.target.files[0])}
        />
        <br />
        <button className="btn btn-primary" type="submit">
          Open
        </button>
      </form>
      {pdfFile && (
        <div className="uploaded">
          <h4>Uploaded PDF:</h4>
          <div className="output-div">
            <div className="inner-div">
              <PdfComp pdfFile={pdfFile} />
              <button className="btn btn-secondary" onClick={downloadPdf}>
                Download PDF
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
