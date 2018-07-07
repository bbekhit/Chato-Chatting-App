import { ADD_POST, POST_LOADING, GET_POSTS } from "../actions/types";

const initialState = {
  post: {},
  posts: [],
  loading: false
};

const postReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_POST:
      return {
        ...state,
        posts: [action.payload, ...state.posts]
      };

    case POST_LOADING:
      return {
        ...state,
        loading: true
      };
    case GET_POSTS:
      return {
        ...state,
        posts: action.payload,
        loading: false
      };
    default:
      return state;
  }
};

export default postReducer;
