const userReducer = (state = null, action) => {
  switch (action.type) {
    case "LOGIN":
      return action.user;
    case "LOGOUT":
      return null;
    default:
      return null;
  }
};

export default userReducer;
