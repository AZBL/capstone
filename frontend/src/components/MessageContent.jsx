import { useEffect, useState } from "react";
import axios from "axios";
import { useAuth } from "../contexts/AuthContext";
import { useParams } from "react-router";
import { formatDate } from "../utils/formatDate";
import { useNavigate } from "react-router";

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

  return (
    <>
      <div className="messageContainer">
        <h3>{message.subject}</h3>
        <p>
          From: {message.sender_first_name} {message.sender_last_name}
        </p>
        <p>Sent: {formatDate(message.timeStamp)}</p>
        <p>{message.content}</p>
      </div>
      <div>
        Add link to Send Reply; clicking should open text box (reply component)
      </div>
    </>
  );
};
export default MessageContent;
