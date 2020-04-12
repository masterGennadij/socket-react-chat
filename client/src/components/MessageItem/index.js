import React, { memo } from "react";

// Styles
import {
  MessageItemWrapper,
  MessageItemAvatar,
  MessageItemValue,
} from "./styles";

const MessageItem = ({ message, user }) => {
  const { avatar, message: content, type, author } = message;
  const isSystemMessage = type?.includes("system");
  const isOwnMessage = user === author;

  return (
    <MessageItemWrapper
      isSystemMessage={isSystemMessage}
      isOwnMessage={isOwnMessage}
    >
      {avatar && <MessageItemAvatar src={avatar} alt="avatar" />}
      <MessageItemValue
        isSystemMessage={isSystemMessage}
        isOwnMessage={isOwnMessage}
      >
        {content}
      </MessageItemValue>
    </MessageItemWrapper>
  );
};

export default memo(MessageItem);
