import React, { useEffect, useState } from "react";
import NavigationBar from "./Navbar";
import { useAuth } from "../provider/authProvider";
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from 'axios'

const ApproveAdmin = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    const [adminName,setadminname] = useState("");
    
    useEffect(()=>{
        if(auth.role!=="admin" || !auth.token) navigate("/login")
    },[auth.role,auth.token,navigate]);

    const handleClick = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:8000/aproveAdmin`,{
            token : auth.token,
            adminName : adminName
        }).then(response=>{
            alert("Status Changed");
        }).catch(err=>{
            alert("Internal Server Error");
            console.log(err);
        })
    }

    return (
        <div>
            <NavigationBar />
            <br />
            <div style={{ maxWidth: '33vw', margin: 'auto' }}>
                <Form>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Type Admin Name</Form.Label>
                    <Form.Control onChange={(e)=>{setadminname(e.target.value)}} type="text" placeholder="Type Admin Name" />
                </Form.Group>
                <Button variant="primary" type="submit" onClick={handleClick}>
                    Submit
                </Button>
                </Form>
            </div>
        </div>
    );
};

export default ApproveAdmin;