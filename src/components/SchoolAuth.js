import React, { useEffect, useState } from "react";
import { useHistory } from "react-router";
import axios from "../axios";
import db from "../firebase";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../actions/index";
import {
  clientId,
  clientSecret,
  getMySchoolDetailsApi,
  schoolRedirectLink,
} from "../properties";
import { EightBitLoader } from "react-loaders-kit";
import styled from "styled-components";

function SchoolAuth() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const history = useHistory();
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    if (code) {
      const requestOptions = {
        grant_type: "authorization_code",
        client_id: clientId,
        client_secret: clientSecret,
        code: code,
        redirect_uri: schoolRedirectLink,
        state: "abcde",
      };
      axios.post("/oauth/token", requestOptions).then((data) => {
        console.log("DATA", data);
        axios
          .get(getMySchoolDetailsApi, {
            headers: { Authorization: "Bearer " + data.data.access_token },
          })
          .then((res) => {
            console.log(res.data.id);
            db.collection("users")
              .doc(res.data?.id.toString())
              .get()
              .then((snapshot) => {
                console.log(snapshot.data(), data.data.access_token);
                dispatch(
                  login({
                    id: res.data.id,
                    accessToken: data.data.accessToken,
                    authType: "schoolAuth",
                  })
                );
                if (!snapshot.data()) {
                  db.collection("users").doc(res.data?.id.toString()).set({
                    firstName: res.data?.first_name,
                    lastName: res.data?.last_name,
                    userName: res.data?.login,
                    email: res.data?.email,
                    photo: res.data?.image_url,
                  });
                }
                history.replace("/");
              });
          });
      });
    }
  }, []);

  const loaderProps = {
    loading,
    size: 35,
    duration: 1,
    color: "#f9f9f9",
  };

  return (
    <Container>
      <Loader>
        <EightBitLoader {...loaderProps} />
      </Loader>
    </Container>
  );
}

export default SchoolAuth;

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Loader = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
