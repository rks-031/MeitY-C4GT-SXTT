import React, { useState, useEffect } from 'react';
import ReactPlayer from 'react-player';
import axios from 'axios';
import './VideoPlayer.css';

const VideoPlayer = ({ videoId }) => {
    const [videoData, setVideoData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchVideoData = async () => {
            try {
                const response = await axios.get(`/api/video-metadata/${videoId}`);
                setVideoData(response.data);
                setLoading(false);
            } catch (err) {
                setError(err.message);
                setLoading(false);
            }
        };

        fetchVideoData();
    }, [videoId]);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="video-player-container">
            <h2>{videoData.title}</h2>
            <p>{videoData.description}</p>
            <ReactPlayer
                url={videoData.videoUrl}
                controls
                width="100%"
                height="auto"
            />
        </div>
    );
};

export default VideoPlayer;
