import React from 'react';
import styled from 'styled-components';

const AdvantageSectionContainer = styled.section`
    display: flex;
    justify-content: space-between;
    padding: 2rem;
    width: 90%;
    max-width: 111rem;
    margin: 0 auto;
    margin-top: 10rem;
    margin-bottom: 10rem;

    @media (max-width: 767px) {
      margin-top: 0rem;
      margin-bottom: 5rem;
      padding: 0;
    }

    @media (min-width: 768px) and (max-width: 1024px) {
      padding: 0;
    }
`;

const AdvantageTextContainer = styled.div`
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
    margin-bottom: 8rem;
    width: 69%;
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 3rem;
    padding-top: 0;
    margin-top: 0;

    @media (max-width: 767px) {
      width: auto;
    }

    @media (min-width: 768px) and (max-width: 1024px) {
      width: 90%;
      margin-bottom: 1rem;
    }
`;

const AdvantageList = styled.ul`
  list-style: none;
  padding: 0;
  margin-bottom: 2rem;

  @media (min-width: 768px) and (max-width: 1024px) {
    margin-bottom: 0;
  }
`;

const AdvantageItem = styled.li`
    display: flex;
    align-items: center;
    margin-bottom: 1rem;
    font-size: medium;
`;

const Icon = styled.img`
  margin-right: 10px;
  width: 1rem;
`;

const Button = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    padding: 10px 20px;
    margin-top: 1rem;
    cursor: pointer;
    border-radius: 5px;
    font-size: 1rem;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 21rem;
    padding: 1rem;

    &:hover {
      background-color: #0069d9;
      border-color: #0062cc;
    }

    @media (min-width: 768px) and (max-width: 1024px) {
      margin-top: 0.5rem;
    }
`;

const ButtonIcon = styled.img`
    margin-right: 10px;
    width: 3rem;
`;

const ImageContainer = styled.div`
    max-width: 50%;
    overflow: hidden;
    height: 26rem;

    @media (max-width: 767px) {
      display: none;
    }
`;

const Image = styled.img`
  width: 100%;
  object-fit: cover;
`;

const AdvantageSection = () => {
  const advantages = [
    { text: "0% Property Tax", icon: "/images/validate-icon.svg" },
    { text: "0% Commission Fee", icon: "/images/validate-icon.svg" },
    { text: "0% Interest Rate For Payment Installments", icon: "/images/validate-icon.svg" },
    { text: "10% Booking Amount", icon: "/images/validate-icon.svg" },
    { text: "Payment With Cryptocurrency", icon: "/images/validate-icon.svg" }
  ];

  return (
    <AdvantageSectionContainer>
      <AdvantageTextContainer>
        <Title>Plus qu'une maison, plus qu'un foyer.</Title>
        <AdvantageList>
          {advantages.map((advantage, index) => (
            <AdvantageItem key={index}>
              <Icon src={advantage.icon} alt="" />
              {advantage.text}
            </AdvantageItem>
          ))}
        </AdvantageList>
        <Button>
            En Savoir Plus
            <ButtonIcon src="/images/arrow-icon-simple-white.svg" alt="Icon" />
        </Button>
      </AdvantageTextContainer>
      <ImageContainer>
        <Image src="/images/house_near_threes.svg" alt="house near threes" />
      </ImageContainer>
    </AdvantageSectionContainer>
  );
};

export default AdvantageSection;
