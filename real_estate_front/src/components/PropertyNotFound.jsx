import React from 'react';
import styled from 'styled-components';

const PropertyNotFoundContainer = styled.div`
  color: #fff;
  text-align: center;
  padding: 1rem 0;
  width: max-content;
  display: flex;
  justify-content: space-between;
  margin-left: 18%;

  @media (max-width: 767px) {
    flex-direction: column;
    align-items: center;
    width: 90%;
    margin: 0 auto;
  }

  @media (min-width: 768px) and (max-width: 1100px) {
    width: auto;
    margin-left: 0;
  }
`;

const NotFoudImage = styled.img`
  margin: 0;
  width: 20rem;
`;

const PropertyNotFoundText = styled.div`
  margin: 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
`;

const NotFoundTitle = styled.p`
  margin: 0;
  font-size: 2rem;
  color: #3e8be4;
`;

const NotFoundSubtitle = styled.p`
  margin: 0;
  font-size: 1rem;
  color: black;
`;

const PropertyNotFound = () => {
  return (
    <PropertyNotFoundContainer>
      <NotFoudImage src="/images/house.png" alt="house" />
      <PropertyNotFoundText>
        <NotFoundTitle>Your search did not match any property</NotFoundTitle>
        <NotFoundSubtitle>Please try again with different criteria</NotFoundSubtitle>
      </PropertyNotFoundText>
    </PropertyNotFoundContainer>
  );
};

export default PropertyNotFound;
