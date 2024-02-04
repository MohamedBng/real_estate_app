import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import PropertySearchForm from '../components/PropertySearchForm';
import PropertyCards from '../components/PropertyCards';
import Pagination from '../components/Pagination';
import PropertyNotFound from '../components/PropertyNotFound';
import styled from 'styled-components';
import L from 'leaflet';

const StyledButton = styled.button`
  background-color: black;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 20px;
  cursor: pointer;
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  margin: 20px auto;
  display: flex;
  align-items: center;
  position: relative;
  z-index: 2;
`;

const Icon = styled.img`
  width: 1rem;
`;


const PropertiesIndex = () => {
  const [properties, setProperties] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [propertiesPerPage] = useState(8);
  const [showMap, setShowMap] = useState(false);
  const { search } = useLocation();
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_BASE_URL;

  const createCustomIcon = (price) => {
    return L.divIcon({
      className: 'custom-price-marker',
      html: `<div class="custom-price-marker">$ ${price}</div>`,
    });
  };

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

  useEffect(() => {
    const totalAvailablePages = Math.ceil(properties.length / propertiesPerPage);
    if (currentPage > totalAvailablePages) {
      setCurrentPage(1);
    }
  }, [properties.length, currentPage, propertiesPerPage]);

  const paginate = pageNumber => setCurrentPage(pageNumber);
  const lastPropertyIndex = currentPage * propertiesPerPage;
  const firstPropertyIndex = lastPropertyIndex - propertiesPerPage;
  const currentProperties = properties.slice(firstPropertyIndex, lastPropertyIndex);

  return (
    <div>
      <PropertySearchForm onSearch={setProperties} />
      <StyledButton onClick={() => setShowMap(!showMap)}>
        {showMap ? <Icon src="/images/map-icon.svg" alt="Map Icon" /> : <Icon src="/images/list-icon.svg" alt="List Icon" />}
        {showMap ? " Afficher la liste" : " Afficher la carte"}
      </StyledButton>
      {showMap ? (
        <MapContainer center={[24.358745, 53.982494]} zoom={7} scrollWheelZoom={true}>
          <TileLayer
            attribution='&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/alidade_smooth_dark/{z}/{x}/{y}{r}.{ext}"
            minZoom={0}
            maxZoom={20}
            ext='png'
          />
          {properties.map((property) => (
            <Marker
              key={property.id}
              position={[property.latlon.lat, property.latlon.lon]}
              icon={createCustomIcon(property.price)}
              eventHandlers={{
                click: () => {
                  navigate(`/properties/${property.id}`);
                },
              }}
            >
              <Popup>
                {property.title.en} <br /> {property.description.en}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      ) : properties.length > 0 ? (
        <>
          <PropertyCards properties={currentProperties} />
          <Pagination
            propertiesPerPage={propertiesPerPage}
            totalProperties={properties.length}
            paginate={paginate}
          />
        </>
      ) : (
        <PropertyNotFound />
      )}
    </div>
  );
};

export default PropertiesIndex;
