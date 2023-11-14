import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import MessageDisplay from "./MessageDisplay";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const { currentUser, token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      logout();
      navigate("/signin");
    } else {
      fetchMessages();
    }
  }, [currentUser, navigate]);

  const fetchMessages = async () => {
    try {
      console.log("token: " + token);
      const response = await axios.get("/api/messages/display", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data);
    } catch (error) {
      console.error("Error getting messages:", error);
    }
  };

  const handleDeleteMessage = (messageId) => {
    console.log("Deleting message with ID:", messageId);

    setMessages((currentMessages) =>
      currentMessages.filter((msg) => msg.id !== messageId)
    );
  };

  return (
    <>
      <h1>Messages</h1>
      <Link to="/send-message">Compose New Message</Link>
      <Link to="/sent-messages">View Sent Messages</Link>

      <div>
        <MessageDisplay
          messages={messages}
          onDeleteMessage={handleDeleteMessage}
        />
      </div>
    </>
  );
};
export default Messages;
