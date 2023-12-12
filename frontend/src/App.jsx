import "./styles/styles.css";
import NavBar from "./components/NavBar";
import SignIn from "./components/auth/SignIn";
import SignUp from "./components/auth/SignUp";
import Home from "./components/Home";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import Messages from "./components/messages/Messages";
import MessageForm from "./components/messages/MessageForm";
import MessageContent from "./components/messages/MessageContent";
import SentMessages from "./components/messages/SentMessages";
import SentMessageContent from "./components/messages/SentMessageContent";
import MedicalHistory from "./components/medical/MedicalHistory";
import Footer from "./components/Footer";
import Warning from "./components/Warning";
import Staff from "./components/Staff";
import PatientHistory from "./components/medical/PatientHistory";

import { AuthProvider } from "./contexts/AuthContext";
import axios from "axios";
import { useEffect } from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  useEffect(() => {
    const totalAttempts = 3;
    let attempt = 0;
    const interval = 5000; // 5 seconds

    const wakeUpBackend = async () => {
      console.log(
        `Attempting to wake up the backend. Attempt number: ${attempt + 1}`
      );

      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/wakeup`
        );
        console.log(response.data);
      } catch (error) {
        console.error("Error waking up the backend:", error);
      }

      if (attempt < totalAttempts - 1) {
        setTimeout(wakeUpBackend, interval);
        attempt++;
      }
    };

    wakeUpBackend();
  }, []);

  return (
    <Router>
      <AuthProvider>
        <div className="mainContainer">
          <NavBar />
          <Warning />

          <main className="grid">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="profile" element={<Profile />}>
                <Route path="messages" element={<Messages />} />
                <Route path="sent-messages" element={<SentMessages />} />
                <Route path="send-message" element={<MessageForm />} />
                <Route path="message/:messageId" element={<MessageContent />} />
                <Route
                  path="sent-message/:messageId"
                  element={<SentMessageContent />}
                />
                <Route path="medical-history" element={<MedicalHistory />} />
                <Route
                  path="patient-history"
                  element={<PatientHistory />}
                ></Route>
              </Route>
              <Route path="signup" element={<SignUp />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="staff" element={<Staff />}></Route>

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </div>
        <Footer />
      </AuthProvider>
    </Router>
  );
}

export default App;
