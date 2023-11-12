import NavBar from "./components/NavBar";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import Home from "./components/Home";
import Profile from "./components/Profile";
import NotFound from "./components/NotFound";
import Messages from "./components/Messages";
import MessageForm from "./components/MessageForm";
import MessageContent from "./components/MessageContent";
import { AuthProvider } from "./contexts/AuthContext";

import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

function App() {
  return (
    <Router>
      <div className="container">
        <AuthProvider>
          <NavBar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="profile" element={<Profile />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="signin" element={<SignIn />} />
            <Route path="messages" element={<Messages />} />
            <Route path="send-message" element={<MessageForm />} />
            <Route path="message/:messageId" element={<MessageContent />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </AuthProvider>
      </div>
    </Router>
  );
}

export default App;
