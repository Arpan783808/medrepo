import React, { useState } from "react";
import {
  Upload as UploadIcon,
  LogOut,
  FileText,
  CheckCircle,
  Eye,
} from "lucide-react";
import med from "../assets/med.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../compcss/usersign.css";
import { useNavigate } from "react-router-dom";
import MedicalChatbot from "./chatbot";
import Card from "./card";
import PredictionForm from "./cvd";
function App() {
  const [file, setFile] = useState(null);
  const [model, setModel] = useState("BreastCancer");
  const [output, setOutput] = useState(null);
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [chatOpen, setChatOpen] = useState(false);
  const [cvdOpen, setCvdOpen] = useState(false);
  const navigate = useNavigate();
  const [username, setUsername] = useState("Dr. Smith");

  const handleFileChange = (e) => {
    if (e.target.files?.[0]) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      toast.error("Please select a file to upload");
      return;
    }

    const allowedTypes = ["image/jpeg", "image/jpg", "image/png"];
    if (!allowedTypes.includes(file.type)) {
      toast.error("Invalid file format. Please upload a JPG or PNG image.");
      return;
    }

    const formData = new FormData();
    formData.append("image", file);

    const apiEndpoint = `http://10.100.91.206:5001/predict${model}`;

    try {
      const response = await fetch(apiEndpoint, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Prediction Result:", data);

      setOutput(`${data.prediction} condition`);

      const fileURL = URL.createObjectURL(file);
      setUploadedFiles((prev) => [
        ...prev,
        {
          name: file.name,
          date: new Date().toISOString().split("T")[0],
          url: fileURL,
        },
      ]);

      toast.success("File uploaded and processed successfully");
    } catch (error) {
      console.error("Error fetching prediction:", error);
      toast.error("Failed to upload file");
    }

    setFile(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="fullpage1">
      <header className="header">
        <div className="header-container">
          <div className="logo-container">
            <div className="logo">
              <FileText />
            </div>
            <h1>Medical Records Portal</h1>
          </div>
          <button className="cvd chat" onClick={() => setCvdOpen(!cvdOpen)}>
            Text Report
          </button>
          {cvdOpen && (
            <div className="cvd-overlay">
              <PredictionForm closeChat={() => setCvdOpen(false)} />
            </div>
          )}
          <button className="chat" onClick={() => setChatOpen(!chatOpen)}>
            Chatbot
          </button>
          {chatOpen && (
            <div className="chat-overlay">
              <MedicalChatbot closeChat={() => setChatOpen(false)} />
            </div>
          )}
          <div className="user-info">
            <span>Welcome</span>
            <button onClick={handleLogout} className="logout-button">
              <LogOut />
            </button>
          </div>
        </div>
      </header>

      <main className="main-content">
        <div className="content-grid">
          <div className="card upload-section">
            <h2>Upload Medical Document</h2>
            <div className="upload-area">
              <input
                type="file"
                id="file-upload"
                className="file-input"
                onChange={handleFileChange}
                accept=".jpg,.jpeg,.png"
              />
              <label htmlFor="file-upload" className="upload-label">
                <UploadIcon className="upload-icon" />
                <span className="upload-text">
                  {file ? file.name : "Click to upload or drag and drop"}
                </span>
                <span className="upload-subtext">
                  JPG, JPEG, PNG up to 10MB
                </span>
              </label>
            </div>

            <div className="model-selection">
              <label>Select Model:</label>
              <select value={model} onChange={(e) => setModel(e.target.value)}>
                <option value="BreastCancer">Breast Cancer</option>
                {/* <option value="Cardio">Cardiovascular Disease</option> */}
                <option value="Pneumonia">Pneumonia</option>
                <option value="BrainTumor">Brain tumour</option>
              </select>
            </div>

            <button onClick={handleUpload} className="upload-button">
              Upload & Analyze
            </button>
          </div>
          <div className="card recent-uploads">
            <h2>Recent Uploads</h2>
            <div className="files-list">
              {uploadedFiles.map((file, index) => (
                <div key={index} className="file-item">
                  <div className="file-info">
                    <FileText className="file-icon" />
                    <div>
                      <p className="file-name">{file.name}</p>
                      <p className="file-date">{file.date}</p>
                    </div>
                  </div>
                  <div className="file-actions">
                    <a
                      href={file.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="view-button"
                    >
                      View
                    </a>
                    <CheckCircle className="success-icon" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {output && (
          <div className="result-section">
            <Card output={output} />
          </div>
        )}
      </main>

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
}

export default App;
