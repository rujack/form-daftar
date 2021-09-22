const initialStateHome = {
  dataForm: [],
  data: {
    page: 1,
    totalPage: 1,
    totalPost: 1,
  },
};

const homeReducer = (state = initialStateHome, action) => {
  if (action.type === "UPDATE_DATA_FORM") {
    return {
      ...state,
      dataForm: action.payload,
    };
  }

  if (action.type === "UPDATE_PAGE_FORM") {
      return {
        ...state,
        data: action.payload
      };
    }

  return state;
};

export default homeReducer;
