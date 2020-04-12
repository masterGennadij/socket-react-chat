import React, { useEffect, useRef, useCallback, useState } from "react";
import { Input, Popup } from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import socket from "./socket";

// Components
import ChatBox from "./components/ChatBox";

const App = () => {
  const socketClient = useRef();
  const [name, setName] = useState("");
  const [messages, setMessages] = useState([]);
  const [isRegistered, setRegistered] = useState(null);
  const [user, setUser] = useState(null);
  const [typingUsers, setTypingUsers] = useState([]);

  const socketMessageHandler = useCallback((data) => {
    if (data?.type?.includes("message")) {
      const messageType = data.type.split(":")[1];
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          ...data,
          type: messageType,
          date: data.date ? new Date(data.date) : new Date(),
        },
      ]);
    }
  }, []);

  const socketTypingsHandler = useCallback((typingsUsersData) => {
    setTypingUsers(typingsUsersData);
  }, []);

  useEffect(() => {
    socketClient.current = socket();
    socketClient.current.registerEventsHandlers({
      onTypingsReceved: socketTypingsHandler,
      onMessageReceived: socketMessageHandler,
    });
  }, [socketClient]);

  const registerHandler = useCallback(
    (name) => {
      if (!name) return;
      socketClient.current.register(name, (user, error) => {
        if (error) {
          return error;
        }
        setRegistered(true);
        setUser(user.id);
      });
    },
    [socketClient, isRegistered]
  );

  const sendMessageHandler = useCallback(
    (messageContent) => {
      if (!messageContent) return;
      socketClient.current.sendMessage(messageContent);
    },
    [socketClient]
  );

  const sendTypingStateHandler = useCallback(
    (isTyping) => {
      if (
        (!isTyping && typingUsers.find((item) => item.id === user)) ||
        (isTyping && !typingUsers.find((item) => item.id === user))
      ) {
        socketClient.current.sendTypingState(isTyping);
      }
    },
    [socketClient, typingUsers, user]
  );

  const nameChangeHandler = useCallback(({ target }) => {
    setName(target.value);
  }, []);

  return (
    <>
      <Popup
        show={!isRegistered}
        header="Enter name to join the chat"
        text={
          <div>
            <Input
              placeholder="Type here..."
              value={name}
              onChange={nameChangeHandler}
              inputStyle={{ border: "1px solid #333" }}
            />
          </div>
        }
        footerButtons={[
          {
            color: "white",
            backgroundColor: "#4870df",
            text: "Join",
            onClick: () => registerHandler(name),
          },
        ]}
      />
      <ChatBox
        sendMessage={sendMessageHandler}
        typingUsers={typingUsers}
        sendTyping={sendTypingStateHandler}
        messages={messages}
        user={user}
      />
    </>
  );
};

export default App;
