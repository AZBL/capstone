import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useAuth } from "../contexts/AuthContext";
import { useEffect } from "react";
import UserSearch from "./UserSearch";

const MessageForm = ({ parentMessageId }) => {
  const [recipient, setRecipient] = useState("");
  const [subject, setSubject] = useState("");
  const [content, setContent] = useState("");
  const navigate = useNavigate();
  const { currentUser, token } = useAuth();

  useEffect(() => {
    if (!currentUser) {
      navigate("/signin");
    }
  }, [currentUser, navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // switch from simple alert to something else?
    if (!recipient) {
      alert("Please select a recipient.");
      return;
    }

    try {
      const response = await axios.post(
        "/messages/send_message",
        {
          recipient_id: recipient,
          subject,
          content,
          parent_message_id: parentMessageId,
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
      navigate("/messages");
      //   or show a success message?
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* <input
        type="text"
        value={recipient}
        onChange={(e) => setRecipient(e.target.value)}
        placeholder="Recipient ID"
        required
      /> */}
      <UserSearch setRecipient={setRecipient} />
      <input
        type="text"
        value={subject}
        onChange={(e) => setSubject(e.target.value)}
        placeholder="Subject"
        required
      />{" "}
      <textarea
        value={content}
        onChange={(e) => setContent(e.target.value)}
        placeholder="Content"
        required
      />
      <button type="submit">Send Message</button>
    </form>
  );
};
export default MessageForm;
