import { Link } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import MessageDisplay from "./MessageDisplay";

// MessageList and MessageDetail components would be imported if they've been created.

const Messages = () => {
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  // State and functions for handling message actions (like delete, mark as read, etc.) would go here.

  useEffect(() => {
    if (!currentUser) {
      logout();
      navigate("/signin");
      // should i also automatically log out here as well?
    }
  }, [currentUser, navigate]);

  // does below need to be here?
  // const handleMessageSent = (data) => {
  //   console.log("Message sent:", data);
  //   setMessageSent(true);
  // };

  // option to delete a message

  // logic for obtaining parent Message id?

  return (
    <>
      <h1>Messages</h1>
      <Link to="/send-message">Compose New Message</Link>
      <div>
        <MessageDisplay />
      </div>
    </>
  );
};
export default Messages;
