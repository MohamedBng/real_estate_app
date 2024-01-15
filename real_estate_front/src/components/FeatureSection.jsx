import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import '../i18n.js';
import { useTranslation } from 'react-i18next';
import FeatureCard from './FeatureCard';

const FeatureSectionContainer = styled.div`
    width: 90%;
    max-width: 111rem;
    margin: 0 auto;
    margin-top: 10rem;
    text-align: left;
`;

const SectionContainer = styled.div`
    display: flex;
    justify-content: space-between;
    width: 100%;
    margin-bottom: 10rem;

    @media (max-width: 767px) {
        margin-bottom: 10rem;
        flex-direction: column;
        gap: 5rem;
    }

    @media (min-width: 768px) and (max-width: 1300px) {
        & > *:nth-child(n+3) {
            display: none;
        }
    }
`;

const Title = styled.p`
    font-size: 2rem;
    font-weight: bold;
    margin-bottom: 5rem;
`;

const CheckboxContainer = styled.div`
    border-radius: 1rem;
    background: #FFF;
    box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.25);
    padding: 1rem;
    width: max-content;
`;

const CheckboxLabel = styled.label`
    margin: 0 1rem;
    cursor: pointer;
`;

const LinkContainer = styled.div`
    display: flex;
    align-items: center;
    margin-left: auto;

    @media (max-width: 767px) {
        display: none;
    }
`;

const StyledLink = styled.a`
    margin-right: 0.5rem;
    text-decoration: none;
    font-weight: bold;
    color: #3E8BE4;
`;

const Icon = styled.img`
    width: 24px;
    height: 24px;
`;

const Checkbox = styled.input.attrs({ type: 'checkbox' })`
    margin-right: 0.5rem;
`;

const CheckboxAndLink = styled.div`
    display: flex;
    align-items: center;
    margin-bottom: 6rem;
`;

const Separator = styled.span`
    margin: 0 1rem;
`;

const FeatureSection = () => {
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const { t } = useTranslation();
  const [ventes, setVentes] = useState([]);
  const [locations, setLocations] = useState([]);
  const [afficherVentes, setAfficherVentes] = useState(true);
  const [afficherLocations, setAfficherLocations] = useState(false);

  const handleVentesChange = () => {
      setAfficherVentes(true);
      setAfficherLocations(false);
  };

  const handleLocationsChange = () => {
      setAfficherLocations(true);
      setAfficherVentes(false);
  };

  const propertiesToShow = afficherVentes ? ventes : afficherLocations ? locations : [];

  console.log('API Base URL:', process.env.REACT_APP_API_BASE_URL);

  useEffect(() => {
    fetch(`${apiUrl}/api/v1/properties?status=vente&limit=3`)
      .then(response => response.json())
      .then(data => {
        console.log('Propriétés en vente:', data);
        const troisPremieresVentes = data.properties.slice(0, 3);
        setVentes(troisPremieresVentes);
      })
      .catch(error => console.error('Erreur lors de la récupération des propriétés en vente:', error));
  }, []);

  useEffect(() => {
    fetch(`${apiUrl}/api/v1/properties?status=location&limit=3`)
      .then(response => response.json())
      .then(data => {
        console.log('Propriétés en location:', data);
        const troisPremieresLocations = data.properties.slice(0, 3);
        setLocations(troisPremieresLocations);
      })
      .catch(error => console.error('Erreur lors de la récupération des propriétés en location:', error));
  }, []);


    return (
        <FeatureSectionContainer>
            <Title>Explorez nos Propriétés</Title>
            <CheckboxAndLink>
                <CheckboxContainer>
                    <CheckboxLabel>
                        <Checkbox
                            name="vente"
                            checked={afficherVentes}
                            onChange={handleVentesChange}
                        />{t('feature_section.buy')}
                    </CheckboxLabel>
                    <Separator>|</Separator>
                    <CheckboxLabel>
                        <Checkbox
                            name="location"
                            checked={afficherLocations}
                            onChange={handleLocationsChange}
                        />{t('feature_section.rent')}
                    </CheckboxLabel>
                </CheckboxContainer>
                <LinkContainer>
                    <StyledLink href="/properties">{t('feature_section.see_more')}</StyledLink>
                    <Icon src="/images/arrow-icon-simple.svg" alt="Icon" />
                </LinkContainer>
            </CheckboxAndLink>
            <SectionContainer>
                {propertiesToShow && propertiesToShow.length > 0 ? (
                    propertiesToShow.map((property, index,) => (
                        <FeatureCard
                            key={index}
                            id={property.id}
                            image={property.photos[0].url}
                            price={property.price}
                            name={property.title["en"]}
                            address={property.street + ', ' + property.city}
                            bedrooms={property.bedrooms}
                            bathrooms={property.bathrooms}
                            area={property.area}
                        />
                    ))
                ) : (
                    <p>Aucune propriété à afficher</p>
                )}
            </SectionContainer>
        </FeatureSectionContainer>
    );
};

export default FeatureSection;

