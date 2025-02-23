import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import styled from "styled-components";

const MedicalChatbot = () => {
  const [userMessage, setUserMessage] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!userMessage.trim()) return;

    setChatHistory((prev) => [...prev, { sender: "User", text: userMessage }]);
    setLoading(true);
    try {
      const genAI = new GoogleGenerativeAI(
        "AIzaSyBz0-aOqayEYx5OafW12S7Qg5E8tq4WzU8"
      );
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `
You are a helpful medical chatbot. You provide accurate, evidence-based information on medical topics and always include a disclaimer that you are not a licensed medical professional and that any advice should be confirmed with a healthcare provider.
If the user's query is not related to medicine, respond with: "I'm sorry, I can only provide medical-related advice. Please ask a medical question.
User: ${userMessage}
Assistant:
`;
      const result = await model.generateContent(prompt);
      const responseText = result.response.text();

      setChatHistory((prev) => [
        ...prev,
        { sender: "Assistant", text: responseText },
      ]);
    } catch (error) {
      console.error("Error generating response:", error);
      setChatHistory((prev) => [
        ...prev,
        { sender: "Assistant", text: "Error generating response." },
      ]);
    }
    setUserMessage("");
    setLoading(false);
  };

  return (
    <ChatOverlay>
      <ChatHeader>Medical Chatbot</ChatHeader>
      <ChatHistory>
        {chatHistory.map((msg, index) => (
          <ChatMessage
            key={index}
            className={
              msg.sender === "User" ? "user-message" : "assistant-message"
            }
          >
            <strong>{msg.sender}:</strong> {msg.text}
          </ChatMessage>
        ))}
        {loading && <p>Loading...</p>}
      </ChatHistory>
      <ChatInput onSubmit={handleSubmit}>
        <input
          type="text"
          value={userMessage}
          onChange={(e) => setUserMessage(e.target.value)}
          placeholder="Enter your message..."
        />
        <button type="submit">Send</button>
      </ChatInput>
    </ChatOverlay>
  );
};

export default MedicalChatbot;

const ChatOverlay = styled.div`
  position: fixed;
  bottom: 20px;
  right: 20px;
  width: 350px;
  height: 500px;
  background: white;
  border-radius: 10px;
  box-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  overflow: hidden;
`;

const ChatHeader = styled.div`
  background: #007bff;
  color: white;
  padding: 10px;
  text-align: center;
  font-size: 18px;
  font-weight: bold;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
`;

const ChatHistory = styled.div`
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 8px;
  scrollbar-width: thin;
  scrollbar-color: #007bff #f1f1f1;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-thumb {
    background: #007bff;
    border-radius: 5px;
  }
`;

const ChatMessage = styled.div`
  padding: 8px 12px;
  border-radius: 5px;
  max-width: 80%;
  word-wrap: break-word;

  &.user-message {
    align-self: flex-end;
    background: #007bff;
    color: white;
  }

  &.assistant-message {
    align-self: flex-start;
    background: #f1f1f1;
    color: black;
  }
`;

const ChatInput = styled.form`
  display: flex;
  padding: 10px;
  border-top: 1px solid #ccc;

  input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ccc;
    border-radius: 5px;
    outline: none;
  }

  button {
    background: #007bff;
    color: white;
    border: none;
    padding: 8px 12px;
    margin-left: 8px;
    border-radius: 5px;
    cursor: pointer;
  }

  button:hover {
    background: #0056b3;
  }
`;
