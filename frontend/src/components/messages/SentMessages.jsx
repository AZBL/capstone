import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";
import { formatDate } from "../../utils/formatDate";
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
    <div className="messagesContainer">
      <h3>{currentUser.first_name}'s Sent Messages</h3>
      <div className="composeSendContainer">
        <Link to="/profile/send-message">Compose New Message</Link>
        <Link to="/profile/messages">View Inbox</Link>
      </div>

      <div className="messageDisplayContainer">
        <div className="gridContainer">
          <div className="gridHeader">To:</div>
          <div className="gridHeader">Subject:</div>
          <div className="gridHeader">Date:</div>
          <div className="gridHeader">Delete:</div>
          {sentMessages.map((sentMessage) => (
            <div className="gridRow" key={sentMessage.id}>
              <Link to={`/profile/sent-message/${sentMessage.id}`}>
                {sentMessage.recipient_first_name}
                {sentMessage.recipient_last_name}
              </Link>

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
      </div>
    </div>
  );
};
export default SentMessages;
