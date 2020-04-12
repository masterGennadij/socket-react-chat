import React, { useState, useCallback } from "react";

// Components
import SubmitMessageForm from "../SubmitMessageForm";
import TypingIndicator from "../TypingIndicator";
import MessageList from "../MessageList";

// Styles
import {
  ChatBoxMessageFormWrapper,
  ChatBoxContainer,
  ChatBoxWrapper,
} from "./styles";

const ChatBox = (props) => {
  const { typingUsers, user, sendTyping } = props;
  const [isLoading, setLoading] = useState(false);

  const sendMessage = useCallback(
    (message) => {
      setLoading(true);
      props.sendMessage(message);
      setTimeout(() => {
        setLoading(false);
      }, 400);
    },
    [props.sendMessage]
  );

  return (
    <ChatBoxWrapper>
      <ChatBoxContainer>
        <MessageList user={user} messages={props.messages} />
        <ChatBoxMessageFormWrapper>
          <TypingIndicator typingUsers={typingUsers} user={user} />
          <SubmitMessageForm
            sendMessage={sendMessage}
            sendTyping={sendTyping}
            isLoading={isLoading}
          />
        </ChatBoxMessageFormWrapper>
      </ChatBoxContainer>
    </ChatBoxWrapper>
  );
};

export default ChatBox;
