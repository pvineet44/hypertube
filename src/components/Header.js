import React, { useState } from "react";
import styled from "styled-components";
import i18n from "../translations/i18n";
import { useTranslation } from "react-i18next";
import "../translations/i18n";
import { Link } from "react-router-dom";
import { login, logout } from "../actions/index";
import { useHistory } from "react-router";
import { auth } from "../firebase";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function Header({ lang, changeLang }) {
  const [user, setUser] = useState('null');
  const userPhoto =
    'https://lh3.googleusercontent.com/ogw/ADea4I7uJL9L2qPYFZW04HUbiOmCrBbLZ3dKAwbCml87=s192-c-mo';
  const userName = 'VP';
  const { t } = useTranslation();
  const history = useHistory();
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const dispatch = useDispatch();
  const signout = () => {
    console.log('signout');
    if (loggedInUser) {
      auth
        .signOut()
        .then(() => {
          // dispatch(setSignOutState());
          // history.push("/");
          console.log("LO");
          dispatch(logout());
          history.push("/");
        })
        .catch((err) => alert(err.message));
    }
  };

  return (
    <Nav>
      <Logo>
        <img src="/images/logo.svg" alt="Disney+" />
      </Logo>
      <RightSection>
        <Language>
          {lang}
          <i className='fa fa-chevron-down'></i>
          <LanguageDropDown>
            <span onClick={() => changeLang('en')}>EN</span>
            <span onClick={() => changeLang('fr')}>FR</span>
          </LanguageDropDown>
        </Language>
        {loggedInUser ? (
          <SignOut>
            <Link>
            <UserImg src={userPhoto} alt={userName} />
            </Link>
            <DropDown>
              <span onClick={signout}>Sign out</span>
            </DropDown>
          </SignOut>
        ) : (
          <Link to="/">
            <Login>{t("loginSignup")} </Login>
          </Link>
        )}
      </RightSection>
    </Nav>
  );
}

const RightSection = styled.div`
  display: flex;
  align-items: center;
`;

const Nav = styled.nav`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 70px;
  background-color: #090b13;
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 0 36px;
  letter-spacing: 16px;
  z-index: 3;
`;

const Logo = styled.a`
  padding: 0;
  width: 80px;
  margin-top: 4px;
  max-height: 70px;
  font-size: 0;
  display: inline-block;
  img {
    display: block;
    width: 100%;
  }
  body {
    color: #f9f9f9;
  }
`;

const Login = styled.a`
  background-color: rgba(0, 0, 0, 0.6);
  padding: 8px 16px;
  text-transform: uppercase;
  letter-spacing: 1.5px;
  border: 1px solid #f9f9f9;
  border-radius: 4px;
  transition: all 0.2s ease 0s;

  &:hover {
    background-color: #f9f9f9;
    color: #000;
    border-color: transparent;
  }
`;

const LanguageDropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 52px;
  opacity: 0;
  letter-spacing: 1px;
  display: flex;
  flex-direction: column;
  span {
    margin: 2px;
  }
`;

const DropDown = styled.div`
  position: absolute;
  top: 48px;
  right: 0px;
  background: rgb(19, 19, 19);
  border: 1px solid rgba(151, 151, 151, 0.34);
  border-radius: 4px;
  box-shadow: rgb(0 0 0 / 50%) 0px 0px 18px 0px;
  padding: 10px;
  font-size: 14px;
  letter-spacing: 3px;
  width: 90px;
  opacity: 0;
  letter-spacing: 1px;
  display: flex;
  flex-direction: column;
  span {
    margin: 2px;
  }
`;

const UserImg = styled.img`
  height: 100%;
`;

const Language = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;
  letter-spacing: 1px;
  text-transform: uppercase;
  margin-right: 18px;

  &:hover {
    ${LanguageDropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

const SignOut = styled.div`
  position: relative;
  height: 48px;
  width: 48px;
  display: flex;
  cursor: pointer;
  align-items: center;
  justify-content: center;

  ${UserImg} {
    border-radius: 50%;
    width: 100%;
    height: 100%;
  }

  &:hover {
    ${DropDown} {
      opacity: 1;
      transition-duration: 1s;
    }
  }
`;

export default Header;
