const initialStateRequest = {
  dataRequest: [],
  isLoading:false,
  modalShow:false
  
};

const requestReducer = (state = initialStateRequest, action) => {
  if (action.type === "UPDATE_DATA_REQUEST") {
    return {
      ...state,
      dataRequest: action.payload,
    };
  }

  if (action.type === "SET_ISLOADING_REQ") {
    return {
      ...state,
      isLoading: action.payload,
    };
  }

  if (action.type === "SET_MODAL_REQ") {
    return {
      ...state,
      modalShow: action.payload,
    };
  }

  return state;
};

export default requestReducer;
