import { useState, useRef } from "react";
import { Webcam } from "../utils/webcam";

const ButtonHandler = ({ imageRef, cameraRef, videoRef }) => {
  const [streaming, setStreaming] = useState(""); // 상태를 ""(빈 문자열)로 초기화
  const inputImageRef = useRef(null);
  const inputVideoRef = useRef(null);
  const webcam = new Webcam();

  const [ipCameraURL, setIpCameraURL] = useState("");

  // 닫기 함수들 (중복 최소화)
  const closeAll = () => {
    if (streaming === "image") closeImage();
    else if (streaming === "video") closeVideo();
    else if (streaming === "camera" || streaming === "ipCamera") closeIpCamera();
  };

  const closeImage = () => {
    if (!imageRef.current) return;
    const url = imageRef.current.src;
    imageRef.current.src = "#";
    URL.revokeObjectURL(url);
    inputImageRef.current.value = "";
    imageRef.current.style.display = "none";
    setStreaming("");
  };

  const closeVideo = () => {
    if (!videoRef.current) return;
    const url = videoRef.current.src;
    videoRef.current.src = "";
    URL.revokeObjectURL(url);
    inputVideoRef.current.value = "";
    videoRef.current.style.display = "none";
    setStreaming("");
  };

  const closeIpCamera = () => {
    if (!cameraRef.current) return;
    webcam.close(cameraRef.current);
    cameraRef.current.style.display = "none";
    setStreaming("");
  };

  return (
    <div className="btn-container">
      {/* 이미지 핸들러 */}
      <input
        type="file"
        accept="image/*"
        style={{ display: "none" }}
        onChange={(e) => {
          closeAll(); // 다른 스트림 닫기
          const url = URL.createObjectURL(e.target.files[0]);
          imageRef.current.src = url;
          imageRef.current.style.display = "block";
          setStreaming("image");
        }}
        ref={inputImageRef}
      />
      <button onClick={() => (streaming === "image" ? closeImage() : inputImageRef.current.click())}>
        {streaming === "image" ? "Close" : "Open"} Image
      </button>

      {/* 비디오 핸들러 */}
      <input
        type="file"
        accept="video/*"
        style={{ display: "none" }}
        onChange={(e) => {
          closeAll(); // 다른 스트림 닫기
          const url = URL.createObjectURL(e.target.files[0]);
          videoRef.current.src = url;
          videoRef.current.addEventListener("ended", closeVideo);
          videoRef.current.style.display = "block";
          setStreaming("video");
        }}
        ref={inputVideoRef}
      />
      <button onClick={() => (streaming === "video" ? closeVideo() : inputVideoRef.current.click())}>
        {streaming === "video" ? "Close" : "Open"} Video
      </button>

      {/* 웹캠 핸들러 */}
      <button
        onClick={async () => {
          if (streaming === "camera") {
            closeIpCamera();
          } else {
            closeAll(); // 다른 스트림 닫기
            await webcam.open(cameraRef.current);
            cameraRef.current.style.display = "block";
            setStreaming("camera");
          }
        }}
      >
        {streaming === "camera" ? "Close" : "Open"} Webcam
      </button>
      
    </div>
  );
};

export default ButtonHandler;
