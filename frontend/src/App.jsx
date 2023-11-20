import "./styles/styles.css";
import NavBar from "./components/NavBar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import Messages from "./components/Messages";
import MessageForm from "./components/MessageForm";
import MessageContent from "./components/MessageContent";
import SentMessages from "./components/SentMessages";
import SentMessageContent from "./components/SentMessageContent";
import MedicalHistory from "./components/medical/MedicalHistory";

import { AuthProvider } from "./contexts/AuthContext";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <AuthProvider>
        <body>
          <NavBar />

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

              <Route path="*" element={<NotFound />} />
            </Routes>
          </main>
        </body>
      </AuthProvider>
    </Router>
  );
}

export default App;
