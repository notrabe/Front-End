import { axiosWithAuth } from "../utils/axiosWithAuth";

export const LOGIN_START = "LOGIN_START";
export const FETCH_LOGIN_SUCCESS = "FETCH_LOGIN_SUCCESS";

export const FETCH_HOWTOS_START = 'FETCH_HOWTOS_START'
export const FETCH_HOWTOS_SUCCESS = 'FETCH_HOWTOS_SUCCESS'
export const SET_USER_ID = 'SET_USER_ID'

export const FETCH_SPECIFIC_HOWTO = 'FETCH_SPECIFIC_HOWTO'

export const fetchHowTos = (id) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_START });
    axiosWithAuth()
      .get(`/api/howtos`) //need to add an endpoint
      .then((res) => {
        console.log(res);
        dispatch({ type: FETCH_LOGIN_SUCCESS, payload: res.data });
        localStorage.setItem("token", res.data.token);
      })
      .catch((err) => console.log(err, "teehee"));
  };
};

export const signUp = (client) => {
  return (dispatch) => {
    dispatch({ type: LOGIN_START });
    axiosWithAuth()
      .post("/api/auth/register", client) //need an endpoint, might need 2, one for creator, one for user
      .then((res) => {
        console.log(res);
        dispatch({ type: FETCH_LOGIN_SUCCESS, payload: res.data });
        localStorage.setItem("token", res.token);
      })
      .catch((err) => err);
  };
};

export const xyz = (id) => (dispatch) => {
  // console.log('id', id)
  axiosWithAuth()
  .get(`/api/howtos/` + id )
  .then(res => {
    dispatch({ type: FETCH_SPECIFIC_HOWTO, payload:res.data.howto})
  })
  .catch((err) => console.log(err));
};

export const DELETE_HOW_TO = "DELETE_HOW_TO";
export const DELETE_HOW_TO_SUCCESS = "DELETE_HOW_TO_SUCCESS";
export const DELETE_HOW_TO_FAILURE = "DELETE_HOW_TO_FAILURE";

export const deleteHowTo = (id) => (dispatch) => {
  dispatch({type: DELETE_HOW_TO});
  axiosWithAuth()
  .delete(`/api/howtos/${id}`)
  .then(res => {
    dispatch({ type: DELETE_HOW_TO_SUCCESS, payload: id})
  })
  .catch(err => {
    dispatch({ type: DELETE_HOW_TO_FAILURE, payload: err.message})
  })
};

export const setUserId = (props) => (dispatch) => {
  dispatch({
    type: SET_USER_ID, payload:props.id
  })
}

export const EDIT_HOWTO = 'EDIT_HOWTO'
export const EDIT_HOWTOSUCCESS = 'EDIT_HOWTOSUCCESS'

// export const editHowTo = id => dispatch => {
//   dispatch({type: EDIT_HOWTO})
//   axiosWithAuth()
//   .put(`/api/howtos/${id}`, payload)
// }
