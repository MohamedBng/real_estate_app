import React, { useEffect, useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import Select from 'react-select';
import styled from 'styled-components';

const PropertySearchRoot = styled.div`
  padding: 1rem;
  background-color: #3e8be4;
  border-radius: 4px;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.25);
  margin-bottom: 1rem;
  text-align: center;
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

const Form = styled.form`
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
`;

const customStyles = {
  container: (provided) => ({
    ...provided,
    width: '20rem',
    padding: 0,
    margin: '0.5rem',
  }),
  control: (provided) => ({
    ...provided,
    border: '1px solid #ccc',
    borderRadius: '4px',
  }),
  option: (provided) => ({
    ...provided,
    color: 'black',
    padding: 20,
  }),
};

const PropertySearchForm = ({ onSearch }) => {
  const navigate = useNavigate();
  const { register, handleSubmit, control, reset } = useForm();

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

  const onSubmit = data => {
    const searchParams = new URLSearchParams(data).toString();
    navigate(`/properties?${searchParams}`);

    const apiUrlWithParams = `${apiUrl}/api/v1/properties?${searchParams}`;
    fetch(apiUrlWithParams)
      .then(response => response.json())
      .then(data => {
        onSearch(data.properties);
      })
      .catch(error => console.error('Erreur lors de la recherche API:', error));
  };

  const cityOptions = cities.map(city => ({ value: city.name, label: city.name }));
  const propertyTypeOptions = propertyTypes.map(type => ({ value: type.title, label: type.title }));
  const statusOptions = statuses.map(status => ({ value: status.title, label: status.title }));

  return (
    <PropertySearchRoot>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Controller
          name="city"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Select
              inputRef={ref}
              onBlur={onBlur}
              options={cityOptions}
              styles={customStyles}
              classNamePrefix="react-select"
              placeholder="Sélectionnez une ville"
              onChange={(val) => onChange(val ? val.value : '')}
              value={cityOptions.find(option => option.value === value)}
            />
          )}
        />
        <Controller
          name="property_type"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Select
              inputRef={ref}
              onBlur={onBlur}
              options={propertyTypeOptions}
              styles={customStyles}
              classNamePrefix="react-select"
              placeholder="Sélectionnez un type de propriété"
              onChange={(val) => onChange(val ? val.value : '')}
              value={cityOptions.find(option => option.value === value)}
            />
          )}
        />
        <Controller
          name="status"
          control={control}
          render={({ field: { onChange, onBlur, value, ref } }) => (
            <Select
              inputRef={ref}
              onBlur={onBlur}
              options={statusOptions}
              styles={customStyles}
              classNamePrefix="react-select"
              placeholder="Sélectionnez un statut"
              onChange={(val) => onChange(val ? val.value : '')}
              value={cityOptions.find(option => option.value === value)}
            />
          )}
        />
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
      </Form>
    </PropertySearchRoot>
  );
};

export default PropertySearchForm;
