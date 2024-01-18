import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropertyPhotosCarousel from '../components/PropertyPhotosCarousel';

const PropertiesPage = () => {
  const [property, setProperty] = useState(null);
  const { propertyId } = useParams();
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchProperty = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/v1/properties/${propertyId}`);
        const data = await response.json();
        setProperty(data.property);
        console.log("Photos de la propriété:", data.property.photos);
        console.log(data);
      } catch (error) {
        console.error("Erreur lors de la récupération de la propriété:", error);
      }
    };

    fetchProperty();
  }, [apiUrl, propertyId]);

  return (
    <div>
      {property && (
        <PropertyPhotosCarousel
          propertyPhotos={property.photos.map(photo => ({
            id: photo.id,
            file: photo.url
          }))}
        />
      )}
    </div>
  );
};

export default PropertiesPage;
