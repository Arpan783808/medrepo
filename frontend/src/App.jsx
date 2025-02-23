import { Route, Routes } from "react-router-dom";
import Usersign from "./components/usersign.jsx";
import Login from "./components/Login.jsx";
import Signup from "./components/Signup.jsx";
import Admin from "./components/admin.jsx";
import MedicalChatbot from "./components/chatbot.js";
import Landing from "./components/landing.jsx";
function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/usersign" element={<Usersign />} />
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/chatbot" element={<MedicalChatbot />} />
      </Routes>
    </div>
  );
}

export default App;
