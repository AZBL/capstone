import { Link } from "react-router-dom";
import { formatDate } from "../utils/formatDate";
import DeleteMessageButton from "./DeleteMessageButton";

const MessageDisplay = ({ messages, onDeleteMessage }) => {
  return (
    <div className="messageDisplayContainer">
      <h2>Inbox</h2>

      {messages && messages.length > 0 ? (
        messages.map((message) => (
          <div key={message.id}>
            <p>{message.sender_first_name}</p>
            <p>{message.sender_last_name}</p>
            <Link to={`/profile/message/${message.id}`}>{message.subject}</Link>
            <p>{formatDate(message.timestamp)}</p>

            <DeleteMessageButton
              messageId={message.id}
              onMessageDeleted={() => onDeleteMessage(message.id)}
            />
          </div>
        ))
      ) : (
        <h4>No Messages</h4>
      )}
    </div>
  );
};

export default MessageDisplay;
