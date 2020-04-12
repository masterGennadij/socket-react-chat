import styled, { keyframes, css } from "styled-components";

const fadeNewMessage = keyframes`
  0% {
    opacity: 0;
    transform: translateY(1rem);
  }
  100% {
    opacity: 1;
    transform: translateY(0px);
  }
`;

export const MessageItemWrapper = styled.div`
  padding: 1rem 0 0 0;
  opacity: 0;
  transition: all 0.15s ease-in-out;
  animation: ${fadeNewMessage} 0.5s;
  animation-fill-mode: forwards;
  display: flex;
  flex-direction: ${({ isOwnMessage }) =>
    isOwnMessage ? "row-reverse" : "row"};

  ${({ isSystemMessage }) =>
    isSystemMessage &&
    css`
      width: 100%;
      justify-content: center;
    `}
`;

export const MessageItemAvatar = styled.img`
  width: 40px;
  height: 40px;
  border-radius: 40px;
  image-rendering: -webkit-optimize-contrast;
  user-select: none;
`;

export const MessageItemValue = styled.div`
  position: relative;
  max-width: 50%;
  min-height: 40px;
  padding: 0.75rem;
  border-radius: 4px;
  font-size: 14px;
  line-height: 18px;
  font-weight: bold;
  box-shadow: 0px 10px 10px -8px rgba(0, 0, 0, 0.08);
  box-sizing: border-box;
  overflow: hidden;
  text-overflow: ellipsis;
  margin: 0 1rem 0 0;
  background-color: #fafafa;
  text-align: right;

  &:after {
    content: "";
    position: absolute;
    top: 14px;
    right: -8px;
    width: 0;
    height: 0;
    border-style: solid;
    border-width: 6px 0 6px 10px;
    border-color: transparent transparent transparent #fafafa;
  }

  ${({ isOwnMessage }) =>
    !isOwnMessage &&
    css`
      text-align: left;
      margin: 0 0 0 1rem;
      color: #fff;
      background-color: #4870df;

      &:after {
        display: none;
      }

      &:before {
        content: "";
        position: absolute;
        top: 14px;
        left: -8px;
        width: 0;
        height: 0;
        border-style: solid;
        border-width: 6px 10px 6px 0;
        border-color: transparent #4870df transparent transparent;
      }
    `}

  ${({ isSystemMessage }) =>
    isSystemMessage &&
    css`
      box-shadow: none;
      white-space: nowrap;
      max-width: 100%;
      background-color: transparent;
      color: #727272;
      font-size: 13px;

      &:before {
        display: none;
      }
    `}
`;
