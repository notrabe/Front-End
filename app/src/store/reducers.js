import { LOGIN_START, 
  FETCH_LOGIN_SUCCESS, 
  FETCH_HOWTOS_START,
  FETCH_HOWTOS_SUCCESS,
  SET_USER_ID,
  FETCH_SPECIFIC_HOWTO } from "./actions";

const initialState = {
  howTos: [],
  isLoading: false,
  data: "",
  user_id:"",
};

export const reducer = (state = initialState, action) => {
  console.log('message', action)
  switch (action.type) {
    case LOGIN_START:
      return {
        ...state,
        isLoading: true,
      };
    case FETCH_LOGIN_SUCCESS:
      return {
        ...state,
        isLoading: false,
        data: action.payload,
      };
      case FETCH_HOWTOS_START:
        return {
          ...state,
          isLoading: true,
          error: ''
        };
      case FETCH_HOWTOS_SUCCESS:
        console.log(action.payload);
        return {
          ...state,
          howTos: action.payload,
          isLoading: false,
        };

      case SET_USER_ID:
        return {
          ...state,
          user_id: action.payload,
        }
      case FETCH_SPECIFIC_HOWTO:
        return {
          ...state,
          howTo:action.payload,
        }
        default:
        return state
  }
};