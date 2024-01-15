import React from 'react';
import styled from 'styled-components';

const CopyrightSection = styled.section`
  background-color: #000;
  color: #fff;
  text-align: center;
  padding: 1rem 0;
  width: 100%;
`;

const CopyrightText = styled.p`
  margin: 0;
  font-size: 0.875rem; // Vous pouvez ajuster la taille de la police selon vos besoins
`;

const Copyright = () => {
  return (
    <CopyrightSection>
      <CopyrightText>© 2024 Real Estate. All Rights Reserved.</CopyrightText>
    </CopyrightSection>
  );
};

export default Copyright;
