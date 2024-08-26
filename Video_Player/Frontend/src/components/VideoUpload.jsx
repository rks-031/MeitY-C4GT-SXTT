import React, { useState } from 'react';
import axios from 'axios';

const VideoUpload = () => {
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [duration, setDuration] = useState('');
    const [videoFile, setVideoFile] = useState(null);
    const [message, setMessage] = useState('');

    const handleFileChange = (e) => {
        setVideoFile(e.target.files[0]);
    };

    const handleUpload = async (e) => {
        e.preventDefault();

        if (!title || !duration || !videoFile) {
            setMessage("Please fill all fields and select a video file.");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('duration', duration);
        formData.append('video', videoFile);

        try {
            const response = await axios.post('http://localhost:5000/api/upload-video', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                },
            });
            setMessage(response.data.message);
        } catch (err) {
            console.error(err);
            setMessage("Failed to upload video.");
        }
    };

    return (
        <div className="video-upload-container">
            <h2>Upload a Video</h2>
            <form onSubmit={handleUpload}>
                <div>
                    <label htmlFor="title">Title:</label>
                    <input
                        type="text"
                        id="title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="description">Description:</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    ></textarea>
                </div>
                <div>
                    <label htmlFor="duration">Duration (seconds):</label>
                    <input
                        type="number"
                        id="duration"
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label htmlFor="video">Select Video:</label>
                    <input
                        type="file"
                        id="video"
                        accept="video/*"
                        onChange={handleFileChange}
                        required
                    />
                </div>
                <button type="submit">Upload Video</button>
            </form>
            {message && <p>{message}</p>}
        </div>
    );
};

export default VideoUpload;
