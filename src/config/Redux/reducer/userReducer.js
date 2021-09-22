const initialStateUser = {
  dataUser: { user: "admin@admin.com", password: "administrator" },
  isLogin:false
};

const userReducer = (state = initialStateUser, action) => {
  if (action.type === "UPDATE_ISLOGIN") {
    return {
      ...state,
      isLogin: action.payload,
    };
  }

  return state;
};

export default userReducer;
