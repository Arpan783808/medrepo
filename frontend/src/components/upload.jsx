import React, { useState } from "react";
import styled from "styled-components";
import MedicalChatbot from "./chatbot.js"
const Upload = ({ file, setFile }) => {
  const [chatOpen, setChatOpen] = useState(false);
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <StyledWrapper>
      <button className="chat" onClick={() => setChatOpen(!chatOpen)}>
        Chatbot
      </button>
      {chatOpen && (
        <div className="chat-overlay">
          <MedicalChatbot closeChat={() => setChatOpen(false)} />
        </div>
      )}
      <div className="container">
        <div className="header">
          <p>Browse File to upload!</p>
        </div>
        <label htmlFor="file" className="footer">
          <p>{file ? file.name : "Not selected file"}</p>
        </label>
        <input id="file" type="file" onChange={handleFileChange} />
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .chat {
    position: fixed;
    top: 20px;
    left: 20px;
    padding: 10px 20px;
    background-color: royalblue;
    color: white;
    border: none;
    border-radius: 10px;
    cursor: pointer;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
  }

  .chat-overlay {
    position:absolute;
    top: 50%;
    left: 50%;
    // transform: translate(-50%, -50%);
    // background: white;
    // padding: 20px;
    // border-radius: 10px;
    // box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.2);
    // z-index: 1000;
  }

  .container {
    height: 300px;
    width: 400px;
    border-radius: 20px;
    box-shadow: 4px 4px 30px rgba(0, 0, 0, 0.2);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
    padding: 10px;
    background-color: #cbdceb;
  }

  .header {
    flex: 1;
    width: 100%;
    border: 2px dashed royalblue;
    border-radius: 10px;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
  }

  .footer {
    background-color: rgba(0, 110, 255, 0.075);
    width: 100%;
    height: 40px;
    padding: 8px;
    border-radius: 10px;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    color: black;
    border: none;
  }

  #file {
    display: none;
  }
`;

export default Upload;
