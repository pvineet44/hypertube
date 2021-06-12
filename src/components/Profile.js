import React from 'react';
import styled from 'styled-components';
import CardProfile from './CardProfile';
import { useTranslation } from "react-i18next";
import "../translations/i18n";

function Profile({ lang }) {

  const { t } = useTranslation();

  return (
    <Container>
      <CardProfile t={t} />
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  color: #f9f9f9;
  justify-content: center;
  align-items: center;
  padding-top: 40px;
`;

export default Profile;
