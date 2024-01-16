import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import '../i18n.js';
import { useTranslation } from 'react-i18next';

const HeroContainer = styled.div`
  position: relative;
  background-image: url("/images/dubaimarina.jpg");
  color: black;
  text-align: left;
  padding-left: 4.5rem;
  height: 90vh;
  background-size: cover;
  background-position: center;
  min-height: 40rem;

  @media (max-width: 767px) {
    text-align: center;
    padding-left: 2rem;
    padding-right: 2rem;
    height: 85vh;
  }
  @media (min-width: 768px) and (max-width: 1024px) {
    padding-top: 20%;
  }
`;

const HeroCorp = styled.div`
  width: 100%;
  max-width: 111rem;
  margin: 0 auto;
  padding-top: 10%;

  @media (max-width: 767px) {
    gap: 1rem;
    display: flex;
    flex-direction: column;
    margin-top: 1rem;
  }
`;

const MainText = styled.p`
  font-size: 2rem;
  font-weight: bold;
  width: 29rem;
  color: white;

  @media (max-width: 767px) {
    width: 100%;
  }
`;

const Subtitle = styled.p`
  color: white;
  font-size: 1.5rem;
  font-weight: lighter;
`;

const SearchBar = styled.div`
  display: flex;
  align-items: center;
  margin-top: 1rem;
  width: 50%;
  border-radius: 41px;

  @media (max-width: 767px) {
    width: 100%;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 64%;
  }
`;

const LocalisationIcon = styled.img`
  width: 1rem;
  height: auto;
  margin-right: -2rem;
  z-index: 2;
  margin-left: 1rem;
`;

const SearchInput = styled.select`
  flex: 1;
  padding: 1.5rem;
  padding-left: 1.5rem;
  padding-left: 2.5rem;
  border: 1px solid #ccc;
  background-color: white;
  font-style: italic;
  border-radius: 10px;
  -webkit-appearance: none;
`;

const SearchButton = styled.button`
  background-color: #3E8BE4;
  color: white;
  border: none;
  padding: 1.2rem;
  margin-left: -7.1rem;
  border-radius: 5px;
  width: 6.8rem;
  cursor: pointer;

  &:hover {
    background-color: #0069d9;
    border-color: #0062cc;
  }
`;

const IconsContainer = styled.div`
  position: absolute;
  bottom: 2rem;
  display: flex;
  gap: 1rem;
`;

const IconCircle = styled.div`
  width: 3rem; // Taille de l'icône
  height: 3rem;
  border-radius: 50%;
  background-color: white; // Couleur de fond des cercles
  display: flex;
  justify-content: center;
  align-items: center;

  &.green {
    background-color: #46CC6B;
  }

  &.blue {
    background-color: #3E8BE4;
  }
`;

const Icon = styled.img`
  width: 60%;
  height: auto;
`;

const Hero = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const { t } = useTranslation();
  const [cities, setCities] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/api/v1/cities`)
      .then(response => {
        return response.json();
      })
      .then(data => {
        setCities(data.cities);
      })
      .catch(error => console.error('Erreur lors de la récupération des villes:', error));
  }, []);

  return (
    <HeroContainer>
      <HeroCorp>
        <MainText>{t('hero.main_text')}{}</MainText>
        <Subtitle>{t('hero.subtitle')}</Subtitle>
        <SearchBar as="form" action="/properties" method="get">
          <LocalisationIcon src="/images/localisation-icon.svg" alt={t('hero.localisation_icon_alt')} />
          <SearchInput as="select" name="city">
            {cities.map((city, index) => (
              <option key={index} value={city.name}>{city.name}</option>
            ))}
          </SearchInput>
          <SearchButton type="submit">{t('hero.search_button')}</SearchButton>
        </SearchBar>
        <IconsContainer>
          <IconCircle className="green"> <Icon src="/images/whatsapp-icon.svg" alt="Flag" /></IconCircle>
          <IconCircle className="blue"> <Icon src="/images/telephone-icon.svg" alt="Flag" /></IconCircle>
          <IconCircle> <Icon src="/images/instagram-icon.svg" alt="Flag" /></IconCircle>
        </IconsContainer>
      </HeroCorp>
    </HeroContainer>
  );
};

export default Hero;
