const userCollection = "users";
const googleApi =
  "https://www.googleapis.com/oauth2/v1/userinfo?alt=json&access_token=";
const getMySchoolDetailsApi = "https://api.intra.42.fr/v2/me";
const schoolRedirectLink = "http://localhost:3000/schoolAuth";
const clientId =
  "ef6114cc3634836b3c0b8e616e3f1f7cf856af80a8dee0d5593f194b100ad341";
const schoolAuthLink =
  "https://api.intra.42.fr/oauth/authorize?client_id=" +
  clientId +
  "&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2FschoolAuth&response_type=code&state=abcde";
const clientSecret =
  "4c2594f3ba22d3de2c8f215233423b6cfc7ca139af030e745a722fa905a11424";

export {
  userCollection,
  googleApi,
  getMySchoolDetailsApi,
  schoolRedirectLink,
  clientId,
  clientSecret,
  schoolAuthLink,
};
