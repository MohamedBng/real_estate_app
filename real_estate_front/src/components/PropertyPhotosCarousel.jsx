import React, { useState } from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 85%;

  @media (max-width: 767px) {
    width: 90%;
    margin: 0 auto;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 500px;
  overflow: hidden;
`;

const MainImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
`;

const ThumbnailsContainer = styled.div`
  display: flex;
  width: 100%;
  margin-top: 0.5rem;
  gap: 0.5rem;
`;

const ThumbnailContainer = styled.div`
  width: inherit;
  height: 10rem;
  overflow: hidden;
`;

const Thumbnail = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  cursor: pointer;
  opacity: 0.6;

  &:hover {
    opacity: 1;
  }
`;

const PropertyPhotosCarousel = ({ propertyPhotos }) => {
  const [selectedImage, setSelectedImage] = useState(propertyPhotos[0]);

  return (
    <CarouselContainer>
      <ImageContainer>
        <MainImage src={selectedImage.file} alt="Selected" />
      </ImageContainer>
      <ThumbnailsContainer>
        {propertyPhotos.map(photo => (
          <ThumbnailContainer key={photo.id}>
            <Thumbnail
              src={photo.file}
              alt="Thumbnail"
              onClick={() => setSelectedImage(photo)}
            />
          </ThumbnailContainer>
        ))}
      </ThumbnailsContainer>
    </CarouselContainer>
  );
};

export default PropertyPhotosCarousel;
