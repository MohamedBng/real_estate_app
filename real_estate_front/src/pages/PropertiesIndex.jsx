import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropertySearchForm from '../components/PropertySearchForm';
import PropertyCards from '../components/PropertyCards';

const PropertiesIndex = () => {
  const [properties, setProperties] = useState([]);
  const { search } = useLocation();
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchProperties = async () => {
      try {
        const apiUrlWithParams = new URL(`${apiUrl}/api/v1/properties`);
        if (search) {
          apiUrlWithParams.search = search;
        }

        const response = await fetch(apiUrlWithParams);
        const data = await response.json();
        setProperties(data.properties);
      } catch (error) {
        console.error("Erreur lors de la récupération des propriétés:", error);
      }
    };

    fetchProperties();
  }, [apiUrl, search]);

  const updateProperties = (newProperties) => {
    setProperties(newProperties);
  };

  return (
    <div>
      <PropertySearchForm onSearch={updateProperties} />
      <PropertyCards properties={properties} />
    </div>
  );
};

export default PropertiesIndex;
