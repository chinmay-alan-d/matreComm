import React, { useEffect, useState } from "react";
import NavigationBar from "./Navbar";
import { useAuth } from "../provider/authProvider";
import {useNavigate} from 'react-router-dom'
import axios from 'axios'
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const divStyle = {
    position : "relative",
    marginLeft : '44%',
    maxWidth : "250px",
}

const Books = ()=> {
    const auth = useAuth();
    const navigate = useNavigate();
    const [books,setBook] = useState([]);

    useEffect(()=>{
        axios.post(`http://localhost:8000/${auth.state.toLowerCase()}/showBooks`,{
            token : auth.token
        }).then(response=>{
            setBook(response.data);
        }).catch(err=>{
            setBook([]);
        })
    },[auth.token,auth.role,auth.state]);

    useEffect(()=>{
        // console.log(auth.token);
        if( auth.role!=="user" && auth.role!=="admin" && auth.role!=="notaadmin" ) navigate("/login")
    },[auth.token,auth.role,auth.state]);

    return (
        <div>
            <NavigationBar/>
            <br />
            {
                books.length===0 ? <h1>Books Not Found</h1> : <div>
                    {
                        books.map((book,i)=>{
                            console.log(book)
                            return (
                            <div key={i}>
                                
                                <Card className="card border-dark mb-3" style={divStyle} >
                                    <Card.Body>
                                        <Card.Title>{book.bookname}</Card.Title>
                                        <Card.Body>
                                            <Card.Text>{book.author}</Card.Text>
                                            <Card.Text>{book.publishYear}</Card.Text>
                                        </Card.Body>
                                        {
                                            auth.role === "admin" && <Button variant="dark"style = {{position : 'relative',minWidth : '114px'}} onClick={()=>{navigate(`/editabook/${book.bookid}`)}}>Edit</Button>
                                        }
                                    </Card.Body>
                                </Card>
                            </div>);
                        })
                    }
                </div>
            }
        </div>
    )
};

export default Books;