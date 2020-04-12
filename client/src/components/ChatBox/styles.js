import styled from "styled-components";

export const ChatBoxWrapper = styled.div`
  display: flex;
  align-content: flex-start;
  justify-content: center;
  width: 100%;
  height: 100%;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

export const ChatBoxContainer = styled.div`
  flex-grow: 1;
  flex-shrink: 1;
  flex-basis: 0;
  max-width: 800px;
  margin: 0;
  box-shadow: 0 35px 20px -30px rgba(0, 0, 0, 0.1);

  @media (max-width: 768px) {
    flex-basis: 100%;
    min-width: auto;
    width: 100%;
    margin: 0;
    height: 100%;
  }
`;

export const ChatBoxMessageFormWrapper = styled.div`
  position: relative;
  background-color: #fff;
  padding: 1rem;
`;
