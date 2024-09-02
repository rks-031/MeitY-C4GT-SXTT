import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URI } from "../config/constants";

const UploadForm = ({ getAllMedias, toggleModal }) => {
  const [name, setName] = useState(""); 
  const [title, setTitle] = useState(""); 
  const [description, setDescription] = useState("");
  const [duration, setDuration] = useState(""); 
  const [videos, setVideos] = useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    let videoData = new FormData();
    for (let key in videos) {
      videoData.append("videos", videos[key]);
    }

    videoData.append("name", name); 

    try {
      const videoResponse = await axios.post(`${BACKEND_URI}/api/v1/media/create`, videoData);
      console.log("Video upload response:", videoResponse);

     
      const metadata = {
        title,
        description,
        duration
      };

      const metadataResponse = await axios.post(`${BACKEND_URI}/api/upload-video-metadata`, metadata);
      console.log("Metadata upload response:", metadataResponse);
      getAllMedias();
      alert("Submitted successfully");
      toggleModal(); 

    } catch (error) {
      console.error("Error occurred:", error);
      alert("Error happened!");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="name">Name</label>
          <input
            type="text"
            name="name"
            id="name"
            className="form-control"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="title">Title</label>
          <input
            type="text"
            name="title"
            id="title"
            className="form-control"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="description">Description</label>
          <input
            type="text"
            name="description"
            id="description"
            className="form-control"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="duration">Duration (in seconds)</label>
          <input
            type="number"
            name="duration"
            id="duration"
            className="form-control"
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="videos">Upload Videos</label>
          <input
            type="file"
            name="videos"
            id="videos"
            multiple
            className="form-control"
            accept=".mp4, .mkv"
            onChange={(e) => {
              setVideos(e.target.files);
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary mt-2" style={{backgroundColor:"green"}}>
          Submit
        </button>
      </form>
    </>
  );
};

export default UploadForm;
