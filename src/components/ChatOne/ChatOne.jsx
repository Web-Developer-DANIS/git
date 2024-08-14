import React, { useState, useEffect, useRef } from "react";
import uuid4 from "uuid4";
import chatOneAvatar from "../../assets/icons/ava.svg";
import photo from "../../assets/icons/image.svg";
import send from "../../assets/icons/send.svg";
import "./ChatOne.css"; // Убедитесь, что путь к CSS файлу корректен

const ChatOne = ({ chat, setChat }) => {
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
        chatOne: true,
        chatTwo: false,
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
          chatOne: true,
          chatTwo: false,
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
    <div className="chat__one">
      <div className="top">
        <div className="chat__one-top">
          <div className="chat__one-image">
            <img src={chatOneAvatar} alt="Chat One Avatar" />
          </div>
          <div className="chat__one-information">
            <h3 className="chat__one-title">Александр</h3>
            <p className="chat__one-text">Онлайн</p>
          </div>
        </div>
      </div>
      <div className="chat__one-center">
        {chat.map((message) => (
          <div
            key={message.id}
            className={`chat__one-message ${message.chatOne ? "chat-one" : "chat-two"}`}
          >
            {message.image ? (
              <img src={message.image} alt="Uploaded" className="chat__image" />
            ) : (
              message.message
            )}
          </div>
        ))}
      </div>
      <div className="chat__one-bottom">
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
          className="chat__one-input"
        />
        <div className="chat__one-actions">
          <button className="chat__one-button" onClick={handleFileUpload}>
            <img src={photo} alt="Photo" />
          </button>
          <input
            type="file"
            ref={fileInputRef}
            style={{ display: "none" }}
            onChange={handleFileChange}
            accept="image/*"
          />
          <button onClick={handleSendMessage} className="chat__one-button">
            <img src={send} alt="Send" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatOne;
