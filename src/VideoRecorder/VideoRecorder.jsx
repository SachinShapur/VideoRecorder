import React from "react";
import useVideoRecorder from "./useVideoRecorder";

const VideoRecorder = () => {
  const {
    startCamera,
    stopCamera,
    preview,
    stopRecording,
    startRecording,
    pauseRecording,
    paused,
    videoRef,
    recording,
    formatTime,
    elapsedTime,
  } = useVideoRecorder();

  return (
    <div>
      <button onClick={startCamera} style={buttonStyle}>Start Camera</button>
      <button onClick={stopCamera} style={buttonStyle}>Stop Camera</button>
      {preview && (
        <>
          <button onClick={recording ? stopRecording : startRecording} style={buttonStyle}>
            {recording ? "Stop Recording" : "Start Recording"}
          </button>
          {recording && (
            <button onClick={pauseRecording} style={buttonStyle}>
              {paused ? "Resume Recording" : "Pause Recording"}
            </button>
          )}
          <div>
            <video
              ref={videoRef}
              autoPlay
              muted
              playsInline
              style={{ maxWidth: "100%", maxHeight: "100%" }}
            />
          </div>
          {recording && <div>Recording: {formatTime(elapsedTime)}</div>}
        </>
      )}
    </div>
  );
};

const buttonStyle = {
  backgroundColor: '#007bff',
  color: '#fff',
  padding: '10px 20px',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  marginRight: '10px',
};

export default VideoRecorder;
