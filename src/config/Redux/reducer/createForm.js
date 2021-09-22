const initialState = {
  form: {
    nim: "",
    nama_depan: "",
    nama_belakang: "",
    email_1: "",
    email_2: "",
    password: "",
    jenis_email: "",
    no_hp: "",
  },
  isLoading: false,
  alert: {
    kode: "",
    messege: "",
    variant: "",
    show: false,
  },
};

const createFormReducer = (state = initialState, action) => {
  if (action.type === "SET_FORM_DATA") {
    return {
      ...state,
      form: {
        ...state.form,
        [action.formType]: action.formValue,
      },
    };
  }

  if (action.type === "SET_LOADING") {
    return {
      ...state,
      isLoading: action.payload,
    };
  }

  if (action.type === "SET_ALERT") {
    return {
      ...state,
      alert: {
        ...state.alert,
        [action.alertType]: action.alertValue,
      },
    };
  }

  return state;
};

export default createFormReducer;
