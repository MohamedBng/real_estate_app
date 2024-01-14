import React, { useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import '../i18n.js';
import { useTranslation } from 'react-i18next';
import styled from 'styled-components';

const Logo = styled.img`
  width: 7rem;
  height: auto;

  @media (max-width: 767px) {
    width: 9rem;
    margin-top: -2rem;
  }
`;

function HomeNavbar() {
  const [language, setLanguage] = useState(getInitialLanguage());
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

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-body-tertiary">
      <Container>
        <Navbar.Brand href="/">
          <Logo src="images/estelle-darcy-logo.svg" alt="Logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#home">{t('navbar.home')}</Nav.Link>
            <Nav.Link href="/properties">{t('navbar.properties')}</Nav.Link>
            <Nav.Link href="/properties">{t('navbar.guides')}</Nav.Link>
            <Nav.Link href="/properties">{t('navbar.faq')}</Nav.Link>
            <Nav.Link href="/properties">{t('navbar.contact')}</Nav.Link>
          </Nav>
          <Nav>
            <NavDropdown onChange={handleLanguageChange} title={language}>
              <NavDropdown.Item value="fr">Français</NavDropdown.Item>
              <NavDropdown.Item value="en">English</NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default HomeNavbar;
