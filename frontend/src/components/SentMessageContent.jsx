import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router";
import { formatDate } from "../utils/formatDate";
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
        const response = await axios.get(`/api/messages/sent/${messageId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        setMessage(response.data);
      } catch (error) {
        console.error("Error fetching message:", error);
      }
    };
    fetchMessage();
  }, [messageId, token]);

  const handleDelete = () => {
    navigate("/sent-messages");
  };

  return (
    <>
      <div className="messageContainer">
        <h3>{message.subject}</h3>
        <p>
          To: {message.recipient_first_name} {message.recipient_last_name}
        </p>
        <p>Message Sent: {formatDate(message.timestamp)}</p>
        <p>Message Content: {message.content}</p>
      </div>
      <DeleteMessageButton
        messageId={messageId}
        onMessageDeleted={handleDelete}
      />
    </>
  );
};
export default SentMessageContent;
