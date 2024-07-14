import './App.css';

import axios from 'axios';
import React, { useState } from 'react';

const App = () => {
  const [videoUrl, setVideoUrl] = useState('');
  const [processing, setProcessing] = useState(false);

  const handleStartProcessing = () => {
    axios.post('http://localhost:5000/start_processing')
      .then(response => {
        setProcessing(true);
        setVideoUrl(response.data.video_url);
      })
      .catch(error => console.error('Error starting processing:', error));
  };

  const handleStopProcessing = () => {
    axios.post('http://localhost:5000/stop_processing')
      .then(response => {
        setProcessing(false);
        setVideoUrl('');
        console.log('Processing stopped:', response.data.message);
      })
      .catch(error => console.error('Error stopping processing:', error));
  };

  return (
    <div className="container">
      <h1>Video Processing with OpenCV and React</h1>
      <div className="button-container">
        {!processing ? (
          <button onClick={handleStartProcessing}>Start Processing</button>
        ) : (
          <button onClick={handleStopProcessing}>Stop Processing</button>
        )}
      </div>
      {videoUrl && <img src={`http://localhost:5000${videoUrl}`} alt="Processed Video" />}
    </div>
  );
};

export default App;
