import React from 'react';
import styled from 'styled-components';
import { useForm } from 'react-hook-form';

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
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const onSubmit = data => {
    fetch('/send_contact', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
      reset();
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };

  return (
    <FooterContainer>
      <ContactInfo>
        <Title>Laissez-nous vous aider à trouver les meilleures propriétés résidentielles à Dubaï.</Title>
        <Paragraph>Vous recherchez une propriété à Dubaï qui prendra de la valeur avec le temps tout en vous offrant exclusivité et confort ? Vous êtes au bon endroit avec notre portefeuille, qui inclut uniquement les meilleures propriétés résidentielles des Émirats Arabes Unis.</Paragraph>
      </ContactInfo>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Input name="name" type="text" placeholder="Nom" {...register('name', { required: true })} />
        {errors.name && <span>Le nom est requis.</span>}

        <Input name="email" type="email" placeholder="Email" {...register('email', { required: true })} />
        {errors.email && <span>L'email est requis.</span>}

        <Textarea name="message" placeholder="Message" {...register('message', { required: true })} />
        {errors.message && <span>Un message est requis.</span>}

        <SubmitButton type="submit">Envoyer</SubmitButton>
      </Form>
    </FooterContainer>
  );
};

export default FooterContact;
