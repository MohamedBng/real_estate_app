import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import PropertySearchForm from '../components/PropertySearchForm';
import PropertyCards from '../components/PropertyCards';
import Pagination from '../components/Pagination'; // Assurez-vous de créer ce composant

const PropertiesIndex = () => {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(8);
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

  const lastPropertyIndex = currentPage * propertiesPerPage;
  const firstPropertyIndex = lastPropertyIndex - propertiesPerPage;
  const currentProperties = properties.slice(firstPropertyIndex, lastPropertyIndex);

  console.log(properties);
  console.log(currentProperties);
  console.log(lastPropertyIndex);
  console.log(firstPropertyIndex);

  const paginate = pageNumber => setCurrentPage(pageNumber);

  return (
    <div>
      <PropertySearchForm onSearch={setProperties} />
      <PropertyCards properties={currentProperties} />
      <Pagination
        propertiesPerPage={propertiesPerPage}
        totalProperties={properties.length}
        paginate={paginate}
      />
    </div>
  );
};

export default PropertiesIndex;
