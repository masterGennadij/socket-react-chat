import React, { useRef, useCallback } from "react";

// Styles
import {
  SubmitMessageFormElement,
  SubmitMessageFormButton,
  SubmitMessageFormInput,
} from "./styles";

const SubmitMessageForm = (props) => {
  const { sendTyping, sendMessage, isLoading } = props;
  const inputRef = useRef(null);

  const submitHandler = useCallback(
    (event) => {
      event.preventDefault();
      const input = inputRef.current;
      if (input?.value?.length > 0) {
        sendMessage(input.value);
        sendTyping(false);
        input.value = "";
      }
    },
    [inputRef, sendMessage, sendTyping]
  );

  const inputChangeHandler = useCallback(
    (event) => sendTyping(!!event.target.value),
    [sendTyping]
  );

  return (
    <SubmitMessageFormElement onSubmit={submitHandler}>
      <SubmitMessageFormInput
        placeholder="Enter message"
        onKeyDown={inputChangeHandler}
        tabIndex="0"
        type="text"
        ref={inputRef}
      />
      <SubmitMessageFormButton isLoading={isLoading} onClick={submitHandler}>
        <i className={"material-icons"}>send</i>
      </SubmitMessageFormButton>
    </SubmitMessageFormElement>
  );
};

export default SubmitMessageForm;
