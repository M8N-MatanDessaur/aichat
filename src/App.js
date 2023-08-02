import React, { useEffect, useState } from "react";
import styled from "styled-components";
import axios from "axios";

export default function App() {
  const [userInput, setUserInput] = useState(''); // for storing the user's input
  const [conversation, setConversation] = useState([{ by: 'ai', text: 'Hello, I am an AI chatbot. I am here to help you with your questions. Ask me anything.' }]); // to store the conversation history

  const handleSend = async (event) => {
    event.preventDefault(); // prevent page refresh
    // Add user message to conversation
    setConversation((prevConversation) => [...prevConversation, { by: 'user', text: userInput }]);

    try {
      const response = await axios.get(`.netlify/functions/aichat?input=${userInput}`);

      // Check if data exists and add AI message to conversation
      if (response.data && response.data.output) {
        const aiMessage = response.data.output;
        setConversation((prevConversation) => [...prevConversation, { by: 'ai', text: aiMessage }]);
      } else {
        setConversation((prevConversation) => [...prevConversation, { by: 'ai', text: 'Oops... Something happened, try again' }]);
      }
      // Clear user input
      setUserInput('');
    } catch (error) {
      console.error("Error:", error);
      setUserInput('');
    }
  };

  return (
    <ViewContainer>
      <ChatContainer>
        <TextView>
        {conversation.map((message, index) => message.by === 'ai' ? (
          <AiText key={index}>{message.text}</AiText>
        ) : (
          <UserText key={index}>{message.text}</UserText>
        ))}
        </TextView>
          <UserInput onSubmit={handleSend}>
            <UserInputText value={userInput} onChange={(e) => setUserInput(e.target.value)} />
            <SendButton type="submit">
              <svg fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.912 12H4L2.023 4.135A.662.662 0 0 1 2 3.995c-.022-.721.772-1.221 1.46-.891L22 12 3.46 20.896c-.68.327-1.464-.159-1.46-.867a.66.66 0 0 1 .033-.186L3.5 15"></path>
              </svg>
            </SendButton>
          </UserInput>
      </ChatContainer>
    </ViewContainer>
  );
};


const ViewContainer = styled.div`
  width: 100%;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  background-color: #1c1c1c;
`;

const ChatContainer = styled.div`
  position: relative;
  width: 80%;
  height: 90%;
  border: 1px solid #FFFFFF30;
  border-radius: 10px;

  &::-webkit-scrollbar {
    width: 10px;
  }

  &::-webkit-scrollbar-track {
    background: #FFFFFF10;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb {
    background: #FFFFFF30;
    border-radius: 10px;
  }

  &::-webkit-scrollbar-thumb:hover {
    background: #FFFFFF50;
  }

  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  padding: 35px;

  @media (max-width: 560px) {
    width: 100%;
    height: 100%;
    border: none;
    border-radius: 0;
    padding: 25px;
  }
    
`;

const TextView = styled.div`
  width: 100%;
  height: 90%;
  overflow-y: scroll;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 10px;
`;

const UserInput = styled.form`
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 10%;
  border-top: 1px solid #FFFFFF30;
  padding: 0 10px;

  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const UserInputText = styled.input`
  width: 80%;
  height: 80%;
  border: none;
  border-radius: 12px;
  padding: 0 10px;
  background-color: #FFFFFF20;
  color: #FFFFFF;
  font-size: 1.2rem;
  font-weight: 500;
  outline: none;

  &::placeholder {
    color: #FFFFFF80;
  }

  &:focus {
    background-color: #FFFFFF30;
  }
`;

const SendButton = styled.button`
  width: 20%;
  height: 80%;
  border: none;
  border-radius: 12px;
  background-color: #FFFFFF20;
  color: #FFFFFF;
  font-size: 1.2rem;
  font-weight: 500;
  outline: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    background-color: #FFFFFF30;

    & svg {
      stroke: #FFFFFF;
      transition: stroke 0.5s ease-in-out;
      transform: scale(1.1);
    }
  }

  &:active {
    background-color: #FFFFFF80;
  }

  & svg {
    width: 40%;
    height: 40%;
    stroke: #FFFFFF60;
  }
`;

const AiText = styled.div`
  width: max-content;
  max-width: 60%;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #6c41c380;
  color: #FFFFFF;
  font-size: 1.2rem;
  font-weight: 500;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
`;

const UserText = styled.div`
width: max-content;
max-width: 60%;
  border-radius: 10px;
  padding: 5px 10px;
  background-color: #FFFFFF20;
  color: #FFFFFF;
  font-size: 1.2rem;
  font-weight: 500;
  outline: none;
  display: flex;
  align-items: center;
  justify-content: center;
  align-self: flex-end;
`;
