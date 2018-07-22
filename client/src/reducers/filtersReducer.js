// Filters Reducer

const initialState = {
  searchText: ""
};

const filtersReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_TEXT_FILTER":
      return {
        ...state,
        searchText: action.payload
      };

    default:
      return state;
  }
};

export default filtersReducer;
