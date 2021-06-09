import { useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import '../translations/i18n';
import { Link } from 'react-router-dom';
import { auth, provider } from '../firebase';


function ForgotPassword() {
  const [email, setEmail] = useState('');
  //   const [password, setPassword] = useState('');
  const { t } = useTranslation();

    const resetPassword = (e) => {
        e.preventDefault();
        auth.sendPasswordResetEmail(email).then(function() {
            // Email sent.
          }).catch(function(error) {
            // An error happened.
          });
          
    };

  return (
    <Container>
      <Content>
        <FormContainer>
          <ForgotPasswordForm onSubmit={resetPassword}>
          {t('resetPasswordInstruction')}
            <Input
              required
              type='email'
              placeholder={t('loginForm_email')}
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />
            <FormButton type='submit'>{t('resetPassword')}</FormButton>
          </ForgotPasswordForm>
        </FormContainer>
        <BgImage />
      </Content>
    </Container>
  );
}

const Container = styled.section`
  overflow: hidden;
  display: flex;
  flex-direction: column;
  text-align: center;
  height: 100vh;
`;

const BgImage = styled.div`
  height: 100%;
  background-position: top;
  background-size: cover;
  background-repeat: no-repeat;
  background-image: url('/images/login-background.jpg');
  position: absolute;
  top: 0;
  right: 0;
  left: 0;
  z-index: -1;
`;

const Content = styled.div`
  margin-bottom: 10vw;
  width: 100%;
  position: relative;
  min-height: 100vh;
  box-sizing: border-box;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  padding: 80px 40px;
  height: 100%;
`;

const FormContainer = styled.div`
  width: 90%;
  max-width: 500px;
  border: 1px solid #635e5e55;
  padding: 10px;
`;

const FormContainerHeader = styled.div`
  width: 100%;
  display: flex;
`;

const LoginOrSignUp = styled.div`
  flex: 0.5;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  cursor: pointer;
  height: 30px;
  margin-top: 5px;
  border-bottom: ${(props) => (props.selected ? '0.01px' : '0px')} solid gray;
  font-weight: bold;
`;

const Input = styled.input`
  background: none;
  border: none;
  border-bottom: 0.5px solid #635e5e55;
  margin-top: 40px;
  margin-bottom: 10px;
  width: 100%;
  color: white;
  ::-webkit-input-placeholder {
    color: white;
  }
  :focus {
    outline: none;
  }
`;
const ForgotPasswordForm = styled.form``;
const SignUpForm = styled.form``;
const FormButton = styled.button`
  background: #20325a;
  margin-top: 20px;
  width: 100%;
  height: 40px;
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 2px;
  &:hover {
    background-color: #3c5faa;
    cursor: pointer;
  }
`;

const OAuthButton = styled.button`
  background: #20325a;
  margin-top: 20px;
  width: 100%;
  height: 40px;
  color: white;
  border: none;
  font-weight: bold;
  border-radius: 2px;
  &:hover {
    background-color: #3c5faa;
    cursor: pointer;
  }
`;

export default ForgotPassword;
