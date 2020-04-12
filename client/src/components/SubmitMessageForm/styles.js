import styled, { css, keyframes } from "styled-components";

const loadSendMessage = keyframes` 
  0% {
    opacity: 1;
    width: 4px;
    height: 4px;
  }
  100% {
    opacity: 0;
    width: 100%;
    height: 100%;
  }
`;

export const SubmitMessageFormElement = styled.form`
  display: flex;
`;

export const SubmitMessageFormButton = styled.div`
  position: relative;
  width: 40px;
  height: 40px;
  cursor: pointer;
  padding: 8px;
  border-radius: 30px;
  color: #fff;
  background-color: #4870df;
  text-align: center;
  box-shadow: 0px 14px 10px -8px rgba(0, 0, 0, 0.2);
  transition: 0.15s all ease-in-out;
  box-sizing: border-box;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;

  &:hover {
    background-color: #3c559c;
  }

  i {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
    padding: 0 0 0 1px;
    font-size: 22px;
  }

  ${({ isLoading }) =>
    isLoading &&
    css`
      cursor: wait;
      background-color: #4870df;
      &:hover {
        background-color: #4870df;
      }
      &:before,
      &:after {
        content: "";
        position: absolute;
        z-index: 1;
        display: block;
        left: 0;
        right: 0;
        top: 50%;
        transform: translateY(-50%);
        width: 8px;
        height: 8px;
        margin: auto;
        border-radius: 40px;
        background-color: #fff;
      }
      &:after {
        animation: ${loadSendMessage} 1.5s;
        animation-fill-mode: forwards;
        animation-iteration-count: infinite;
      }
      i {
        display: none;
      }
    `}
`;

export const SubmitMessageFormInput = styled.input`
  height: 40px;
  border: none;
  padding: 0.5rem 1rem;
  border-radius: 40px;
  margin: 0 0.5rem 0 0;
  width: calc(100% - 52px);
  background-color: #dedfed;
  box-shadow: inset 0 0 0 2px #dedfed;
  font-size: 14px;
  font-family: "Quicksand", sans-serif;
  font-weight: bold;
  transition: 0.15s all ease-in-out;
  box-sizing: border-box;

  &::placeholder {
    /* Chrome, Firefox, Opera, Safari 10.1+ */
    color: #b1b1b1;
    opacity: 1;
  }
  &:-ms-input-placeholder {
    /* Internet Explorer 10-11 */
    color: #b1b1b1;
  }
  &::-ms-input-placeholder {
    /* Microsoft Edge */
    color: #b1b1b1;
  }
  &:focus,
  &:active {
    box-shadow: inset 0 0 0 2px #7690d6;
  }
  &:focus {
    outline: none;
  }
`;
