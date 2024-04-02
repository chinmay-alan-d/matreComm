import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavigationBar from './Navbar';
import { useAuth } from '../provider/authProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Login() {
  const [username, setusername] = useState('');
  const [password, setPassword] = useState('');
  const auth = useAuth();
  const navigate = useNavigate();

  const handleUsernameChange = (event) => {
    setusername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`http://localhost:8000/${auth.state.toLowerCase()}/login`,{
      username : username,
      password : password
    }).then(response=>{
      if(response.data.role==="admin") {
        auth.setState("Admin");
      }else{
        auth.setState("User");
      }
      auth.setToken(response.data.token);
      auth.setRole(response.data.role);
      if(response.data.role==="notadmin") {
        alert("You are not yet admin contact administration");
      }
      navigate("/books");
    }).catch(err=>{
      alert("User not Found or username and password mismatch");
    })
  };

  const handleSignupClick = () => {
    navigate("/signup");
  };

  return (
    <div>
      <NavigationBar />
      <h1>{auth.state} Login</h1>
      <br />
      <div style={{ maxWidth: '33vw', margin: 'auto' }}>
        <Form onSubmit={handleSubmit}>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <Form.Label>UserName</Form.Label>
            <Form.Control type="text" placeholder="UserName" value={username} onChange={handleUsernameChange} autoComplete='on'/>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" placeholder="Password" value={password} onChange={handlePasswordChange} />
          </Form.Group>
          <Button variant="primary" type="submit" style={{ width: '100%' }}>
            Login
          </Button>
          <br/>
          <br/>
          <Button variant="secondary" onClick={handleSignupClick} style={{ width: '100%' }}>
            Signup?
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Login;
