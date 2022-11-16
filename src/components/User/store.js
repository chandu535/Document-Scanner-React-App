function reducer(state = { data: "" ,error:"",loading: false}, action) {
    switch (action.type) {
      case "FETCH_PENDING":
        return {
            ...state,
            loading: true,
            error: null
        }
      case "FETCH_DATA":
        return {
          ...state,
          data: action.data
        };
      case "FETCH_FAIL":
        return {
          error:action.error
        };
      default:
        return state;
    }
  }
  
  export default reducer;