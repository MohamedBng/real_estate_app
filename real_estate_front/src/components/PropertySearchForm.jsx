import React, { useEffect, useRef, useState } from 'react';
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

  .property-type-filters {
    display: none;
  }

  @media (max-width: 767px) {
    .property-type-filters {
      display: block;
    }
  }
`;

const Overlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 9;
  display: ${props => props.show ? 'block' : 'none'};
`;


const SearchBar = styled.div`
  background-color: white;
  border-radius: 4px;
  display: flex;
  align-items: center;
  padding: 0.5rem;
  width: 45%;
  border-radius: 60px;

  @media (max-width: 400px) {
    width: 13rem;

    .property-type-select {
      display: none;
    }
  }

  @media (min-width: 401px) and (max-width: 767px) {
    width: 15rem;

    .property-type-select {
      display: none;
    }
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    width: 40rem;
  }
`;

const Divider = styled.div`
  height: 100%;
  width: 1px;
  background-color: #ccc;
  margin: 0 0.5rem;

  @media (max-width: 767px) {
    display: none;
  }
`;

const MenuDivider = styled.div`
  height: 1px;
  width: 100%;
  background-color: #ccc;
`;

const Form = styled.form`
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #3e8be4;

  @media (max-width: 1024px) {
    justify-content: space-between;
  }
`;

const SearchButton = styled.button`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  border: none;
  background-color: #3e8be4;
  color: white;
  display: flex;
  justify-content: center;
  align-items: center;
  margin-left: 0.5rem;
  cursor: pointer;
`;

const SearchIcon = styled.img`
  width: 1rem;
`;

const FilterButton = styled.button`
  padding: 1rem 2rem;
  border: none;
  background-color: white;
  color: #3e8be4;
  cursor: pointer;
  border-radius: 4px;
  position: absolute;
  right: 6rem;
  margin-top: 0.3rem;
  display: flex;
  color: black;
  gap: 10px;

  @media (max-width: 1024px) {
    right: 1rem;
  }
}
`;

const FilterText = styled.p`
  margin: 0;
  @media (max-width: 1024px) {
    display: none;
  }
`;

const FilterIcon = styled.img`
  width: 1rem;
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  border: none;
  background: transparent;
  cursor: pointer;
  color: #333;
  font-size: 1.5rem;
`;

const FilterMenu = styled.div`
  position: absolute;
  width: 60%;
  max-height: 100%;
  background-color: white;
  box-shadow: 0px -2px 5px rgba(0, 0, 0, 0.25);
  transform: ${props => props.show ? 'translateY(0)' : 'translateY(100%)'};
  transition: transform 0.3s ease-in-out, opacity 0.3s ease-in-out;
  opacity: ${props => props.show ? 1 : 0};
  visibility: ${props => props.show ? 'visible' : 'hidden'};
  border-radius: 25px;
  z-index: 10;
  left: 20%;
  right: 20%;
  top: 10%;
  bottom: 10%;
  overflow: scroll;

  @media (max-width: 767px) {
    left: 0;
    right: 0;
    top: 40%;
    bottom: 0;
    width: 100%;
    border-radius: 25px 25px 0 0;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    left: 15%;
    right: 15%;
    width: 75%;
    max-height: 55%;
  }
`;

const Title = styled.p`
  font-size: 1.2rem;
  font-weight: bold;
  color: #333;
  margin-bottom: 0.8rem;
  margin-top: 2rem;
`;

const SelectionGroup = styled.div`
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  border: 1px solid #ccc;
  width: max-content;
  border-radius: 20px;
  overflow: hidden;
`;

const SelectionButton = styled.button`
  padding: 1rem 2rem;
  border: none;
  background-color: ${props => props.selected ? '#3e8be4' : 'white'};
  color: ${props => props.selected ? 'white' : '#333'};
  cursor: pointer;
  width: 10rem;
  font-size: 1rem;

  &:hover {
    background-color: #3e8be4;
    color: white;
  }

  &:not(:last-child) {
    border-right: 1px solid #ccc;
  }

  &:last-child {
    border-right: none;
  }

  &.small {
    font-size: 0.8rem;
    width: 8rem;

    @media (max-width: 1024px) {
      width: 3rem;
    }

    @media (min-width: 401px) and (max-width: 767px) {
      font-size: 0.5rem;
    }

    @media (max-width: 400px) {
      font-size: 0.5rem;
      width: 3.5rem;
    }
  }

  @media (min-width: 401px) and (max-width: 767px) {
    font-size: 0.5rem;
    width: 4.2rem;
    padding: 0;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  @media (max-width: 400px) {
    font-size: 0.5rem;
    width: 3.5rem;
    padding: 0;
    padding-top: 1rem;
    padding-bottom: 1rem;
  }

  @media (min-width: 768px) and (max-width: 1024px) {
    font-size: 0.6rem;
    width: 5.5rem;
    padding: 0.5rem 1rem;
  }
`;

const ButtonGroup = styled.div`
  background-color: white;
  z-index: 200;
  width: 100%;
  position: sticky;
  bottom: 0;
  display: flex;
  justify-content: space-around;
  padding-bottom: 1rem;
  padding-top: 1rem;
  margin-top: 10%;
`;

const ButtonResetFilter = styled.button`
  padding: 1rem 2rem;
  border: none;
  background-color: #ccc;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  width: 15rem;

  @media (max-width: 767px) {
    width: 10rem;
  }
`;

const ButtonSaveFilters = styled.button`
  padding: 1rem 2rem;
  border: none;
  background-color: #3e8be4;
  color: white;
  cursor: pointer;
  border-radius: 4px;
  width: 15rem;

  @media (max-width: 767px) {
    width: 10rem;
  }
`;

const customStyles = {
  container: (provided) => ({
    ...provided,
    width: '100%',
    margin: 0,
    flex: 1,
  }),
  control: (provided) => ({
    ...provided,
    border: '1px solid #ccc',
    borderRadius: '4px',
    border: "none",
  }),
  option: (provided) => ({
    ...provided,
    color: 'black',
    padding: 20,
  }),
  indicatorsContainer: (provided) => ({
    ...provided,
    display: 'none',
  }),
};

const PropertySearchForm = ({ onSearch }) => {
  const navigate = useNavigate();
  const { handleSubmit, control, reset} = useForm();
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [cities, setCities] = useState([]);
  const [propertyTypes, setPropertyTypes] = useState([]);
  const [showFilterMenu, setShowFilterMenu] = useState(false);
  const filterMenuRef = useRef();
  const [selectedBedroom, setSelectedBedroom] = useState(null);
  const [selectedBathroom, setSelectedBathroom] = useState([]);
  const [selectedPropertyStatus, setSelectedPropertyStatus] = useState(null);
  const [selectedPropertyType, setSelectedPropertyType] = useState(null);

  useEffect(() => {
    fetch(`${apiUrl}/api/v1/filters`)
      .then(response => response.json())
      .then(data => {
        setCities([{ name: '', label: 'Tout' }, ...data.cities]);
        setPropertyTypes([{ title: '', title: 'Tout' }, ...data.property_types]);
      })
      .catch(error => console.error('Erreur lors de la récupération des filtres:', error));
  }, [apiUrl]);


  useEffect(() => {
    if (showFilterMenu) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
    };
  }, [showFilterMenu]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterMenuRef.current && !filterMenuRef.current.contains(event.target)) {
        setShowFilterMenu(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [filterMenuRef]);

  const cityOptions = cities.map(city => ({ value: city.name, label: city.label || city.name }));
  const propertyTypeOptions = propertyTypes.map(type => ({ value: type.title, label: type.label || type.title }));
  const toggleFilterMenu = () => {
    setShowFilterMenu(!showFilterMenu);
  };

  const handleBedroomSelect = (bedroom) => {
    setSelectedBedroom(bedroom);
  };

  const handleBathroomSelect = (bathroom) => {
    setSelectedBathroom(bathroom);
  };

  const handlePropertyStatusSelect = (propertyStatus) => {
    setSelectedPropertyStatus(propertyStatus);
  };

  const handleSelectPropertyType = (propertyType) => {
    setSelectedPropertyType(propertyType);
  };

  const onSubmit = (data) => {
    const searchParams = new URLSearchParams({
      city: data.city || '',
      property_type: data.property_type ||selectedPropertyType || '',
      status: selectedPropertyStatus || '',
      bedrooms: selectedBedroom || '',
      bathrooms: selectedBathroom || '',
    }).toString();

    navigate(`/properties?${searchParams}`);

    const apiUrlWithParams = `${apiUrl}/api/v1/properties?${searchParams}`;
    fetch(apiUrlWithParams)
      .then(response => response.json())
      .then(data => onSearch(data.properties))
      .catch(error => console.error('Erreur lors de la recherche API:', error));
  };

  const resetAll = () => {
    reset({
      city: '',
      property_type: '',
    });
    reset();
    setSelectedBedroom(null);
    setSelectedBathroom(null);
    setSelectedPropertyStatus(null);
    setSelectedPropertyType(null);
    setShowFilterMenu(false);
  };

  return (
    <PropertySearchRoot>
      <Overlay show={showFilterMenu}></Overlay>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <SearchBar>
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
          <Divider />
          <Controller
            name="property_type"
            control={control}
            render={({ field: { onChange, onBlur, value, ref } }) => (
              <Select
                className="property-type-select"
                inputRef={ref}
                onBlur={onBlur}
                options={propertyTypeOptions}
                styles={customStyles}
                classNamePrefix="react-select"
                placeholder="Sélectionnez un type de propriété"
                onChange={(val) => onChange(val ? val.value : '')}
                value={propertyTypeOptions.find(option => option.value === value)}
              />
            )}
          />
          <SearchButton type="submit">
            <SearchIcon src="/images/search-icon.svg" alt="Search" />
          </SearchButton>
        </SearchBar>
        <FilterButton type="button" onClick={toggleFilterMenu}>
          <FilterIcon src="/images/filter-icon.svg" alt="Filter" />
          <FilterText>Filtrer</FilterText>
        </FilterButton>
        <FilterMenu ref={filterMenuRef} show={showFilterMenu}>
          <CloseButton onClick={toggleFilterMenu}>&times;</CloseButton>
          <Title>Filtres</Title>
          <MenuDivider />
          <Title>Status du logement</Title>
          <SelectionGroup>
            {['Tout', 'Vente', 'Location'].map(propertyStatus => (
              <SelectionButton
                key={propertyStatus}
                selected={selectedPropertyStatus === propertyStatus}
                onClick={() => handlePropertyStatusSelect(propertyStatus)}
              >
                {propertyStatus}
              </SelectionButton>
            ))}
          </SelectionGroup>
          <Title className="property-type-filters" >Type de logement</Title>
          <SelectionGroup>
            {propertyTypes.map((type) => (
              <SelectionButton
                className="property-type-filters"
                key={type.title}
                selected={selectedPropertyType === type.title}
                onClick={() => handleSelectPropertyType(type.title)}
              >
                {type.title}
              </SelectionButton>
            ))}
          </SelectionGroup>
          <Title>Chambres et lits</Title>
          <SelectionGroup>
            {['Tout', 1, 2, 3, 4, '5+'].map(bedroom => (
              <SelectionButton
                className="small"
                key={bedroom}
                selected={selectedBedroom === bedroom}
                onClick={() => handleBedroomSelect(bedroom)}
              >
                {bedroom}
              </SelectionButton>
            ))}
          </SelectionGroup>
          <Title>Salle de bains</Title>
          <SelectionGroup>
            {['Tout',1, 2, 3, 4, '5+'].map(bathroom => (
              <SelectionButton
                className="small"
                key={bathroom}
                selected={selectedBathroom === bathroom}
                onClick={() => handleBathroomSelect(bathroom)}
              >
                {bathroom}
              </SelectionButton>
            ))}
          </SelectionGroup>
          <ButtonGroup>
            <ButtonResetFilter onClick={resetAll}>Réinitialiser les filtres</ButtonResetFilter>
            <ButtonSaveFilters type="submit" >Enregistrer</ButtonSaveFilters>
          </ButtonGroup>
        </FilterMenu>
      </Form>
    </PropertySearchRoot>
  );
};

export default PropertySearchForm;
