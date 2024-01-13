import React, { useState } from 'react';
import '../i18n.js';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const NavbarContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-top: 1rem;
  padding-bottom: 1rem;
  background-color: white;
  width: 100%;
  max-width: 111rem;
  margin: 0 auto;
  height: 10vh;

  @media (max-width: 767px) {
    flex-direction: column;
    height: auto;
    align-items: unset;
  }
`;

const LogoLink = styled.a`
  text-decoration: none;

  @media (max-width: 767px) {
    height: 4rem;
    overflow: hidden;
    width: 8.7rem;
    margin: 0 auto;
  }
`;

const Logo = styled.img`
  width: 10rem;
  height: auto;
  margin-left: 3rem;

  @media (max-width: 767px) {
    width: 9rem;
    margin-top: -2rem;
    margin-left: 0rem;
  }
`;

const NavRightItems = styled.div`
  display: flex;
  align-items: flex-end;
  flex-direction: column;

  @media (max-width: 767px) {
    align-items: center;
    width: 100%;
  }
`;

const ChangeLocales = styled.div`
  display: flex;
  align-items: center;
  margin-right: 3rem;
  margin-top: -1rem;

  @media (max-width: 767px) {
    margin-right: 0;
    margin-top: 1rem;
  }
`;

const NavLinks = styled.div`
  margin-right: 1.5rem;
  margin-top: 1.3rem;

  @media (max-width: 767px) {
    margin-right: 0;
    margin-top: 1rem;
    display: flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    gap: 1rem;
  }
`;

const NavLink = styled.a`
  margin-right: 1.5rem; // 15px
  color: black;
  text-decoration: none;
  font-size: medium;

  @media (max-width: 767px) {
    margin-right: 0rem;
  }
`;

const FlagContainer = styled.div`
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  overflow: hidden;
  margin-right: 0.3rem;
`;

const Flag = styled.img`
  width: 100%;
  height: auto;
`;

const LanguageSelect = styled.select`
  border: none;
  background-color: transparent;
  font-size: 1rem; // 10px
  cursor: pointer;
  &:after {
    content: '▼';
    font-size: 1rem; // 10px
    padding-left: 0.5rem; // 5px
  }
`;

const BurgerMenuIcon = styled.div`
  display: none;

  @media (max-width: 767px) {
    display: block;
    cursor: pointer;
    text-align: center;
    margin-top: 1rem;
  }
`;

const MobileNavRightItems = styled(NavRightItems)`
  @media (max-width: 767px) {
    overflow: hidden;
    transition: max-height 0.3s ease-in-out;
    max-height: ${props => props.isOpen ? '500px' : '0'};
    flex-direction: column-reverse;
    align-items: center;
    padding-bottom: 1rem;
  }
`;


const Navbar = () => {
  const [language, setLanguage] = useState(getInitialLanguage());
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { t } = useTranslation();

  function getInitialLanguage() {
    const languageCookie = document.cookie
      .split('; ')
      .find((row) => row.startsWith('locale='));

    if (languageCookie) {
      const [, value] = languageCookie.split('=');
      return value;
    }

    return 'fr';
  }

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLanguageChange = (event) => {
    const newLanguage = event.target.value;

    fetch('/change_locale', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-CSRF-Token': document.querySelector('[name=csrf-token]').content
      },
      body: JSON.stringify({ locale: newLanguage })
    }).then(response => {
      if (response.ok) {
        window.location.reload();
      }
    });

    setLanguage(newLanguage);
  };

  const getFlagImagePath = () => {
    switch (language) {
      case 'en':
        return "images/english-flag.svg";
      case 'fr':
      default:
        return "images/french-flag.svg";
    }
  };

  return (
    <NavbarContainer>
      <LogoLink href="/">
        <Logo src="images/home-logo.svg" alt="Logo" />
      </LogoLink>
      <BurgerMenuIcon onClick={toggleMenu}>
        <svg width="30" height="30" viewBox="0 0 100 100">
          <path d="M10,30h80v10H10z"/>
          <path d="M10,50h80v10H10z"/>
          <path d="M10,70h80v10H10z"/>
        </svg>
      </BurgerMenuIcon>
      <MobileNavRightItems isOpen={isMenuOpen}>
        <ChangeLocales>
          <FlagContainer>
            <Flag src={getFlagImagePath()} alt="Flag" />
          </FlagContainer>
          <LanguageSelect onChange={handleLanguageChange} value={language}>
            <option value="fr">Français</option>
            <option value="en">English</option>
          </LanguageSelect>
        </ChangeLocales>
        <NavLinks>
          <NavLink href="/">{t('navbar.home')}</NavLink>
          <NavLink href="/properties">{t('navbar.properties')}</NavLink>
          <NavLink href="#">{t('navbar.guides')}</NavLink>
          <NavLink href="#">{t('navbar.faq')}</NavLink>
          <NavLink href="#">{t('navbar.contact')}</NavLink>
        </NavLinks>
      </MobileNavRightItems>
    </NavbarContainer>
  );
};

export default Navbar;
