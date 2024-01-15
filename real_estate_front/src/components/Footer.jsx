import React, { useState } from 'react';
import styled from 'styled-components';

const FooterContainer = styled.footer`
    display: flex;
    justify-content: space-between;
    align-items: center;
    color: white;
    padding: 4rem;
    width: 90%;
    max-width: 111rem;
    margin: 0 auto;
    height: 30rem;
    text-align: left;

    @media (max-width: 767px) {
      padding: 0;
      height: auto;
      flex-direction: column;
      padding-bottom: 1rem;
    }

    @media (min-width: 768px) and (max-width: 1024px) {
      padding: 0;
      height: auto;
      flex-direction: column;
      padding-bottom: 1rem;
    }
}
`;

const ContactInfo = styled.div`
  flex-basis: 50%;
`;

const Title = styled.h2`
    width: 30rem;
    font-size: 2rem;

    @media (max-width: 767px) {
      width: 100%;
      margin-bottom: 1rem;
      margin-top: 2rem;
    }

    @media (min-width: 768px) and (max-width: 1024px) {
      width: 100%;
      margin-bottom: 1rem;
      margin-top: 2rem;
    }
`;

const Paragraph = styled.p`
    width: 30rem;
    margin-bottom: 1rem;

    @media (max-width: 767px) {
      width: 100%;
      margin-bottom: 1rem;
    }

    @media (min-width: 768px) and (max-width: 1024px) {
      width: 100%;
      margin-bottom: 1rem;
    }
`;

const Form = styled.form`
    flex-basis: 40%;
    display: flex;
    flex-direction: column;
    padding: 2rem;
    background-color: white;
    border-radius: 4px;

    @media (max-width: 767px) {
      width: 82%;
    }

    @media (min-width: 768px) and (max-width: 1024px) {
      width: 82%;
    }
`;

const Input = styled.input`
    margin-bottom: 1rem;
    padding: 1.5rem;
    background-color: #D9D9D9;
    border: none;
    border-radius: 4px;
`;

const Textarea = styled.textarea`
    margin-bottom: 1rem;
    padding: 1.5rem;
    height: 150px;
    width: 90%;
    background-color: #D9D9D9;
    border: none;
`;

const SubmitButton = styled.button`
    background-color: #007bff;
    color: white;
    border: none;
    cursor: pointer;
    font-size: 1rem;
    justify-content: center;
    width: 15rem;
    padding: 1rem;
    margin: 0 auto;
    border-radius: 4px;

    &:hover {
      background-color: #0069d9;
      border-color: #0062cc;
    }
`;

const FooterContact = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const handleSubmit = (event) => {
    event.preventDefault();
    const data = new FormData(event.target);

    fetch('/send_contact', {
      method: 'POST',
      body: JSON.stringify({
        name: data.get('name'),
        email: data.get('email'),
        message: data.get('message'),
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
    setName('');
    setEmail('');
    setMessage('');
  };

  return (
    <FooterContainer>
      <ContactInfo>
        <Title>Laissez-nous vous aider à trouver les meilleures propriétés résidentielles à Dubaï.</Title>
        <Paragraph>Vous recherchez une propriété à Dubaï qui prendra de la valeur avec le temps tout en vous offrant exclusivité et confort ? Vous êtes au bon endroit avec notre portefeuille, qui inclut uniquement les meilleures propriétés résidentielles des Émirats Arabes Unis.</Paragraph>
      </ContactInfo>
      <Form onSubmit={handleSubmit}>
        <Input name="name" type="text" placeholder="Nom" value={name} onChange={(e) => setName(e.target.value)} required />
        <Input name="email" type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        <Textarea name="message" placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} required />
        <SubmitButton type="submit">Envoyer</SubmitButton>
      </Form>
    </FooterContainer>
  );
};

export default FooterContact;
