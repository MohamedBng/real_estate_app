import React from 'react';
import styled from 'styled-components';

const StyledNav = styled.nav`
  padding: 1rem 0;
`;

const StyledUl = styled.ul`
  display: flex;
  list-style: none;
  padding-left: 0;
  justify-content: center;
`;

const StyledLi = styled.li`
  margin: 0 5px;
`;

const StyledButton = styled.button`
  background-color: white;
  color: #007bff;
  border: 1px solid #ddd;
  padding: 0.5rem 0.75rem;
  margin-bottom: 0;
  border-radius: 0.25rem;
  cursor: pointer;
  &:hover {
    background-color: #e9ecef;
  }
  &:focus {
    outline: none;
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
`;

const Pagination = ({ propertiesPerPage, totalProperties, paginate }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalProperties / propertiesPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <StyledNav>
      <StyledUl className='pagination'>
        {pageNumbers.map(number => (
          <StyledLi key={number} className='page-item'>
            <StyledButton onClick={() => paginate(number)}>
              {number}
            </StyledButton>
          </StyledLi>
        ))}
      </StyledUl>
    </StyledNav>
  );
};

export default Pagination;
