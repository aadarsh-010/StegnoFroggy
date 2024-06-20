import React, { useState, useRef, useEffect } from "react";
import Cookies from "js-cookie";

import Modal from "../components/modal";
import "./stagp2t.css";

export default function Stag2(props) {
  const [fileUploaded, setFileUploaded] = useState(false);
  const [image, setImage] = useState(null);
  const [extractedMessage, setExtractedMessage] = useState("");
  const [receiver, setReceiver] = useState("");
  const [sender, setSender] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const imageCanvas2Ref = useRef(null);

  useEffect(() => {
    // Debug: Check props.logged_user directly
    console.log("Logged User from Props:", props.logged_user);

    if (props.logged_user) {
      setUser(props.logged_user._id);
    } else {
      // Try to get the user from a cookie as a fallback
      const userCookie = Cookies.get("localhost");
      if (userCookie) {
        const userData = JSON.parse(userCookie);
        setUser(userData._id);
      } else {
        console.error("User is undefined and no cookie found.");
      }
    }
  }, [props.logged_user]); 

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
        const senderID = message.substring(6, 6 + id_length);
        const receiverID = message.substring(6 + id_length, 6 + 2 * id_length);
        const extractedMsg = message.slice(6 + 2 * id_length).replace("\0", "");

        // Update state accordingly
        setSender(senderID);
        setReceiver(receiverID);

        // Check if the message is meant for the current user
        if (user !== receiverID) {
          setIsOpen(true); // Show modal if the message is not meant for the user
        } else {
          setExtractedMessage(extractedMsg); // Set the extracted message if it is meant for the user
        }
      } else {
        alert("No hidden message found.");
      }
    };
  };

  useEffect(() => {
    console.log("User:", user);
    console.log("Sender:", sender);
    console.log("Receiver:", receiver);
    console.log("Extracted Message:", extractedMessage);
  }, [user, sender, receiver, extractedMessage]);

  // If user is still undefined, you may want to render a loading or error message
  if (!user) {
    return <div>Loading or user not found...</div>;
  }

  return (
    <>
      <div className="containerSTAGT">
        <div className="select">
          <input type="file" onChange={handleImageUpload} className="input_file"/>
          <button className="stag2tss" onClick={() => extractMessage(24)} disabled={!fileUploaded}>
            Extract Message
          </button>
        </div>
        <canvas ref={imageCanvas2Ref} style={{ display: "none" }}></canvas>
        <div className="result">
          <p>Hidden Image:</p>
          {image && <img className="imgst" src={image} alt="Uploaded" width={350} height={200} />}

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

      {isOpen && (
        <Modal open={isOpen} onclose={() => setIsOpen(false)}>
          Alert: This message is not meant for you!!
        </Modal>
      )}
    </>
  );
}
