import axios from "axios";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";

const MessageDisplay = () => {
  const [messages, setMessages] = useState([]);
  const { token } = useAuth();

  useEffect(() => {
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

    fetchMessages();
  }, [token]);

  return (
    <div className="messageDisplayContainer">
      <h2>Inbox</h2>
      {messages.map((message) => (
        <div key={message.id}>
          <p>{message.sender_first_name}</p>
          <p>{message.sender_last_name}</p>
          <Link to={`/message/${message.id}`}>{message.subject}</Link>
          <p>{formatDate(message.timestamp)}</p>
          {/* fix this */}
          <p>{message.is_read}</p>
          <p>Delete Message</p>
        </div>
      ))}
    </div>
  );
};

export default MessageDisplay;
