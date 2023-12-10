import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../../contexts/AuthContext";
import UserSearch from "../UserSearch";

const MessageForm = ({ parentMessage, initialSubject }) => {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState(initialSubject || "");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { currentUser, token, logout } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      logout();
      navigate("/signin");
    }

    if (parentMessage) {
      setRecipient(parentMessage.sender_id);
      setSubject(`Re: ${parentMessage.subject}`);
    }
  }, [currentUser, navigate, parentMessage]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!recipient) {
      alert("Please select a recipient.");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/messages/send_message`,
        {
          recipient_id: recipient,
          subject,
          content,
          parent_message_id: parentMessage ? parentMessage.id : null,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log(response.data);

      setRecipient("");
      setSubject("");
      setContent("");
      navigate("/profile/messages");
      //   or show a success message?
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <form className="messageFormContainer" onSubmit={handleSubmit}>
      {parentMessage ? (
        <p>
          Replying to: {parentMessage.sender_first_name}{" "}
          {parentMessage.sender_last_name}
        </p>
      ) : (
        <UserSearch onUserSelect={setRecipient} />
      )}
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
        required
      />
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <button className="messageButton" type="submit">
        Send Message
      </button>
    </form>
  );
};
export default MessageForm;
