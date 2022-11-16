import * as React from 'react';
import {Stack,TextField} from '@mui/material';
import Button from '@mui/material/Button';
import {Typography} from '@mui/material';
import { useState } from "react";


export default function HomePage() {

  const [user,setUser]=useState("");
  const [password,setPassword]=useState("");


  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(user)
    console.log(password)
    setUser("")
    setPassword("")
var request = new XMLHttpRequest();

request.open('POST', 'https://dev-api.labsquire.com/v1.0/signin');

request.setRequestHeader('Content-Type', 'application/json');
request.setRequestHeader('Accept', 'application/json');

request.onreadystatechange = function () {
  if (this.readyState === 4) {
    console.log('Status:', this.status);
    console.log('Headers:', this.getAllResponseHeaders());
    console.log('Body:', this.responseText);
  }
};

var body = {
  "username": user,
  "password": password
};

request.send(body);
  }


    return (
      <div className='form'>
        <div className='headtag'><Typography variant='h4'>POSTMAN</Typography></div>
        <Stack direction="column" spacing={4}>
        <TextField label="Name" variant='filled' required onChange={(e) => setUser(e.target.value)} ></TextField>
        <TextField label="Password" variant='filled' required onChange={(e) => setPassword(e.target.value)} ></TextField>
        <Stack display="block">
        <Button variant='contained' size='small' onClick={handleSubmit}>LOGIN</Button>
        </Stack>
        </Stack>
        </div>
        
     
    )
  }


