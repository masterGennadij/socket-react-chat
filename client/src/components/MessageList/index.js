import React, { memo } from "react";
import MessageItem from "../MessageItem";

// Styles
import { MessageListWrapper } from "./styles";

const MessageList = (props) => {
  const { user, messages } = props;

  return (
    <MessageListWrapper>
      {messages
        .slice(0)
        .reverse()
        .map((message) => (
          <MessageItem key={message.id} user={user} message={message} />
        ))}
    </MessageListWrapper>
  );
};

export default memo(MessageList);
