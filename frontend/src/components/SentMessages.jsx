import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import DeleteMessageButton from "./DeleteMessageButton";

const SentMessages = () => {
  const [sentMessages, setSentMessages] = useState([]);
  const { currentUser, token, logout } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      logout();
      navigate("/signin");
    } else {
      fetchSentMessages();
    }
  }, [currentUser, token, navigate]);

  const fetchSentMessages = async () => {
    try {
      const response = await axios.get("/api/messages/sent", {
        headers: { Authorization: `Bearer ${token}` },
      });
      setSentMessages(response.data);
    } catch (error) {
      console.error("Error fetching sent messages:", error);
    }
  };

  const handleDeleteMessage = (messageId) => {
    setSentMessages((currentMessages) =>
      currentMessages.filter((msg) => msg.id !== messageId)
    );
  };

  return (
    <div className="messageDisplayContainer">
      <h2>Sent Messages</h2>
      {sentMessages.map((sentMessage) => (
        <div key={sentMessage.id}>
          <p>{sentMessage.recipient_first_name}</p>
          <p>{sentMessage.recipient_last_name}</p>
          <Link to={`/profile/sent-message/${sentMessage.id}`}>
            {sentMessage.subject}
          </Link>
          <p>{formatDate(sentMessage.timestamp)}</p>

          <DeleteMessageButton
            messageId={sentMessage.id}
            onMessageDeleted={() => handleDeleteMessage(sentMessage.id)}
          />
        </div>
      ))}
    </div>
  );
};
export default SentMessages;
