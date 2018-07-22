import {
  ADD_POST,
  POST_LOADING,
  GET_POSTS,
  GET_POST,
  DELETE_POST,
  UPDATE_POST
} from "../actions/types";

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

    case GET_POST:
      return {
        ...state,
        post: action.payload,
        loading: false
      };

    case DELETE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== action.payload)
      };

    case UPDATE_POST:
      // Create a copy of the current array of posts
      const currentPostToUpdate = [...state.posts];
      // Determine at which index in posts array is the post to be deleted
      const indexToUpdate = currentPostToUpdate.findIndex(function(post) {
        return post.id === action.payload.id;
      });
      // Create a new post object with the new values and with the same array index of the item we want to replace. To achieve this we will use ...spread but we could use concat methos too
      const newPostToUpdate = {
        ...currentPostToUpdate[indexToUpdate],
        text: action.payload.postData.text
      };
      // This Log has the purpose to show you how newPostToUpdate looks like
      // console.log("what is it newPostToUpdate", newPostToUpdate);
      //use slice to remove the book at the specified index, replace with the new object and concatenate witht he rest of items in the array
      return {
        posts: [
          ...currentPostToUpdate.slice(0, indexToUpdate),
          newPostToUpdate,
          ...currentPostToUpdate.slice(indexToUpdate + 1)
        ]
      };

    case "EDIT_EXPENSE":
      return state.map(expense => {
        if (expense.id === action.id) {
          return {
            ...expense,
            ...action.updates
          };
        } else {
          return expense;
        }
      });
    default:
      return state;
  }
};

export default postReducer;
