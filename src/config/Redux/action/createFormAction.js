import axios from "axios";

export const setForm = (formType, formValue) => {
  return { type: "SET_FORM_DATA", formType, formValue };
};

export const setAlert = (alertType, alertValue) => {
  return { type: "SET_ALERT", alertType, alertValue };
};

export const setLoading = (payload) => {
  return { type: "SET_LOADING", payload };
};

export const postToAPIForm = (form) => (dispatch) => {
  dispatch({ type: "SET_LOADING", payload: true });
  return new Promise((resolve, reject) => {
    const data = JSON.stringify({
      nim: form.nim,
      nama_depan: form.nama_depan,
      nama_belakang: form.nama_belakang,
      email_1: form.email_1,
      email_2: form.email_2,
      password: form.password,
      jenis_email: form.jenis_email,
      no_hp: form.no_hp,
    });

    axios
      .post("https://apidaftar.herokuapp.com/form/post", data, {
        headers: {
          "content-type": "application/json",
        },
      })
      .then((res) => {
        dispatch({ type: "SET_LOADING", payload: false });
        dispatch(setAlert("variant", "success"));
        dispatch(setAlert("show", true));
        dispatch(setAlert("messege", `Berhasil Mengupload Data, Simpan Kode : ${res.data.data._id}`));
        console.log("success", res);
        resolve(res);
      })
      .catch((err) => {
        dispatch({ type: "SET_LOADING", payload: false });
        dispatch(setAlert("variant", "danger"));
        dispatch(setAlert("show", true));
        dispatch(setAlert("messege", "Gagal Mengupload Data"));
        console.log("error", err);
      });
  });
};

