import React, { useEffect, useState } from "react";
import NavigationBar from "./Navbar";
import { useAuth } from "../provider/authProvider";
import axios from 'axios'
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import { useNavigate } from 'react-router-dom';

const EditABook = () => {
    const auth = useAuth();
    const [bookid,setbookid] = useState();
    const [bookname,setbookname] = useState();
    const [author,setauthor] = useState();
    const [publishYear,setpublishyear] = useState();
    const navigate = useNavigate();

    const handleBookNameChange = (e) => {
        setbookname(e.target.value);
    };

    const handleAuthorChange = (e) => {
        setauthor(e.target.value);
    };

    const handlePublishYearChange = (e) => {
        setpublishyear(e.target.value);
    };

    useEffect(()=>{
        if(auth.role!=="admin" || !auth.token) navigate("/login")
    },[auth.role,auth.token,navigate]);

    const handleSubmit = (e) => {
        e.preventDefault();
        axios.post('http://localhost:8000/admin/editBook',{
            token : auth.token,
            bookid : bookid,
            bookname : bookname,
            author : author,
            publishYear : publishYear
        }).then(response=> {
            alert("Book has been edited.")
            console.log(response);
        }).catch(err=> {
            alert("Internal Server Error");
        })
    };

    useEffect(()=>{
        const id = window.location.href.substring(window.location.href.lastIndexOf("/") + 1);
        setbookid(id);
        axios.post(`http://localhost:8000/admin/getabook`,{
            token : auth.token,
            id : id
        }).then(response=>{
            console.log(response);
            setbookname(response.data.bookname);
            setauthor(response.data.author);
            setpublishyear(response.data.publishYear);
        }).catch(err=>{
            alert("Internal Server Error or Book ID not found");
            console.error(err);
        })
    },[auth.token]);

    return (
        <div>
            <NavigationBar />
            <br />
            <div style={{ maxWidth: '33vw', margin: 'auto' }}>
                <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3" controlId="formBasicEmail">
                    <Form.Label>Book Name</Form.Label>
                    <Form.Control type="text" placeholder="Enter Book Name" value={bookname} onChange={handleBookNameChange} autoComplete='on'/>
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

export default EditABook;