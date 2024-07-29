import { useEffect, useState } from "react";
import axios from "axios";
import { pdfjs } from "react-pdf";
import PdfComp from "./PdfComp";
import "./App.css"; 
import Header from "./Header";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.js",
  import.meta.url
).toString();

function App() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState(null);
  const [allImage, setAllImage] = useState(null);
  const [pdfFile, setPdfFile] = useState(null);

  useEffect(() => {
    getPdf();
  }, []);

  const getPdf = async () => {
    const result = await axios.get("http://localhost:4000/get-files");
    console.log(result.data.data);
    setAllImage(result.data.data);
  };

  const submitImage = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);
    console.log(title, file);

    const result = await axios.post(
      "http://localhost:4000/upload-files",
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

  const togglePdf = (pdf) => {
    if (pdfFile === `http://localhost:4000/files/${pdf}`) {
      setPdfFile(null); // Hide PDF if already shown
    } else {
      setPdfFile(`http://localhost:4000/files/${pdf}`); // Show PDF
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
      <Header/>
      <div className="uploaded">
        <h4>Uploaded PDF:</h4>
        <div className="output-div">
          {allImage == null
            ? ""
            : allImage.map((data) => (
                <div className="inner-div" key={data.pdf}>
                  <h6>Title: {data.title}</h6>
                  <button
                    className="btn btn-primary"
                    style={{backgroundColor:"orange"}}
                    onClick={() => togglePdf(data.pdf)}
                  >
                    {pdfFile === `http://localhost:4000/files/${data.pdf}`
                      ? "Hide"
                      : "Show"}
                  </button>
                </div>
              ))}
        </div>
      </div>
      <div className="pdf-container">
        <PdfComp pdfFile={pdfFile} />
      </div>
    </div>
  );
}

export default App;


