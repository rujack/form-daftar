import axios from "axios";

export const setDataForm = () => (dispatch) => {
  axios
    .get(`http://192.168.43.238:4000/form/posts`)
    .then((result) => {
      const responseApi = result.data;
      dispatch({
        type: "UPDATE_DATA_FORM",
        payload: responseApi.data,
      });
      dispatch({
        type: "UPDATE_PAGE_FORM",
        payload: {
          page: responseApi.curent_page,
          totalPage: Math.ceil(responseApi.total_data / responseApi.per_page),
          totalPost: responseApi.total_data
        },
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
