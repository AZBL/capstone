import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useParams } from "react-router";
import { formatDate } from "../../utils/formatDate";
import { useNavigate } from "react-router";
import DeleteMessageButton from "./DeleteMessageButton";

const SentMessageContent = () => {
  const [message, setMessage] = useState({});
  const { token, currentUser, logout } = useAuth();
  const { messageId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!currentUser) {
      logout();
      navigate("/signin");
    }
  }, [currentUser, navigate]);

  useEffect(() => {
    const fetchMessage = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/api/messages/sent/${messageId}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        setMessage(response.data);
      } catch (error) {
        console.error("Error fetching message:", error);
      }
    };
    fetchMessage();
  }, [messageId, token]);

  const handleDelete = () => {
    navigate("/profile/sent-messages");
  };

  const isMessageLoaded = message && Object.keys(message).length > 0;

  return (
    <>
      {isMessageLoaded ? (
        <div className="messageContentContainer">
          <p className="messageDetails">
            <span>From:</span>
            {message.recipient_first_name} {message.recipient_last_name}
          </p>
          <p className="messageDetails">
            <span>Subject:</span>
            {message.subject}
          </p>

          <p className="messageDetails">
            <span>Received:</span>
            {formatDate(message.timestamp)}
          </p>
          <p className="messageDetails">
            <span>Delete:</span>
            <DeleteMessageButton
              messageId={messageId}
              onMessageDeleted={handleDelete}
            />
          </p>

          <p className="content">
            <span>Message Content</span>
            {message.content}
          </p>
        </div>
      ) : (
        <div>Loading message...</div>
      )}
    </>
  );
};
export default SentMessageContent;
