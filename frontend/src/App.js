import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css'
import { Route,Routes } from "react-router-dom";
import React from 'react';
import Login from './components/Login';
import Books from './components/Books';
import AddBook from './components/AddBook';
import DeleteBook from './components/DeleteBook';
import EditBook from './components/EditBook';
import Signup from './components/Signup';
import EditABook from './components/EditABook';
import LandingPage from './components/LandingPage';
import ApproveAdmin from './components/ApproveAdmin';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path='/' element={<LandingPage/>}/>
        <Route path='/books' element={<Books/>}/>
        <Route path="/addbook" element={<AddBook/>}/>
        <Route path="/deletebook" element={<DeleteBook/>}/>
        <Route path='/editbook' element={<EditBook/>}/>
        <Route path='/editabook/:id' element={<EditABook/>}/>
        <Route path='/login' element={<Login/>}/>
        <Route path='/signup' element={<Signup/>}/>
        <Route path='/approveadmin' element={<ApproveAdmin/>}/>
      </Routes>
    </div>
  );
}

export default App;