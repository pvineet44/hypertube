import { useState } from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";
import { useTranslation } from "react-i18next";
import "../translations/i18n";
import axios from "axios";

const Login = (props) => {
  const [loginStatus, setLoginStatus] = useState(0);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { t } = useTranslation();

  const handleAuth = (e) => {
    e.preventDefault();
    if (!loginStatus) {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          // setUser(result.user);
          console.log("USER", result.user);
          setLoginStatus(1);
        })
        .catch((error) => {
          alert(error.message);
        });
    } else if (loginStatus) {
      auth
        .signOut()
        .then(() => {
          // dispatch(setSignOutState());
          // history.push("/");
          console.log("LO");
          setLoginStatus(0);
        })
        .catch((err) => alert(err.message));
    }
  };

  const handleEmailPassAuth = (e) => {
    e.preventDefault();
    console.log("Login", email, password);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log("EMAIL/PASS", auth);
        setLoginStatus(1);

        // if (auth) {
        //   // history.push("/");
        // }
      })
      .catch((error) => alert(error.message));
  };

  const handleEmailPassSignUp = (e) => {
    e.preventDefault();
    console.log("Signup", email, password, firstName, lastName, userName);

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log("SignUp", auth);
        // if (auth) {
        //   history.push("/");
        // }
      })
      .catch((error) => alert(error.message));
  };

  const schoolLogin = (e) => {
    e.preventDefault();

    const client_id =
      "ef6114cc3634836b3c0b8e616e3f1f7cf856af80a8dee0d5593f194b100ad341";
    axios
      .get(
        `https://api.intra.42.fr/oauth/authorize?client_id=ef6114cc3634836b3c0b8e616e3f1f7cf856af80a8dee0d5593f194b100ad341&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2FschoolAuth&response_type=code`
      )
      // .then((response) => response.json())
      .then((data) => console.log("DATA", data));
  };
  //   const requestOptions = {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify({
  //       grant_type: "client_credentials",
  //       client_id:
  //         "ef6114cc3634836b3c0b8e616e3f1f7cf856af80a8dee0d5593f194b100ad341",
  //       client_secret:
  //         "4c2594f3ba22d3de2c8f215233423b6cfc7ca139af030e745a722fa905a11424",
  //     }),
  //   };
  //   fetch("https://api.intra.42.fr/oauth/token", requestOptions)
  //     .then((response) => response.json())
  //     .then((data) => console.log("DATA", data));
  // };

  return (
    <Container>
      <Content>
        {loginStatus ? (
          <div onClick={handleAuth}>{t("logout")}</div>
        ) : (
          <div>
            {/* <div onClick={handleAuth}>Login</div> */}
            {/* <div onClick={handleEmailPassAuth}>Email/pass login</div> */}
          </div>
        )}
        <FormContainer>
          <FormContainerHeader>
            <LoginOrSignUp
              selected={showLoginForm}
              onClick={() => setShowLoginForm(true)}
            >
              {t("login")}
            </LoginOrSignUp>
            <LoginOrSignUp
              selected={!showLoginForm}
              onClick={() => setShowLoginForm(false)}
            >
              {t("signup")}
            </LoginOrSignUp>
          </FormContainerHeader>
          {showLoginForm ? (
            <LoginForm onSubmit={handleEmailPassAuth}>
              <Input
                required
                type="email"
                placeholder={t("loginForm_email")}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Input
                required
                type="password"
                placeholder={t("loginForm_password")}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <FormButton type="submit">{t("login")}</FormButton>
              <OAuthButton onClick={handleAuth}>
                {t("login_google")}
              </OAuthButton>
              <OAuthButton>
                <a href="https://api.intra.42.fr/oauth/authorize?client_id=ef6114cc3634836b3c0b8e616e3f1f7cf856af80a8dee0d5593f194b100ad341&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2FschoolAuth&response_type=code&state=abcde">
                  {t("login_42")}
                </a>
              </OAuthButton>
            </LoginForm>
          ) : (
            <SignUpForm onSubmit={handleEmailPassSignUp}>
              <Input
                required
                type="text"
                placeholder={t("signUpForm_firstname")}
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
              <Input
                required
                type="text"
                placeholder={t("signUpForm_lastname")}
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
              <Input
                required
                type="text"
                placeholder={t("signUpForm_userName")}
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />
              <Input
                required
                type="email"
                placeholder={t("signUpForm_email")}
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Input
                required
                type="password"
                placeholder={t("signUpForm_password")}
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <FormButton>{t("signup")}</FormButton>
              <OAuthButton onClick={handleAuth}>
                {t("signup_google")}
              </OAuthButton>
              <OAuthButton>{t("signup_42")}</OAuthButton>
            </SignUpForm>
          )}
        </FormContainer>
        <BgImage />
      </Content>
    </Container>
  );
};

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
  background-image: url("/images/login-background.jpg");
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
  border-bottom: ${(props) => (props.selected ? "0.01px" : "0px")} solid gray;
  font-weight: bold;
`;

const Input = styled.input`
  background: none;
  border: none;
  border-bottom: 0.5px solid #635e5e55;
  margin-top: 40px;
  margin-bottom: 10px;
  padding-bottom: 5px;
  font-size: 15px;
  width: 100%;
  padding-left: 12px;
  color: white;
  ::-webkit-input-placeholder {
    color: white;
    font-size: 15px;
  }
  :focus {
    outline: none;
  }
`;
const LoginForm = styled.form``;
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
  a {
    width: 100%;
    height: 100%;
  }
  border-radius: 2px;
  &:hover {
    background-color: #3c5faa;
    cursor: pointer;
  }
`;
export default Login;
