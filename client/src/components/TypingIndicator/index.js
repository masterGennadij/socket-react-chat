import React from "react";

// Styles
import { TypingIndicatorWrapper, TypingIndicatorDot } from "./styles";

const TypingIndicator = (props) => {
  let typersDisplay = "";
  let countTypers = 0;

  props.typingUsers.forEach((typingUser) => {
    if (typingUser.id !== props.user) {
      typersDisplay += `, ${typingUser.name}`;
      countTypers++;
    }
  });

  if (!countTypers) return null;

  typersDisplay = typersDisplay.substr(1);
  typersDisplay += countTypers > 1 ? " are " : " is ";

  return (
    <TypingIndicatorWrapper isVisible={props.isVisible}>
      {typersDisplay} writing
      <TypingIndicatorDot />
    </TypingIndicatorWrapper>
  );
};

export default TypingIndicator;
