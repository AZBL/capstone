import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useState, useEffect } from "react";
import MessageDisplay from "./MessageDisplay";

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const { currentUser, token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      logout();
      navigate("/signin");
    } else if (!isLoading) {
      fetchMessages();
    }
  }, [currentUser, navigate]);

  const fetchMessages = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("/api/messages/display", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setMessages(response.data);
    } catch (error) {
      console.error("Error getting messages:", error);
    }
    setIsLoading(false);
  };

  const handleDeleteMessage = (messageId) => {
    console.log("Deleting message with ID:", messageId);

    setMessages((currentMessages) =>
      currentMessages.filter((msg) => msg.id !== messageId)
    );
  };

  return (
    <div className="messagesContainer">
      <h3>{currentUser.first_name}'s Messages</h3>
      <div className="composeSendContainer">
        <Link to="/profile/send-message">Compose New Message</Link>
        <Link to="/profile/sent-messages">View Sent Messages</Link>
      </div>
      <div className="messageDisplayContainer">
        <MessageDisplay
          messages={messages}
          onDeleteMessage={handleDeleteMessage}
        />
      </div>
    </div>
  );
};
export default Messages;
