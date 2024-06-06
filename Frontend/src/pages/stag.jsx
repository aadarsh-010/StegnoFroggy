import React, { useState, useRef } from "react";
import "./stag.css";

const Steganography = () => {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [image, setImage] = useState(null);
  const [message, setMessage] = useState("");
  const [extractedMessage, setExtractedMessage] = useState("");
  const [downloadLink, setDownloadLink] = useState("");
  const imageCanvasRef = useRef(null);
  const imageCanvas2Ref = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      setFileUploaded(true);
    }
  };

  const createImageCanvas = () => {
    if (!image) return;

    const img = new Image();
    img.src = image;
    img.setAttribute("crossOrigin", "");
    img.onload = () => {
      const canvas = imageCanvasRef.current;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixelData = imageData.data;

      ///////////////
      console.log(pixelData);

      const messageWithHeader = "Valid\n" + message;
      const binaryMessage = [];
      for (let i = 0; i < messageWithHeader.length; i++) {
        const charCode = messageWithHeader.charCodeAt(i);
        for (let j = 7; j >= 0; j--) {
          binaryMessage.push((charCode >> j) & 1);
        }
      }

      ////////
      //   console.log("msg in code");
      //   for (let i = 0; i < binaryMessage.length; i++) {
      //     console.log(binaryMessage[i]);
      //   }

      for (let i = 0; i < pixelData.length; i++) {
        pixelData[i] &= 254; // Clear the least significant bit
      }

      for (let i = 0; i < binaryMessage.length; i++) {
        pixelData[i] |= binaryMessage[i];
      }

      ctx.putImageData(imageData, 0, 0);

      // Set the download link
      const dataURL = canvas.toDataURL();
      setDownloadLink(dataURL);
      console.log(downloadLink);
    };
  };

  const handleDownload = () => {
    if (!downloadLink) return;

    const link = document.createElement("a");
    link.href = downloadLink;
    link.download = "steganography_image.png";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const extractMessage = () => {
    if (!image) return;

    const img = new Image();
    img.src = image;
    img.setAttribute("crossOrigin", "");
    img.onload = () => {
      const canvas = imageCanvas2Ref.current;
      const ctx = canvas.getContext("2d", { willReadFrequently: true });
      canvas.width = img.width;
      canvas.height = img.height;
      ctx.drawImage(img, 0, 0);

      const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
      const pixelData = imageData.data;
      const binaryData = [];

      for (let i = 0; i < pixelData.length; i++) {
        binaryData.push(pixelData[i] & 1);
      }

      let message = "";
      for (let i = 0; i < binaryData.length; i += 8) {
        const byte = binaryData
          .slice(i, i + 8)
          .reduce((acc, bit, index) => acc + (bit << (7 - index)), 0);
        const char = String.fromCharCode(byte);
        message += char;
        if (char === "\0") break; // Handle null-terminated strings
      }

      if (message.startsWith("Valid\n")) {
        setExtractedMessage(message.slice(6).replace("\0", ""));
      } else {
        alert("No hidden message found.");
      }
    };
  };
  return (
    <div>
      <div>
        <input type="file" onChange={handleImageUpload} />
        <textarea
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Enter message to hide"
        />
        <button onClick={createImageCanvas} disabled={!fileUploaded}>
          Hide Message
        </button>
      </div>

      <div>
        <button onClick={extractMessage} disabled={!fileUploaded}>
          Extract Message
        </button>
        <canvas ref={imageCanvasRef} style={{ display: "none" }}></canvas>
        <canvas ref={imageCanvas2Ref} style={{ display: "none" }}></canvas>
        <div className="result">
          <p>Hidden Image:</p>
          {image && <img src={image} alt="Uploaded" width={50} height={50} />}

          {/* {downloadLink && (
            <button href={downloadLink} download="steganography_image.png">
              Download Modified Image
            </button>
          )} */}

          <button onClick={handleDownload}>Download Modified Image</button>

          <textarea
            className="extracted-item"
            value={extractedMessage}
            readOnly
            placeholder="Extracted message will appear here"
          />
        </div>
      </div>
    </div>
  );
};

export default Steganography;
