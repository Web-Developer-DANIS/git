import React, { useState, useEffect, useRef } from "react";
import uuid4 from "uuid4";
import chatTwoAvatar from "../../assets/icons/fotoi.svg";
import photo from "../../assets/icons/image.svg";
import send from "../../assets/icons/send.svg";
import "./ChatTwo.css"; // Убедитесь, что путь к CSS файлу корректен

const ChatTwo = ({ chat, setChat }) => {
  const [message, setMessage] = useState("");
  const fileInputRef = useRef(null);

  useEffect(() => {
    const localMessages = JSON.parse(localStorage.getItem("allMessages") || "[]");
    if (localMessages.length > 0) {
      setChat(localMessages);
    }
  }, [setChat]);

  const handleSendMessage = () => {
    if (message.trim()) {
      const newMessage = {
        id: uuid4(),
        message: message,
        chatOne: false,
        chatTwo: true,
        image: null,
      };
      const allMessages = [...chat, newMessage];

      setChat(allMessages);
      setMessage("");
      saveMessage(allMessages);
    }
  };

  const saveMessage = (allMessages) => {
    localStorage.setItem("allMessages", JSON.stringify(allMessages));
  };

  const handleFileUpload = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const newMessage = {
          id: uuid4(),
          message: "",
          chatOne: false,
          chatTwo: true,
          image: e.target.result,
        };
        const allMessages = [...chat, newMessage];
        setChat(allMessages);
        saveMessage(allMessages);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="chat__two">
      <div className="top__two">
        <div className="chat__two-top">
          <div className="chat__two-image">
            <img src={chatTwoAvatar} alt="Chat Two Avatar" />
          </div>
          <div className="chat__two-information">
            <h3 className="chat__two-title">Евгений</h3>
            <p className="chat__two-text">Онлайн</p>
          </div>
        </div>
      </div>
      <div className="chat__two-center">
        {chat.map((message) => (
          <div
            key={message.id}
            className={`chat__two-message ${message.chatTwo ? "chat-two" : "chat-one"}`}
          >
            {message.image ? (
              <img src={message.image} alt="Uploaded" className="chat__image" />
            ) : (
              message.message
            )}
          </div>
        ))}
      </div>
      <div className="chat__two-bottom">
        <input
          value={message}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              handleSendMessage();
            }
          }}
          onChange={(event) => setMessage(event.target.value)}
          type="text"
          placeholder="Type your message..."
          className="chat__two-input"
        />
        <div className="chat__two-actions">
          <button className="chat__two-button" onClick={handleFileUpload}>
            <img src={photo} alt="Photo" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*"
          />
          <button onClick={handleSendMessage} className="chat__two-button">
            <img src={send} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatTwo;
