export class Webcam {
  /**
   * Open webcam and stream it through video tag.
   * @param {HTMLVideoElement} videoRef video tag reference
   * @param {string} [ipStreamURL] URL of the IP camera stream (if using IP camera)
   */
  open = async (videoRef, ipStreamURL = "") => {
    if (!videoRef) {
      console.error("Video element reference is required.");
      alert("Video element reference is not provided!");
      return;
    }
  
    // 기존 스트림 정리
    this.close(videoRef);
  
    // 웹캠 사용
    if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
      try {
        console.log("Attempting to open regular webcam...");
        // 먼저 getUserMedia로 권한 요청
        await navigator.mediaDevices.getUserMedia({ video: true });
  
        // 권한이 부여되었으면 enumerateDevices 호출
        const devices = await navigator.mediaDevices.enumerateDevices();
        const videoDevices = devices.filter((device) => device.kind === "videoinput");
  
        if (videoDevices.length === 0) {
          throw new Error("No video input devices found. Please connect a webcam.");
        }
  
        // 웹캠이 하나면 자동 선택, 여러 개면 UI 표시
        const deviceId =
          videoDevices.length === 1
            ? videoDevices[0].deviceId
            : await this.selectDevice(videoDevices);
  
        if (!deviceId) {
          console.warn("User did not select a webcam.");
          return; // 선택하지 않으면 종료
        }
  
        console.log("Selected device ID:", deviceId);
  
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: false,
          video: { deviceId: { exact: deviceId }, facingMode: "environment" },
        });
  
        videoRef.srcObject = stream;
        videoRef.setAttribute("playsinline", "true");
        console.log("Regular webcam stream started successfully.");
      } catch (error) {
        console.error("Error opening webcam:", error);
        if (error.name === "NotAllowedError") {
          alert("Webcam access denied. Please allow access in your browser settings.");
        } else {
          alert("Can't open webcam: " + error.message);
        }
      }
    } else {
      alert("Your browser does not support webcam access.");
    }
  };
  
  /**
   * Prompt the user to select a video device
   * @param {MediaDeviceInfo[]} videoDevices List of video input devices
   * @returns {Promise<string|null>} The deviceId of the selected device, or null if canceled
   */
  selectDevice = (videoDevices) => {
    return new Promise((resolve) => {
      const selectionContainer = document.createElement("div");
      selectionContainer.style = `
        position: fixed; top: 0; left: 0; width: 100%; height: 100%;
        background: rgba(0, 0, 0, 0.7); display: flex; flex-direction: column;
        align-items: center; justify-content: center; z-index: 9999;
      `;
  
      const title = document.createElement("h2");
      title.innerText = "Select a Webcam";
      title.style = "color: white; margin-bottom: 20px;";
      selectionContainer.appendChild(title);
  
      videoDevices.forEach((device, index) => {
        const button = document.createElement("button");
        const deviceLabel = device.label || `Camera ${index + 1}`;
        button.innerText = deviceLabel;
        button.style = `
          margin: 10px; padding: 15px 30px; font-size: 16px; 
          background: white; border: none; cursor: pointer; border-radius: 5px;
        `;
        button.onclick = () => {
          console.log("Selected device:", device);
          document.body.removeChild(selectionContainer);
          resolve(device.deviceId);
        };
        selectionContainer.appendChild(button);
      });
  
      const cancelButton = document.createElement("button");
      cancelButton.innerText = "Cancel";
      cancelButton.style = `
        margin-top: 20px; padding: 15px 30px; font-size: 16px;
        background: red; color: white; border: none; cursor: pointer; border-radius: 5px;
      `;
      cancelButton.onclick = () => {
        document.body.removeChild(selectionContainer);
        resolve(null);
      };
      selectionContainer.appendChild(cancelButton);
  
      document.body.appendChild(selectionContainer);
    });
  };

  /**
   * Close the webcam stream or IP camera stream.
   * @param {HTMLVideoElement} videoRef Video element reference
   */
  close = (videoRef) => {
    if (!videoRef) {
      console.error("Video element reference is required.");
      alert("Video element reference is not provided!");
      return;
    }

    if (videoRef.srcObject) {
      videoRef.srcObject.getTracks().forEach((track) => track.stop());
      videoRef.srcObject = null;
      console.log("Webcam stream stopped.");
    } else if (videoRef.src) {
      videoRef.pause();
      videoRef.src = "";
      console.log("IP Camera stream stopped.");
    }
  };
}
