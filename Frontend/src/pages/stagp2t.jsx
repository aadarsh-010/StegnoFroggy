import React from "react";
import { useState , useRef} from "react";
import "./stag.css";
import Modal from "../components/modal";

export default function Stag2() {
    const [fileUploaded, setFileUploaded] = useState(false);
    const [image, setImage] = useState(null);
    const [extractedMessage, setExtractedMessage] = useState("");
    const imageCanvas2Ref = useRef(null);

    const handleImageUpload = (event) => {
        const file = event.target.files[0];
        if (file) {
          const url = URL.createObjectURL(file);
          setImage(url);
          setFileUploaded(true);
        }
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
    <>
      <div className="container">
      <input type="file" onChange={handleImageUpload} />
        <button onClick={extractMessage} disabled={!fileUploaded}>
          Extract Message
        </button>
        
        <canvas ref={imageCanvas2Ref} style={{ display: "none" }}></canvas>
        <div className="result">
          <p>Hidden Image:</p>
          {image && <img src={image} alt="Uploaded" width={50} height={50} />}

          {/* {downloadLink && (
            <button href={downloadLink} download="steganography_image.png">
              Download Modified Image
            </button>
          )} */}

          {/* <button onClick={handleDownload}>Download Modified Image</button> */}

          <textarea
            className="extracted-item"
            value={extractedMessage}
            readOnly
            placeholder="Extracted message will appear here"
          />
        </div>

       
      </div>
    </>
  );
}
