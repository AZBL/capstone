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

import { AuthProvider } from "./contexts/AuthContext";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
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
