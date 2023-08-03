import React, { useEffect, useRef, useState } from "react";
import styled, {keyframes} from "styled-components";
import axios from "axios";
import { BeatLoader } from 'react-spinners';

export default function App() {
  const [userInput, setUserInput] = useState(''); // for storing the user's input
  const [conversation, setConversation] = useState([{ by: 'ai', text: 'Hello, I am an simplAI. I am here to help you with your questions.' }]); // to store the conversation history
  const lastMessageRef = useRef(null);
  const textViewRef = useRef(null);
  const [loading, setLoading] = useState(false);

  // Scroll to the bottom of the TextView every time the conversation changes
  useEffect(() => {
    if (lastMessageRef.current) {
      lastMessageRef.current.scrollIntoView({ behavior: "smooth", block: "end", inline: "nearest" });
    }
  }, [conversation]);

  const handleSend = async (event) => {
    event.preventDefault(); // prevent page refresh
    // Save user input to a temporary variable
    const userMessage = userInput;
    // Add user message to conversation
    setConversation((prevConversation) => [...prevConversation, { by: 'user', text: userMessage }]);
    // Clear user input
    setUserInput('');
    // Convert the conversation array to a string in the required format
    const conversationHistory = conversation.map(message => `${message.by === 'ai' ? 'AI' : 'User'}: ${message.text}`).join('\n');
    setLoading(true);
    try {
      const response = await axios.get(`.netlify/functions/aichat?input=${userMessage}&history=${encodeURIComponent(conversationHistory)}`);
      // Check if data exists and add AI message to conversation
      if (response.data && response.data.output) {
        const aiMessage = response.data.output;
        setConversation((prevConversation) => [...prevConversation, { by: 'ai', text: aiMessage }]);
      } else {
        setConversation((prevConversation) => [...prevConversation, { by: 'ai', text: 'Oops... Something happened, try again' }]);
      }
      setLoading(false);
    } catch (error) {
      console.error("Error:", error);
      setConversation((prevConversation) => [...prevConversation, { by: 'ai', text: 'Oops... Something happened, try again' }]);
      setLoading(false); 
    }
  };
  
  return (
    <ViewContainer>
    <ChatContainer>
      <TextView>
        {conversation.map((message, index) => (
          <MessageRef key={index} ref={index === conversation.length - 1 ? lastMessageRef : null}>
            {message.by === 'ai' ? (
              <AiText><p>{message.text}</p></AiText>
            ) : (
              <UserText><p>{message.text}</p></UserText>
            )}
          </MessageRef>
        ))}
        {loading && 
          <BeatLoader 
            color={"#442f70"} 
            loading={loading} 
            size={8} 
          />
        }
      </TextView>
      <UserInput onSubmit={handleSend}>
        <UserInputText
          value={userInput}
          onChange={(e) => setUserInput(e.target.value)}
          onFocus={(e) => {
            const { scrollX, scrollY } = window;
            e.target.onblur = () => window.scrollTo(scrollX, scrollY);
          }}
        />
        <SendButton type="submit">
          <svg fill="none" strokeLinecap="round" strokeLinejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.912 12H4L2.023 4.135A.662.662 0 0 1 2 3.995c-.022-.721.772-1.221 1.46-.891L22 12 3.46 20.896c-.68.327-1.464-.159-1.46-.867a.66.66 0 0 1 .033-.186L3.5 15"></path>
          </svg>
        </SendButton>
      </UserInput>
    </ChatContainer>
  </ViewContainer>
);
}

const ViewContainer = styled.div`
  width: 100%;
  height: 100svh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  overflow: hidden;

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
  height: 100%;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-bottom: 25px;
  gap: 10px;

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
`;

const UserInput = styled.form`
  position: static;
  width: 100%;
  height: 60px;
  padding: 0 10px;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  gap: 10px;
`;

const UserInputText = styled.input`
  width: 80%;
  height: inherit;
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
  height: inherit;
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

const MessageRef = styled.div`
width: 100%	;
height: max-content;
display: flex;
flex-direction: column;
align-items: center;
`;

const typing = keyframes`
  0% { opacity: 0; }
  100% { opacity: 1; }
`;

const AiText = styled.div`
  width: 100%;
  max-width: 60%;
  color: #FFFFFF;
  font-size: 1.2rem;
  font-weight: 500;
  outline: none;
  align-self: flex-start;

  & p {
    background-color: #6c41c380;
    padding: 5px 10px;
    border-radius: 10px;
    opacity: 0;
    margin: 0 auto 0 0;
    animation: 
      ${typing} 2s forwards;
  }
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
  align-self: flex-end;
`;
