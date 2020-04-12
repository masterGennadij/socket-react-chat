import React, { useEffect, useRef, useCallback, useState } from "react";
import { Input, Popup } from "react-chat-elements";
import GoogleLogin from "react-google-login";
import "react-chat-elements/dist/main.css";
import socket from "./socket";

// Components
import ChatBox from "./components/ChatBox";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;

const App = () => {
  const socketClient = useRef();
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
    (userObject) => {
      if (!userObject?.name) return;
      socketClient.current.register(userObject, (user, error) => {
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

  const googleAuthHandler = useCallback(
    (result) => {
      if (result?.error) return;
      if (result.profileObj) {
        const { name, imageUrl } = result.profileObj;
        registerHandler({ name, image: imageUrl });
      }
    },
    [registerHandler]
  );

  return (
    <>
      <Popup
        show={!isRegistered}
        header="Login with google to join the chat"
        text={
          <GoogleLogin
            clientId={GOOGLE_CLIENT_ID}
            buttonText="Login"
            onSuccess={googleAuthHandler}
            onFailure={googleAuthHandler}
            cookiePolicy={"single_host_origin"}
            className="full-width"
            isSignedIn
          />
        }
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
