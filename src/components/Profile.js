import React from 'react'
import styled from 'styled-components';
import CardProfile from './CardProfile';

function Profile() {
    return (
        <Container>
           <CardProfile />
        </Container>
    )
}

const Container = styled.div`
display: flex;
flex-direction: column;
color: #f9f9f9;
justify-content: center;
align-items: center;
padding-top: 40px;
`;

export default Profile


