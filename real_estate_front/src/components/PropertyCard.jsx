import React from 'react';
import styled from 'styled-components';

const PropertyCardContainer = styled.div`
    width: min-content;
    display: flex;
    flex-direction: column;
    align-items: center;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    border-radius: 1.5rem;
    overflow: hidden;
    margin-right: 1rem;
    margin-bottom: 5rem;

    @media (max-width: 767px) {
        width: 100%;
        margin-right: 0
      }
`;

const CardImageContainer = styled.div`
    width: 100%;
`;

const CardImage = styled.img`
    width: 100%;
    object-fit: cover;
    height: 10rem;
    object-position: center;
`;

const CardBody = styled.div`
    background-color: white;
    width: 17rem;
    padding-right: 1rem;
    padding-left: 1rem;
    padding-bottom: 1rem;

    @media (max-width: 767px) {
        width: 90%;
      }
`;

const CardHeader = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Price = styled.p`
    font-weight: bold;
    font-size: medium;
`;

const StyledLink = styled.a`

`;

const Icon = styled.img`
    width: 1.3rem;
`;

const Name = styled.p`
    font-weight: bold;
    font-size: medium;
    height: 2.5rem;
`;

const Adress = styled.p`
    font-size: small;
    height: 35px;
`;

const Divider = styled.hr`
    width: 100%;
    background-color: black;
    border: none;
    height: 1px;
    margin: 0 auto;
    margin-bottom: 1rem;
    margin-top: 2rem;

`;

const Options = styled.div`
    display: flex;
    justify-content: space-between;
`;

const OptionsIcons = styled.div`
    display: flex;
    align-items: center;
    gap: 5px;
`;

const OptionIcon = styled.img`
    width: 1.2rem;
`;

const Room = styled.p`
    font-size: xx-small;
`;

const Bathroom = styled.p`
    font-size: xx-small;
`;

const Area = styled.p`
    font-size: xx-small;
`;

const PropertyCard = ({ id, price, name, address, image, bedrooms, bathrooms, area }) => {
  return (
    <PropertyCardContainer>
        <CardImageContainer>
            <CardImage src={image} alt="Feature card" />
        </CardImageContainer>
        <CardBody>
            <CardHeader>
                <Price>{price}</Price>
                <StyledLink href={`/properties/${id}`}>
                    <Icon src="/images/arrow-icon.svg" alt="Détails" />
                </StyledLink>
            </CardHeader>
            <Name>{name}</Name>
            <Adress>{address}</Adress>

            <Divider />
            <Options>
                <OptionsIcons>
                    <OptionIcon src="/images/bed-icon.svg" alt="Bed" />
                    <Room>{bedrooms} Chambres</Room>
                </OptionsIcons>
                <OptionsIcons>
                    <OptionIcon src="/images/bath-icon.svg" alt="Bath" />
                    <Bathroom>{bathrooms} Salles de bain</Bathroom>
                </OptionsIcons>
                <OptionsIcons>
                    <OptionIcon src="/images/area-icon.svg" alt="Area" />
                    <Area>{area} m²</Area>
                </OptionsIcons>
            </Options>
        </CardBody>
    </PropertyCardContainer>
  );
};

export default PropertyCard;
