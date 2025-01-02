import React, { useState,useContext } from 'react'
import axios from "axios"
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../helper/AuthContex';
function Login() {
  let navigate = useNavigate()
  const [username, setUsername] = useState("murat")
  const [password, setPassword] = useState("123")
  const { setAuthState } = useContext(AuthContext)
  const login = () => {
    const data = { username: username, password: password }
    axios.post("http://localhost:3001/auth/login", data).then((response) => {
      console.log(response.data)
      if (response.data.error) alert(response.data.error)
      else {
        localStorage.setItem("accessToken", response.data.token)
        setAuthState({username:response.data.username,id:response.data.id,status:true})                                                    
       
        navigate("/")
      }
    })
  }
 
  return (
    <div className='loginContainer'>
      <label>Usernaem</label>
      <input type="text" autoComplete='off' onChange={(event) => { setUsername(event.target.value) }}  value={username} name="username" />
      <label>password</label>
      <input type="password" onChange={(event) => { setPassword(event.target.value) }} value={password} name="password" />
      <button onClick={login} type='submit'>Login</button>

    </div>
  )
}

export default Login