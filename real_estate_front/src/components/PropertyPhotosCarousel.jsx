import React, { useState } from 'react';
import styled from 'styled-components';

const CarouselContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 1100px;
  max-width: 1100px;

  @media (max-width: 1024px) {
    width: 90%;
    margin: 0 auto;
  }
`;

const ImageContainer = styled.div`
  width: 100%;
  height: 500px;
  overflow: hidden;
  position: relative;
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
  overflow: hidden;
  overflow-x: scroll;

  @media (max-width: 1024px) {
   display: none;
  }
`;

const ThumbnailContainer = styled.div`
  flex-shrink: 0;
  width: 13.5rem;
  height: 10rem;
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

const ArrowButton = styled.button`
  background: rgba(0, 0, 0, 0.5);
  color: white;
  border: none;
  cursor: pointer;
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  z-index: 1000;
  padding: 10px;
  font-size: 24px;
  display: none;

  @media (max-width: 1024px) {
    display: block;
  };

`;

const LeftArrow = styled(ArrowButton)`
  left: 10px;
`;

const RightArrow = styled(ArrowButton)`
  right: 10px;
`;

const PropertyPhotosCarousel = ({ propertyPhotos }) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  const goToPrevious = () => {
    const isFirstImage = selectedIndex === 0;
    const newIndex = isFirstImage ? propertyPhotos.length - 1 : selectedIndex - 1;
    setSelectedIndex(newIndex);
  };

  const goToNext = () => {
    const isLastImage = selectedIndex === propertyPhotos.length - 1;
    const newIndex = isLastImage ? 0 : selectedIndex + 1;
    setSelectedIndex(newIndex);
  };

  return (
    <CarouselContainer>
      <ImageContainer>
        <LeftArrow onClick={goToPrevious}>&lt;</LeftArrow>
        <MainImage src={propertyPhotos[selectedIndex].file} alt="Selected" />
        <RightArrow onClick={goToNext}>&gt;</RightArrow>
      </ImageContainer>
      <ThumbnailsContainer>
        {propertyPhotos.map((photo, index) => (
          <ThumbnailContainer key={photo.id}>
            <Thumbnail
              src={photo.file}
              alt="Thumbnail"
              onClick={() => setSelectedIndex(index)}
            />
          </ThumbnailContainer>
        ))}
      </ThumbnailsContainer>
    </CarouselContainer>
  );
};

export default PropertyPhotosCarousel;

