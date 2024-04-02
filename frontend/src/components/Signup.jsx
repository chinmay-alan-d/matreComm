import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import NavigationBar from './Navbar';
import { useAuth } from '../provider/authProvider';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'

function Signup() {
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
    axios.post(`http://localhost:8000/${auth.state.toLowerCase()}/signup`,{
      username : username,
      password : password
    }).then(response=>{
      navigate("/login");
    }).catch(err=>{
      alert("Internal Server Error");
    });
  };

  const handleLoginClick = () => {
    navigate("/login");
  };

  return (
    <div>
      <NavigationBar />
      <h1>{auth.state} Signup</h1>
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
            Submit
          </Button>
          <br/>
          <br/>
          <Button variant="secondary" onClick={handleLoginClick} style={{ width: '100%' }}>
            Login?
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default Signup;