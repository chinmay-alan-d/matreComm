import React,{ useEffect, useState } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../provider/authProvider';
import NavigationBar from './Navbar';
import Form from 'react-bootstrap/Form';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';

const divStyle = {
    position : "relative",
    marginLeft : '44%',
    maxWidth : "250px",
}

const EditABook =()=> {
    const [search, setSearch] = useState('');
    const [books,setbooks] = useState([]);
    const auth = useAuth();
    const navigate = useNavigate();

    const handleSearch = (event) => {
      setSearch(event.target.value)
      if(search.length>0) {
            axios.post('http://localhost:8000/admin/getBooks',{
            token : auth.token,
            search : search
        }).then( (response)=>{
            setbooks(response.data);
            console.log(books);
        }).catch(err=>{
            console.log(err);
        })
      }
    }
    useEffect(()=>{
        if(auth.role!=="admin" || !auth.token) navigate("/login")
    },[auth.role,auth.token,navigate]);

    return (
    <div>
        <NavigationBar/>
        <div style={{ maxWidth: '33vw', margin: 'auto' }}>
            <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>Book Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Book Name" value={search} onChange={handleSearch} autoComplete='on'/>
            </Form.Group>
        </div>
        <div>
          {
            books.map((book,i)=>{
                const deleteBook = () => {
                    axios.post('http://localhost:8000/admin/deleteBook',{
                        token : auth.token,
                        bookid : book.bookid
                    }).then(response=>{
                        alert("Deleted");
                        setbooks(books.filter(e=>e.bookid!==book.bookid));
                    }).catch(err=>{
                        alert("Got Err");
                    })
                }
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
                                auth.role === "admin" && <Button variant="dark"style = {{position : 'relative',minWidth : '114px'}} onClick={deleteBook}>Delete</Button>
                            }
                        </Card.Body>
                    </Card>
                </div>);
            })
          }
        </div>
    </div>
  )
}

export default EditABook;