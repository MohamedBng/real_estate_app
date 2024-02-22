import React from 'react';
import styled from 'styled-components';
import PropertyCard from './PropertyCard';

const CardsContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  width: 95%;
  max-width: 111rem;
  margin: 0 auto;
  margin-top: 5rem;
  justify-content: center;
  gap: 1rem;

  @media (min-width: 768px) and (max-width: 1024px) {
      justify-content: center;
  };
`;

const PropertyCards = ({ properties }) => {
  return (
    <CardsContainer>
      {properties.map((property, index) => (
        <PropertyCard
          key={index}
          id={property.id}
          image={property.photos && property.photos[0].url}
          price={property.price}
          name={property.title && property.title["en"]}
          address={`${property.street}, ${property.city}`}
          bedrooms={property.bedrooms}
          bathrooms={property.bathrooms}
          area={property.area}
        />
      ))}
    </CardsContainer>
  );
};

export default PropertyCards;
