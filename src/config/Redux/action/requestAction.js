import axios from "axios";

export const setLoadingReq = (payload) => {
  return { type: "SET_LOADING_REQ", payload };
};

export const setMoalReq = (payload) => {
  return { type: "SET_MODAL_REQ", payload };
};

export const setDataRequest = () => (dispatch) => {
  axios
    .get(`https://apidaftar.herokuapp.com/form/posts/request`)
    .then((result) => {
      const responseApi = result.data;
      dispatch({
        type: "UPDATE_DATA_REQUEST",
        payload: responseApi.data,
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

export const updateToAPIForm = (form, id) => (dispatch) => {
  dispatch({ type: "SET_LOADING_REQ", payload: true });
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      setuju: form.setuju,
      pesan: form.pesan,
    });
    axios
      .put(`https://apidaftar.herokuapp.com/form/post/${id}`, data, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        console.log("Update success", res);
        dispatch(setDataRequest())
        dispatch({ type: "SET_LOADING_REQ", payload: false });
        dispatch({ type: "SET_MODAL_REQ", payload: false });
        resolve(res);
      })
      .catch((err) => {
        dispatch({ type: "SET_LOADING_REQ", payload: false });
        console.log("error", err);
      });
  });
};