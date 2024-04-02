import React, { useEffect, useState } from "react";
import NavigationBar from "./Navbar";
import { useAuth } from "../provider/authProvider";
import { useNavigate } from "react-router-dom";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import axios from "axios";

const AddBook = () => {
    const auth = useAuth();
    const navigate = useNavigate();
    // bookName,author,publishYear
    const [bookName,setbookName] = useState("");
    const [author,setauthor] = useState("");
    const [publishYear,setpublishYear] = useState("");

    const handleBookNameChange = (e) => {
        setbookName(e.target.value);
    };

    const handleAuthorChange = (e) => {
        setauthor(e.target.value);
    };

    const handlePublishYearChange = (e) => {
        setpublishYear(e.target.value);
    };

    const handleSubmit = (e)=> {
        e.preventDefault();
        axios.post(`http://localhost:8000/admin/addBook`,{
            bookName,author,publishYear,token : auth.token
        }).then(response=>{
            alert("Book Added");
        }).catch(err=>{
            alert("Internal Server Error");
        })
    }

    useEffect(()=>{
        if(auth.role!=="admin" || !auth.token ) navigate("/login")
    },[auth.role,auth.token,navigate]);

    return (
        <div>
            <NavigationBar />
            <br />
            <div style={{ maxWidth: '33vw', margin: 'auto' }}>
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Book Name" value={bookName} onChange={handleBookNameChange} autoComplete='on'/>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Author</Form.Label>
                    <Form.Control type="text" placeholder="Enter  Author" value={author} onChange={handleAuthorChange} />
                </Form.Group>
                <Form.Group className="mb-3" controlId="formBasicPassword">
                    <Form.Label>Publishing Year</Form.Label>
                    <Form.Control type="text" placeholder="Enter Publish Year" value={publishYear} onChange={handlePublishYearChange} />
                </Form.Group>
                <Button variant="primary" type="submit" style={{ width: '100%' }}>
                    Submit
                </Button>
                </Form>
            </div>
        </div>
      );
};

export default AddBook;