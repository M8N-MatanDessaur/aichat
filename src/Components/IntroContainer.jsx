import React from "react";
import styled from "styled-components";
import simpl from "../logo.png";

export default function IntroContainer() {
    return (
        <Container>
            <Image src={simpl} alt="simpl logo" width="200px" height="200px" />
            <Title>simpl</Title>
            <SubTitle>The simple ai chatbot <br /> chat or ask questions <br />as if you spoke to a person</SubTitle>
            <Exemples>
                <Exemple>How can I ask a girl out ?</Exemple>
                <Exemple>What is the meaning of life ?</Exemple>
                <Exemple>What is the capital of France ?</Exemple>
                <Exemple>What is the element C</Exemple>
                <Exemple>Where can I buy cheap shoes</Exemple>
            </Exemples>
            <ResetButton onClick={()=>window.location.reload()}>
                <svg fill="none" stroke-linecap="round" stroke-linejoin="round" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path d="M19.734 16.06a8.923 8.923 0 0 1-3.915 3.978 8.706 8.706 0 0 1-5.471.832 8.795 8.795 0 0 1-4.887-2.64 9.067 9.067 0 0 1-2.388-5.079 9.136 9.136 0 0 1 1.044-5.53 8.904 8.904 0 0 1 4.069-3.815 8.7 8.7 0 0 1 5.5-.608c1.85.401 3.366 1.313 4.62 2.755.151.16.735.806 1.22 1.781"></path>
                    <path d="m15.069 7.813 5.04.907L21 3.59"></path>
                </svg>
            </ResetButton>
        </Container>
    )
}

const Container = styled.div`
  width:50%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-bottom: 20px;

    @media (max-width: 768px) {
        display: none;
    }
`;

const Image = styled.img`
  border-radius: 50%;
  margin-bottom: 20px;
  border: 4px solid #d331e0;
`;

const Title = styled.h1` 
  font-size: 4rem;
  color: #fe4aff;

`;

const SubTitle = styled.h2`
  font-size: 0.9rem;
  color: #8446a5;
  text-align: justify;
  margin-bottom: 10px;
`;

const Exemples = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
    gap: 20px;
    flex-wrap: wrap;
    margin-top: 20px;
`;

const Exemple = styled.p`
    font-size: 0.8rem;
    color: #fff;
    text-align: justify;
    background-color: #d331e050;
    padding: 5px 10px;
    border-radius: 15px;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    &:hover {
        background-color: #fe4aff;
        font-weight: bold;
        font-size: 0.9rem;
        transform: scale(1.1);
    }
`;

const ResetButton = styled.button`
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 35px;
    border-radius: 50%;
    background-color: #d331e0;
    border: none;
    cursor: pointer;
    transition: all 0.2s ease-in-out;

    & svg {
        width: 30px;
        height: 30px;
        stroke: #fff;
        stroke-width: 2;
    }


    &:hover {
        background-color: #fe4aff;
    }
`;