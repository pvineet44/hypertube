import React, { useEffect } from "react";
import axios from "../axios";

import styled from "styled-components";
function Home(props) {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");

  useEffect(() => {
    console.log("IN HOME", params, "++", code, "++", window.location);
    if (code) {
      const requestOptions = {
        grant_type: "authorization_code",
        client_id:
          "ef6114cc3634836b3c0b8e616e3f1f7cf856af80a8dee0d5593f194b100ad341",
        client_secret:
          "4c2594f3ba22d3de2c8f215233423b6cfc7ca139af030e745a722fa905a11424",
        code: code,
        redirect_uri: "http://localhost:3000/schoolAuth",
        state: "abcde",
      };
      axios.post("/oauth/token", requestOptions).then((data) => {
        console.log("DATA", data);
        axios
          .get("https://api.intra.42.fr/v2/me", {
            headers: { Authorization: "Bearer " + data.data.access_token },
          })
          .then((res) => console.log(res));
      });
    }
  }, []);
  return <Container>HOME</Container>;
}

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  justify-content: center;
  align-items: center;
  color: red;
  background: white;
`;

export default Home;
