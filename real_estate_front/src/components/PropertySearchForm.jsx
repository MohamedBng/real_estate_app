import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate, useLocation } from 'react-router-dom';
import styled from 'styled-components';

const PropertySearchRoot = styled.div`
  padding: 1rem;
  background-color: #3e8be4;
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 1rem;
  text-align: center;
`;

const SearchInput = styled.select`
  padding: 0.5rem;
  margin: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SearchSelect = styled.select`
  padding: 0.5rem;
  margin: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SearchInputNumber = styled.input`
  padding: 0.5rem;
  margin: 0.5rem;
  border: 1px solid #ccc;
  border-radius: 4px;
`;

const SearchSubmitButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  background-color: white;
  color: #3e8be4;
  cursor: pointer;
  border-radius: 4px;
  margin: 0.5rem;
`;

const ResetFiltersButton = styled.a`
  padding: 0.5rem 1rem;
  border: none;
  background-color: white;
  color: #3e8be4;
  cursor: pointer;
  border-radius: 4px;
  margin: 0.5rem;
  text-decoration: none;
  font-size: small;
`;

const PropertySearchForm = () => {
  const navigate = useNavigate();
  const { register, handleSubmit, reset } = useForm();
  const { search } = useLocation();

  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [cities, setCities] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [statuses, setStatuses] = useState([]);

  useEffect(() => {
    fetch(`${apiUrl}/api/v1/filters`)
      .then(response => response.json())
      .then(data => {
        setCities(data.cities);
        setPropertyTypes(data.property_types);
        setStatuses(data.property_statuses);
      })
      .catch(error => console.error('Erreur lors de la récupération des filtres:', error));
  }, []);

  useEffect(() => {
    const query = new URLSearchParams(search);
    const city = query.get('city') || "";
    const propertyType = query.get('property_type') || "";
    const status = query.get('status') || "";
    const bathrooms = query.get('bathrooms') || "";
    const bedrooms = query.get('bedrooms') || "";

    const apiUrlWithParams = `${apiUrl}/api/v1/properties?city=${city}&property_type=${propertyType}&status=${status}&bathrooms=${bathrooms}&bedrooms=${bedrooms}`;
    console.log('apiUrlWithParams', apiUrlWithParams);
    fetch(apiUrlWithParams)
      .then(response => response.json())
      .then(data => {
        console.log('Résultats de la recherche API:', data);
      })
      .catch(error => console.error('Erreur lors de la recherche API:', error));
  }, [search]);

  const onSubmit = data => {
    const searchParams = new URLSearchParams(data).toString();
    console.log(searchParams);
    navigate(`/properties?${searchParams}`);
  };

  return (
    <PropertySearchRoot>
      <form onSubmit={handleSubmit(onSubmit)}>
        <SearchInput name="city" {...register('city')} defaultValue="">
          <option value="">Sélectionnez une ville</option>
          {cities.map((city, index) => (
            <option key={index} value={city.name}>{city.name}</option>
          ))}
        </SearchInput>
        <SearchSelect name="property_type" {...register('property_type')} defaultValue="">
          <option value="">Sélectionnez un type de propriété</option>
          {propertyTypes.map((type, index) => (
            <option key={index} value={type.title}>{type.title}</option>
          ))}
        </SearchSelect>
        <SearchSelect name="status" {...register('status')} defaultValue="">
          <option value="">Sélectionnez un statut</option>
          {statuses.map((status, index) => (
            <option key={index} value={status.title}>{status.title}</option>
          ))}
        </SearchSelect>
        <SearchInputNumber
          type="number"
          name="bathrooms"
          {...register('bathrooms')}
          placeholder="Salle de bains"
        />
        <SearchInputNumber
          type="number"
          name="bedrooms"
          {...register('bedrooms')}
          placeholder="Chambres"
        />
        <SearchSubmitButton type="submit">Rechercher</SearchSubmitButton>
        <ResetFiltersButton href="/properties" onClick={() => reset()}>
          Supprimer les filtres
        </ResetFiltersButton>
      </form>
    </PropertySearchRoot>
  );
};

export default PropertySearchForm;
