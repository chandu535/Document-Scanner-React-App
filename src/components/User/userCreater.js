import { FETCH_USERS_FAILURE, FETCH_USERS_REQUEST, FETCH_USERS_SUCCESS } from "./USerType"

export const fetchUsersRequest=()=>
{
    return{
        type:FETCH_USERS_REQUEST
    }
}

export const fetchUsersSuccess=(users)=>
{
    return{
        type:FETCH_USERS_SUCCESS,
        payload:users
    }
}
export const fetchUsersFailure=(error)=>
{
    return{
        type:FETCH_USERS_FAILURE,
        payload:error
    }
}
export const fetchUsers = () => {
    return function (dispatch) {
      dispatch(fetchUsersRequest())
      axios
        .get('https://jsonplaceholder.typicode.com/users')
        .then(response => {
          // response.data is the users
          const users = response.data.map(user => user.id)
          dispatch(fetchUsersSuccess(users))
        })
        .catch(error => {
          // error.message is the error message
          dispatch(fetchUsersFailure(error.message))
        })
    }
  }