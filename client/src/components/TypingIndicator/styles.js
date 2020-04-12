import styled, { keyframes } from "styled-components";

const typingMessage = keyframes`
  0% {
    background-color: #606060;
  }
  50% {
    background-color: #fff;
  }
  60% {
    background-color: #606060;
  }
`;

export const TypingIndicatorWrapper = styled.div`
  position: absolute;
  top: 0;
  font-size: 10px;
  font-weight: bold;
  display: block;
`;

export const TypingIndicatorDot = styled.span`
  position: relative;
  left: 4px;
  display: inline-block;
  width: 2px;
  height: 2px;
  background-color: #606060;
  animation: ${typingMessage} 1.5s;
  animation-fill-mode: forwards;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;

  &:before,
  &:after {
    content: "";
    position: absolute;
    display: inline-block;
    width: 2px;
    height: 2px;
    background-color: #606060;
    animation: ${typingMessage} 1.5s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-timing-function: ease-in-out;
  }

  &:before {
    left: 4px;
    animation-delay: 0.5s;
  }

  &:after {
    left: 8px;
    animation-delay: 1s;
  }
`;
