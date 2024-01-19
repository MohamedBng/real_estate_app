import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import PropertyPhotosCarousel from '../components/PropertyPhotosCarousel';
import PropertyDetailsCard from '../components/PropertyDetailsCard';

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
      } catch (error) {
        console.error("Erreur lors de la récupération de la propriété:", error);
      }
    };

    fetchProperty();
  }, [apiUrl, propertyId]);

  if (!property) {
    return <div>Chargement des détails de la propriété...</div>;
  }

  return (
    <div id="property-details-body">
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
      <div>
      <PropertyDetailsCard property={property} />
      </div>
    </div>
  );
};

export default PropertiesPage;
