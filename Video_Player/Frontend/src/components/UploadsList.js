import React, { useState } from "react";
import axios from "axios";
import { BACKEND_URI } from "../config/constants";
import {
  Button,
  LinearProgress,
  Grid,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
  Box,
  Typography,
} from "@mui/material";
import Swal from 'sweetalert2';

const UploadsList = ({ medias }) => {
  const [progress, setProgress] = useState({});

  const handleProgress = (mediaId, videoIndex, event) => {
    const percentage = Math.floor((event.target.currentTime / event.target.duration) * 100);

    setProgress((prevProgress) => ({
      ...prevProgress,
      [mediaId]: {
        ...(prevProgress[mediaId] || {}),
        [videoIndex]: percentage,
      },
    }));
  };

  const handleSubmitProgress = (mediaId, videoIndex) => {
    const progressPercentage = progress[mediaId] ? progress[mediaId][videoIndex] : 0;

    axios
      .post(`${BACKEND_URI}/api/v1/media/track-progress`, {
        mediaId,
        videoIndex,
        progressPercentage,
      })
      .then(() => {
        Swal.fire({
          title: 'Success!',
          text: `Progress submitted successfully: ${progressPercentage}%`,
          icon: 'success',
          confirmButtonText: 'OK',
        });
      })
      .catch((error) => {
        console.error("Error updating progress:", error);
        Swal.fire({
          title: 'Error!',
          text: 'Failed to submit progress',
          icon: 'error',
          confirmButtonText: 'OK',
        });
      });
  };

  return (
    <>
      <Table>
        <TableBody>
          {medias &&
            medias.map((media) => (
              <TableRow key={media._id}>
                <TableCell>
                </TableCell>
                <TableCell>
                  <Grid container spacing={2}>
                    {media.videos.map((video, index) => {
                      const mediaId = media._id;
                      return (
                        <Grid item xs={12} sm={6} md={4} key={index}>
                          <Box
                            sx={{
                              display: 'flex',
                              flexDirection: 'column',
                              border: '1px solid #ddd',
                              borderRadius: '4px',
                              overflow: 'hidden',
                              padding: '8px',
                              boxShadow: 1,
                              backgroundColor: 'white',
                            }}
                          >
                            <Typography variant="h6" noWrap>
                              {media.name}
                            </Typography>
                            <video
                              preload="auto"
                              controls
                              style={{ width: '100%', height: 'auto', borderRadius: '4px' }}
                              onTimeUpdate={(e) => handleProgress(mediaId, index, e)}
                            >
                              <source src={`${BACKEND_URI}${video}`} />
                              Your browser does not support the video tag.
                            </video>
                            <Box mt={1}>
                              <Typography variant="body2" color="textSecondary">
                                Progress: {progress[mediaId] ? progress[mediaId][index] || 0 : 0}%
                              </Typography>
                              <LinearProgress
                                variant="determinate"
                                value={progress[mediaId] ? progress[mediaId][index] || 0 : 0}
                                sx={{ marginTop: '4px' }}
                              />
                              <Button
                                variant="contained"
                                color="primary"
                                onClick={() => handleSubmitProgress(mediaId, index)}
                                fullWidth
                                sx={{ marginTop: '8px', backgroundColor: 'orangered' }}
                              >
                                Submit Progress
                              </Button>
                            </Box>
                          </Box>
                        </Grid>
                      );
                    })}
                  </Grid>
                </TableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </>
  );
};

export default UploadsList;
