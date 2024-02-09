import { useState, useRef, useCallback } from "react";

const useVideoRecorder = () => {
  const [stream, setStream] = useState(null);
  const [preview, setPreview] = useState(false);
  const [recording, setRecording] = useState(false);
  const [elapsedTime, setElapsedTime] = useState(0);
  const [paused, setPaused] = useState(false);
  const mediaRecorderRef = useRef();
  const videoRef = useRef();
  const timerRef = useRef(null);

  // const startCamera = async () => {
  //   setPreview(true);
  //   try {
  //     const mediaStream = await navigator.mediaDevices.getUserMedia({
  //       video: true,
  //       audio: true,
  //     });
  //     setStream(mediaStream);
  //     if (videoRef.current) {
  //       videoRef.current.srcObject = mediaStream;
  //     }
  //   } catch (error) {
  //     alert("Recording will not start if you dont provide access");
  //     console.error("Error accessing camera:", error);
  //   }
  // };

  // const stopCamera = () => {
  //   setPreview(false);
  //   if (stream) {
  //     stream.getTracks().forEach((track) => {
  //       track.stop();
  //     });
  //     setStream(null);
  //   }
  // };

  // const startRecording = () => {
  //   if (stream) {
  //     const mediaRecorder = new MediaRecorder(stream, {
  //       mimeType: "video/webm; codecs=vp9,opus",
  //     });
  //     mediaRecorderRef.current = mediaRecorder;
  //     const chunks = [];

  //     mediaRecorder.ondataavailable = (event) => {
  //       chunks.push(event.data);
  //     };

  //     mediaRecorder.onstop = () => {
  //       const blob = new Blob(chunks, { type: "video/webm; codecs=vp9,opus" });
  //       const url = URL.createObjectURL(blob);
  //       const a = document.createElement("a");
  //       a.href = url;
  //       a.download = "Test.webm";
  //       document.body.appendChild(a);
  //       a.click();
  //       URL.revokeObjectURL(url);
  //     };

  //     mediaRecorder.start();
  //     setRecording(true);
  //     startTimer();
  //   }
  // };

  // const stopRecording = () => {
  //   if (mediaRecorderRef.current && recording) {
  //     mediaRecorderRef.current.stop();
  //     setRecording(false);
  //     stopTimer();
  //   }
  // };

  // const startTimer = () => {
  //   timerRef.current = setInterval(() => {
  //     setElapsedTime((prevTime) => prevTime + 1);
  //   }, 1000);
  // };

  // const stopTimer = () => {
  //   clearInterval(timerRef.current);
  // };

  // const formatTime = (time) => {
  //   const minutes = Math.floor(time / 60);
  //   const seconds = time % 60;
  //   return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  // };

  // const pauseRecording = () => {
  //   if (mediaRecorderRef.current && recording && !paused) {
  //     mediaRecorderRef.current.pause();
  //     setPaused(true);
  //     stopTimer();
  //   } else if (mediaRecorderRef.current && recording && paused) {
  //     mediaRecorderRef.current.resume();
  //     setPaused(false);
  //     startTimer();
  //   }
  // };

  const startCamera = useCallback(async () => {
    setPreview(true);
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
    } catch (error) {
      alert("Recording will not start if you dont provide access");
      console.error("Error accessing camera:", error);
    }
  }, []);

  const stopCamera = useCallback(() => {
    setPreview(false);
    if (stream) {
      stream.getTracks().forEach((track) => {
        track.stop();
      });
      setStream(null);
    }
  }, [stream]);

  const startTimer = useCallback(() => {
    timerRef.current = setInterval(() => {
      setElapsedTime((prevTime) => prevTime + 1);
    }, 1000);
  }, []);

  const stopTimer = useCallback(() => {
    clearInterval(timerRef.current);
  }, []);

  const startRecording = useCallback(() => {
    if (stream) {
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: "video/webm; codecs=vp9,opus",
      });
      mediaRecorderRef.current = mediaRecorder;
      const chunks = [];

      mediaRecorder.ondataavailable = (event) => {
        chunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: "video/webm; codecs=vp9,opus" });
        const url = URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = "Test.webm";
        document.body.appendChild(a);
        a.click();
        URL.revokeObjectURL(url);
      };

      mediaRecorder.start();
      setRecording(true);
      startTimer();
    }
  }, [stream, startTimer]);

  const stopRecording = useCallback(() => {
    if (mediaRecorderRef.current && recording) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      stopTimer();
    }
  }, [recording, stopTimer]);

  const formatTime = useCallback((time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  }, []);

  const pauseRecording = useCallback(() => {
    if (mediaRecorderRef.current && recording && !paused) {
      mediaRecorderRef.current.pause();
      setPaused(true);
      stopTimer();
    } else if (mediaRecorderRef.current && recording && paused) {
      mediaRecorderRef.current.resume();
      setPaused(false);
      startTimer();
    }
  }, [recording, paused, startTimer, stopTimer]);
  return {
    startCamera,
    stopCamera,
    preview,
    recording,
    stopRecording,
    startRecording,
    pauseRecording,
    paused,
    videoRef,
    formatTime,
    elapsedTime,
  };
};

export default useVideoRecorder;
