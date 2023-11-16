import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router";
import { formatDate } from "../utils/formatDate";
import { useNavigate } from "react-router";
import DeleteMessageButton from "./DeleteMessageButton";
import MessageForm from "./MessageForm";

const MessageContent = () => {
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
        const response = await axios.get(`/api/messages/${messageId}`, {
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
    navigate("/messages");
  };

  const isMessageLoaded = message && Object.keys(message).length > 0;

  return (
    <>
      {isMessageLoaded ? (
        <div className="messageContainer">
          <h3>{message.subject}</h3>
          <p>
            From: {message.sender_first_name} {message.sender_last_name}
          </p>
          <p>Message Received: {formatDate(message.timestamp)}</p>
          <p>Message Content: {message.content}</p>

          <MessageForm parentMessage={message} />

          <DeleteMessageButton
            messageId={messageId}
            onMessageDeleted={handleDelete}
          />
        </div>
      ) : (
        <div>Loading message...</div>
      )}
    </>
  );
};

export default MessageContent;
