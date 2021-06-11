import { useEffect, useState } from "react";
import styled from "styled-components";
import db, { auth, provider } from "../firebase";
import { useTranslation } from "react-i18next";
import "../translations/i18n";
import axios from "axios";
import { useHistory } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { login, logout } from "../actions/index";
import { googleApi, schoolAuthLink, userCollection } from "../properties";
import "../translations/i18n";
import { Link } from "react-router-dom";
import { EightBitLoader } from "react-loaders-kit";

const Login = (props) => {
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [disabled, setDisabled] = useState(false);
  const [loading, setLoading] = useState(false);

  const { t } = useTranslation();
  const history = useHistory();
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
    if (loggedInUser) history.push("/");
  }, []);
  const googleLoginOrSignup = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        console.log("USER", result);
        db.collection(userCollection)
          .doc(result.user?.uid)
          .get()
          .then((snapshot) => {
            console.log(snapshot.data());
            dispatch(
              login({
                id: result.user.uid,
                authType: "googleAuth",
                accessToken: result.credential.accessToken,
              })
            );
            if (!snapshot.data()) {
              axios
                .get(googleApi + result.credential.accessToken)
                .then((res) => {
                  console.log("GOOGLE API", res);
                  db.collection(userCollection).doc(result.user?.uid).set({
                    firstName: res.data.given_name,
                    lastName: res.data.family_name,
                    email: res.data.email,
                    photo: res.data.picture,
                  });
                  history.push("/");
                });
            } else history.push("/");
          });
      })
      .catch((error) => {
        alert(error.message);
      });
  };

  const loaderProps = {
    loading,
    size: 35,
    duration: 1,
    color: "#f9f9f9",
  };

  const handleAuth = (e) => {
    e.preventDefault();
    if (!loggedInUser) {
      googleLoginOrSignup();
    } else if (loggedInUser) {
      auth
        .signOut()
        .then(() => {
          console.log("LO");
          dispatch(logout());
        })
        .catch((err) => alert(err.message));
    }
  };

  const handleEmailPassAuth = (e) => {
    e.preventDefault();
    setDisabled(true);
    setLoading(true);
    console.log("Login", email, password);
    auth
      .signInWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log("EMAIL/PASS", auth);
        dispatch(login({ id: auth.user.uid, authType: "emailPass" }));
        if (auth) {
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  const handleEmailPassSignUp = (e) => {
    e.preventDefault();
    setDisabled(true);
    setLoading(true);
    console.log("Signup", email, password, firstName, lastName, userName);

    auth
      .createUserWithEmailAndPassword(email, password)
      .then((auth) => {
        console.log("SignUp", auth);
        if (auth) {
          db.collection(userCollection).doc(auth.user?.uid).set({
            firstName: firstName,
            lastName: lastName,
            userName: userName,
            email: email,
          });
          dispatch(login({ id: auth.user.uid, authType: "emailPass" }));
          history.push("/");
        }
      })
      .catch((error) => alert(error.message));
  };

  return (
    <Container>
      <Content>
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
              <Link to="/forgotPassword">
                <ForgotPassword>{t("forgotPassword")}</ForgotPassword>
              </Link>
              {
                <Loader>
                  <EightBitLoader {...loaderProps} />
                </Loader>
              }
              <FormButton type="submit" disabled={disabled}>
                {t("login")}
              </FormButton>
              <OAuthButton onClick={handleAuth} disabled={disabled}>
                {t("login_google")}
              </OAuthButton>
              <OAuthButton>
                <a href={schoolAuthLink}>{t("login_42")}</a>
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
              <FormButton disabled={disabled}>{t("signup")}</FormButton>
              <OAuthButton onClick={handleAuth} disabled={disabled}>
                {t("signup_google")}
              </OAuthButton>
              <OAuthButton>
                <a href={schoolAuthLink}>{t("signup_42")}</a>
              </OAuthButton>
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
  margin-top: 70px;
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
const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
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

const ForgotPassword = styled.div`
  color: #f9f9f9;
  cursor: pointer;
`;

export default Login;
