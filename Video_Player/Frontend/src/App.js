import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import UploadForm from "./components/UploadForm";
import UploadsList from "./components/UploadsList";
import { BACKEND_URI } from "./config/constants";
import Header from "./Header";
const App = () => {
  const [medias, setMedias] = useState([]);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    getAllMedias();
  }, []);

  const getAllMedias = () => {
    axios
      .get(`${BACKEND_URI}/api/v1/media/all`)
      .then((result) => {
        setMedias(result.data);
      })
      .catch((error) => {
        setMedias([]);
        console.log(error);
        alert("Error happened!");
      });
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };

  return (
    <>
    <Header/>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <button
              className="btn btn-primary"
              onClick={toggleModal}
              style={{ margin: "95px 0" }}
            >
              Add Video
            </button>
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <UploadsList medias={medias} />
          </div>
        </div>
      </div>
      {showModal && (
        <div className="modal fade show" style={{ display: "block" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Add Video</h5>
                <button type="button" className="close" onClick={toggleModal}>
                  <span>&times;</span>
                </button>
              </div>
              <div className="modal-body">
                <UploadForm getAllMedias={getAllMedias} toggleModal={toggleModal} />
              </div>
              <div className="modal-footer">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={toggleModal}
                  style={{backgroundColor:'red'}}
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
      {showModal && <div className="modal-backdrop fade show"></div>}
    </>
  );
};

export default App;
