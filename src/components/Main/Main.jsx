import "./Main.css";

import { useState } from "react";
import ChatOne from "../ChatOne/ChatOne";
import ChatTwo from "../ChatTwo/ChatTwo";

const Main = () => {
  const [chat, setChat] = useState([])
  const [chatOneMessages, setChatOneMessages] = useState({});
  const [chatTwoMessages, setChatTwoMessages] = useState({});

  return (
    <main className="main">
      <section className="section__one">
        <div className="container">
          <div className="section__one-content">
            <ChatOne
            
              chat={chat}
              setChat={setChat}
              chatOneMessages={chatOneMessages}
              chatTwoMessages={chatTwoMessages}
              setChatOneMessages={setChatOneMessages}
            />
            <ChatTwo
              chat={chat}
              setChat={setChat}
              chatTwoMessages={chatTwoMessages}
              chatOneMessages={chatOneMessages}
              setChatTwoMessages={setChatTwoMessages}
            />

          </div>
        </div>
      </section>
    </main>
  );
};

export default Main;
