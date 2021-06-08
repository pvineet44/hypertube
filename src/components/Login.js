import { useState } from "react";
import styled from "styled-components";
import { auth, provider } from "../firebase";

const Login = (props) => {
  const [loginStatus, setLoginStatus] = useState(0);
  const [showLoginForm, setShowLoginForm] = useState(true);
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  return (
    <Container>
      <Content>
        {loginStatus ? (
          <div onClick={handleAuth}>Logout</div>
        ) : (
          <div>
            {/* <div onClick={handleAuth}>Login</div> */}
            <div onClick={handleEmailPassAuth}>Email/pass login</div>
          </div>
        )}
        <FormContainer>
          <FormContainerHeader>
            <LoginOrSignUp
              selected={showLoginForm}
              onClick={() => setShowLoginForm(true)}
            >
              Login
            </LoginOrSignUp>
            <LoginOrSignUp
              selected={!showLoginForm}
              onClick={() => setShowLoginForm(false)}
            >
              Sign Up
            </LoginOrSignUp>
          </FormContainerHeader>
          {showLoginForm ? (
            <LoginForm onSubmit={handleEmailPassAuth}>
              <Input
                required
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Input
                required
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <FormButton type="submit">Login</FormButton>
              <OAuthButton onClick={handleAuth}>G</OAuthButton>
              <OAuthButton>42</OAuthButton>
            </LoginForm>
          ) : (
            <SignUpForm onSubmit={handleEmailPassSignUp}>
              <Input
                required
                type="text"
                placeholder="First Name"
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
              />
              <Input
                required
                type="text"
                placeholder="Last Name"
                onChange={(e) => setLastName(e.target.value)}
                value={lastName}
              />
              <Input
                required
                type="text"
                placeholder="Username"
                onChange={(e) => setUserName(e.target.value)}
                value={userName}
              />
              <Input
                required
                type="email"
                placeholder="Email"
                onChange={(e) => setEmail(e.target.value)}
                value={email}
              />
              <Input
                required
                type="password"
                placeholder="Password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
              />
              <FormButton>Sign Up</FormButton>
              <OAuthButton onClick={handleAuth}>G</OAuthButton>
              <OAuthButton>42</OAuthButton>
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

const CTA = styled.div`
  max-width: 650px;
  width: 100%;
  display: flex;
  flex-direction: column;
`;

const CTALogoOne = styled.img`
  margin-bottom: 12px;
  max-width: 600px;
  min-height: 1px;
  display: block;
  width: 100%;
`;

const SignUp = styled.a`
  font-weight: bold;
  color: #f9f9f9;
  background-color: #0063e5;
  margin-bottom: 12px;
  width: 100%;
  letter-spacing: 1.5px;
  font-size: 18px;
  padding: 16.5px 0;
  border: 1px solid transparent;
  border-radius: 4px;

  &:hover {
    background-color: #0483ee;
    cursor: pointer;
  }
`;

const Description = styled.p`
  color: hsla(0, 0%, 95.3%, 1);
  font-size: 11px;
  margin: 0 0 24px;
  line-height: 1.5;
  letter-spacing: 1.5px;
`;

const CTALogoTwo = styled.img`
  max-width: 600px;
  margin-bottom: 20px;
  display: inline-block;
  vertical-align: bottom;
  width: 100%;
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
  margin-botton: 10px;
  width: 100%;
  color: white;
  ::-webkit-input-placeholder {
    color: white;
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
`;

const OAuthButton = styled.button`
  background: #20325a;
  margin-top: 20px;
  width: 100%;
  height: 40px;
  color: white;
  border: none;
  font-weight: bold;
`;
export default Login;
