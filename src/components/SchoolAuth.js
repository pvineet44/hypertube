import React, { useEffect } from "react";
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

function SchoolAuth() {
  const params = new URLSearchParams(window.location.search);
  const code = params.get("code");
  const history = useHistory();
  const loggedInUser = useSelector((state) => state.loggedInUser);
  const dispatch = useDispatch();

  useEffect(() => {
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
                history.replace("/home");
              });
          });
      });
    }
  }, []);
  return <div></div>;
}

export default SchoolAuth;
