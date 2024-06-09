import React from "react";
import { useState, useRef, useEffect } from "react";
import "./stag.css";
import Modal from "../components/modal";

export default function Stag2() {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [image, setImage] = useState(null);
  const [extractedMessage, setExtractedMessage] = useState("");
  const [reciever, setreciever] = useState("");
  const [sender, setsender] = useState("");
  const [isopen, setisopen] = useState(false);
  const user = "56789";
  const imageCanvas2Ref = useRef(null);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setImage(url);
      setFileUploaded(true);
    }
  };

  const extractMessage = (id_length) => {
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
        setsender(message.substring(6, 6 + id_length));
        setreciever(message.substring(6 + id_length, 6 + 2 * id_length));
        if (user !== reciever) setisopen(true);
        else
          setExtractedMessage(
            message.slice(6 + 2 * id_length).replace("\0", "")
          );
      } else {
        alert("No hidden message found.");
      }
    };
  };
  useEffect(() => {
    console.log("User:", user);
    console.log("Sender:", sender);
    console.log("Receiver:", reciever);
    console.log("Extracted Message:", extractedMessage);
  }, [sender, reciever, extractedMessage]);

  return (
    <>
      <div className="container">
        <input type="file" onChange={handleImageUpload} />
        <button onClick={() => extractMessage(5)} disabled={!fileUploaded}>
          Extract Message
        </button>

        <canvas ref={imageCanvas2Ref} style={{ display: "none" }}></canvas>
        <div className="result">
          <p>Hidden Image:</p>
          {image && <img src={image} alt="Uploaded" width={50} height={50} />}

          <textarea
            className="extracted-item"
            value={extractedMessage}
            readOnly
            placeholder="Extracted message will appear here"
          />
          <textarea
            className="Sent-by"
            value={sender}
            readOnly
            placeholder="The message is sent by the sender"
          />
        </div>
      </div>

      {isopen && (
        <Modal open={isopen} onclose={() => setisopen(false)}>
          Alert: This message is not meant for you!!
        </Modal>
      )}
    </>
  );
}
