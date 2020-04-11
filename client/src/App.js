import React, { useEffect, useRef, useCallback, useState } from "react";
import {
  MessageBox,
  ChatItem,
  ChatList,
  SystemMessage,
  MessageList,
  Input,
  Button,
  Avatar,
  Navbar,
  SideBar,
  Dropdown,
  Popup,
} from "react-chat-elements";
import "react-chat-elements/dist/main.css";
import socket from "./socket";
import "./App.css";

function App() {
  const socketClient = useRef();
  const [name, setName] = useState("");
  const [messageValue, setMessageVale] = useState("");
  const [messages, setMessages] = useState([]);
  const [isRegistered, setRegistered] = useState(null);
  const [user, setUser] = useState(null);
  const inputRef = useRef(null);

  const socketMessageHandler = useCallback(
    (data) => {
      if (data?.type?.includes("message")) {
        const messageType = data.type.split(":")[1];
        setMessages((prevMessages) => [
          ...prevMessages,
          {
            author: data.author,
            type: messageType,
            text: data.message,
            date: data.date ? new Date(data.date) : new Date(),
          },
        ]);
      }
    },
    [user]
  );

  useEffect(() => {
    socketClient.current = socket();
    socketClient.current.registerMessageHandler(socketMessageHandler);
  }, [socketClient]);

  const registerHandler = useCallback(
    (name) => {
      if (!name) return;
      socketClient.current.register(name, (user, error) => {
        if (error) {
          console.log("error", error);
          return error;
        }
        setRegistered(true);
        setUser(user.id);
      });
    },
    [socketClient, isRegistered]
  );

  const sendMessageHandler = useCallback(() => {
    if (!messageValue) return;
    socketClient.current.sendMessage(messageValue);
  }, [socketClient, messageValue]);

  const nameChangeHandler = useCallback(({ target }) => {
    setName(target.value);
  }, []);

  const messageChangeHandler = useCallback(({ target }) => {
    setMessageVale(target.value);
  }, []);

  return (
    <div className="App">
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
            backgroundColor: "#4ad64a",
            text: "Join",
            onClick: () => registerHandler(name),
          },
        ]}
      />
      <div className="chat-list">
        <SideBar center={<div>Sidebar</div>} />
      </div>

      <div className="right-panel">
        <MessageList
          className="message-list"
          lockable
          downButton
          dataSource={messages.map((item) => ({
            ...item,
            position: user === item.author ? "right" : "left",
          }))}
        />
        <Navbar
          center={
            <div>
              <Input
                ref={inputRef}
                placeholder="Type here..."
                multiline={true}
                onChange={messageChangeHandler}
                value={messageValue}
                onKeyPress={(e) => {
                  if (e.shiftKey && e.charCode === 13) {
                    return true;
                  }
                  if (e.charCode === 13) {
                    sendMessageHandler();
                    e.preventDefault();
                    return false;
                  }
                }}
                rightButtons={
                  <Button
                    backgroundColor="black"
                    onClick={sendMessageHandler}
                    color="white"
                    text="Send"
                  />
                }
              />
            </div>
          }
        />
      </div>
    </div>
  );
}

export default App;
