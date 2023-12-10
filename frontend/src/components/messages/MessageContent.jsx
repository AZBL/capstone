import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../../contexts/AuthContext";
import { useParams } from "react-router";
import { formatDate } from "../../utils/formatDate";
import { useNavigate } from "react-router";
import DeleteMessageButton from "./DeleteMessageButton";
import MessageForm from "./MessageForm";

const MessageContent = () => {
  const [message, setMessage] = useState({});
  const [showReplyForm, setShowReplyForm] = useState(false);

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
          `${import.meta.env.VITE_API_URL}/api/messages/${messageId}`,
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
    navigate("/profile/messages");
  };

  const toggleReplyForm = () => {
    setShowReplyForm(!showReplyForm);
  };

  const isMessageLoaded = message && Object.keys(message).length > 0;

  return (
    <>
      {isMessageLoaded ? (
        <div className="messageContentContainer">
          <p className="messageDetails">
            <span>From:</span>
            {message.sender_first_name} {message.sender_last_name}
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

          {!showReplyForm ? (
            <button
              className="messageButton replyButton"
              onClick={toggleReplyForm}
            >
              Send Reply
            </button>
          ) : (
            <>
              <button
                className="messageButton replyButton"
                onClick={toggleReplyForm}
              >
                Cancel
              </button>
              {showReplyForm && <MessageForm parentMessage={message} />}
            </>
          )}
        </div>
      ) : (
        <div>Loading message...</div>
      )}
    </>
  );
};

export default MessageContent;
