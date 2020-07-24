import {
  SET_USER,
  //   SET_ERRORS,
  //   CLEAR_ERRORS,
  LOADING_USER,
  SET_AUTHENTICATED,
  SET_UNAUTHENTICATED,
  LIKE_SCREAM,
  UNLIKE_SCREAM,
} from "../types";
const initialState = {
  authenticated: false,
  loading: false,
  creadentials: {},
  likes: [],
  notifications: [],
};

export default function (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return {
        ...state,
        authenticated: true,
      };
    case SET_UNAUTHENTICATED:
      return initialState;
    case SET_USER:
      return {
        authenticated: true,
        loading: false,
        ...action.payload,
      };
    case LOADING_USER:
      return {
        ...state,
        loading: true,
      };
    case LIKE_SCREAM:
      return {
        ...state,
        likes: [
          ...state.likes,
          {
            userHandle: state.creadentials.handle,
            screamId: action.payload.screamId,
          },
        ],
      };

    case UNLIKE_SCREAM:
      return {
        ...state,
        likes: state.likes.fill(
          (like) => like.screamId === action.payload.screamId
        ),
      };
    default:
      return state;
  }
}
