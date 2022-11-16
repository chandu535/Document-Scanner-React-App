import { useState } from "react";
import { useNavigate } from "react-router-dom"

//importing react-redux selectors
import { useDispatch, useSelector } from "react-redux";

//importing axios to fetch the data
import axios from "axios";

import { Stack, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';


function UserContainer() {

  const content = useSelector(state => state);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let array = content.data

  const [user, setUser] = useState("");
  const [passwrd, setPassword] = useState("");

  function getData() {
    return dispatch => {
      dispatch({ type: "FETCH_PENDING" })
      axios.post("https://dev-api.labsquire.com/v1.0/signin", {
        "username": user,
        "password": passwrd
      })
        .then(res =>
          dispatch({
            type: "FETCH_DATA",
            data: res.data
          })
        )
        .catch(error =>
          dispatch({
            type: "FETCH_FAIL",
            error: error.message
          })
        );
    };
  }

  function onFetchdata() {
    dispatch(getData());
    localStorage.setItem('userName', user)

  }

  if (array.success === true) {
    navigate("/home")
    localStorage.setItem('access_token', array.access_token)
  }

  return (
    <div className="App">
      <div className='form'>
        <div className='headtag'><Typography variant='h4'>LOGIN</Typography></div>
        <Stack direction="column" spacing={7}>
          <TextField label="Name" variant='filled' required onChange={(e) => setUser(e.target.value)} ></TextField>
          <TextField label="Password" variant='filled' required onChange={(e) => setPassword(e.target.value)} ></TextField>
          <Stack display="block">
            <Button variant='contained' size='small' onClick={onFetchdata} >LOGIN</Button>
          </Stack>
        </Stack>
      </div>
      {content.loading === true && (
        <Box sx={{ display: 'flex', flexDirection: 'row', marginLeft: 85, zIndex: -5, backgroundColor: "white", opacity: 0.6 }}>
          <CircularProgress />
        </Box>
      )}

    </div>

  )
}

export default UserContainer;