const express = require("express");
const jwt = require("jsonwebtoken");
const app = express();
const bcrypt = require('bcrypt');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const cors = require("cors");

const saltRounds = 10;
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
require('dotenv').config();

const corsOptions = {
    origin: (origin, callback) => {
      if (!origin || origin === 'http://localhost:3000') {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    optionsSuccessStatus: 200
  }
app.use(cors(corsOptions));

const db = mysql.createConnection({
  host     : process.env.HOST,
  user     : process.env.DBUSER,    
  password : process.env.MYSQL_ROOT_PASSWORD,
  database : process.env.DB
});

app.get("/",(req,res)=>{
    db.query('show tables',(error,result)=>{
        if(error) {
            console.log(error);
            res.status(500).send(error);
        }else{
            res.status(200).send(result);
        }
    })
});


const panel = {
    username : "panel",
    password : "password"
};

function isAdmin(req,res,next){
    const { token } = req.body;
    jwt.verify(token,process.env.JWT_KEY,(err,decoded)=>{
        if(err) {
            res.status(401).send({message : "unAuthorized"});
        }else{
            if(decoded.role==="admin") {
                next();
            } else{
                res.status(401).send({message : "unAuthorized"});
            }
        }
    });
}

function isUser(req,res,next) {
    const { token } = req.body; 
    jwt.verify(token,process.env.JWT_KEY,(err,decoded)=>{
        if(err) {
            res.status(401).send({message : "unAuthorized"});
        }else{
            if(decoded.role==="user") {
                next();
            } else{
                res.status(401).send({message : "unAuthorized"});
            }
        }
    });
}


app.post("/user/signup",(req,res)=>{
    const { username,password } = req.body;
    bcrypt.hash(password, saltRounds,(err, hash) => {
        if(err) {
            console.log(err);
            return res.status(500).send({
                message : "Internal Server Error",
                error : err
            });
        }else{
            db.query(`SELECT * FROM user WHERE ?=user.username;`,[username],(error,result)=>{
                if(error) {
                    console.log(err);
                    return res.status(500).send({
                        message : "Internal Server Error",
                        error : error
                    });
                }else{
                    if(result.length>0) {
                        return res.status(409).send({
                            message : "Username Already Taken"
                        });
                    }else {
                        db.query('INSERT INTO user(username,password) VALUES (?,?);',[username,hash],(errorInsertion,resultInsertion)=>{
                            if(errorInsertion) {
                                console.log(errorInsertion);
                                return res.status(500).send({
                                    message : "Error From Server",
                                    error : errorInsertion
                                })
                            }else{
                                return res.status(200).send({
                                    message : "User Registered"
                                });
                            }
                        })
                    }
                }
            })
        }
    });
});

app.post("/user/login",(req,res)=>{
    const { username,password } = req.body;
    // console.log(req.body);
    db.query('SELECT * FROM user WHERE user.username=?',[username],(err,result)=>{
        if(err) {
            return res.status(500).send({
                message : "Internal Server Error",
                error : err
            });
        }else{
            if(result.length<1 || result.length>1) {
                return res.status(404).send({
                    message : "User Not Found"
                });
            }else{
                bcrypt.compare(password,result[0].password,(error,resultCompare)=>{
                    if(error) {
                        return res.status(401).send({message : "Unauthorized"});
                    }else{
                        if(resultCompare) {
                            jwt.sign({username : username,role : result[0].role},process.env.JWT_KEY, {expiresIn : '1h'},(errorJwt,resultJwt)=>{
                                if(errorJwt) {
                                    return res.status(500).send({message : "Error in signing token"});
                                }else{
                                    return res.status(200).send({token : resultJwt,role : result[0].role});
                                }
                            })
                        }else{
                            return res.status(500).send({message : "Error in matching Password"});
                        }
                    }
                });
            }
        }
    })
});

app.post("/admin/signup",(req,res)=>{
    const { username,password } = req.body;
    bcrypt.hash(password, saltRounds,(err, hash) => {
        if(err) {
            return res.status(500).send({
                message : "Internal Server Error"
            });
        }else{
            db.query(`SELECT * FROM admin WHERE ?=admin.adminusername;`,[username],(error,result)=>{
                if(error) {
                    return res.status(500).send({
                        message : "Internal Server Error"
                    });
                }else{
                    if(result.length>0) {
                        return res.status(409).send({
                            message : "Username Already Taken"
                        });
                    }else {
                        db.query('INSERT INTO admin(adminusername,password) VALUES (?,?);',[username,hash],(errorInsertion,resultInsertion)=>{
                            if(errorInsertion) {
                                return res.status(500).send({
                                    message : "Error From Server"
                                })
                            }else{
                                return res.status(200).send({
                                    message : "Admin Registered"
                                });
                            }
                        })
                    }
                }
            })
        }
    });
});

app.post("/admin/login",(req,res)=>{
    const { username,password } = req.body;
    console.log({ username,password });
    db.query('SELECT * FROM admin WHERE admin.adminusername=?',[username],(err,result)=>{
        if(err) {
            return res.status(500).send({
                message : "Internal Server Error"
            });
        }else{
            if(result.length<1 || result.length>1) {
                return res.status(404).send({
                    message : "User Not Found"
                });
            }else{
                bcrypt.compare(password,result[0].password,(error,resultCompare)=>{
                    if(error) {
                        return res.status(401).send({message : "Unauthorized"});
                    }else{
                        if(resultCompare) {
                            jwt.sign({ adminusername : username , role : result[0].role },process.env.JWT_KEY, {expiresIn : '1h'},(errorJwt,resultJwt)=>{
                                if(errorJwt) {
                                    return res.status(500).send({message : "Error in signing token"});
                                }else{
                                    return res.status(200).send({token : resultJwt,role : result[0].role});
                                }
                            })
                        }else{
                            return res.status(500).send({message : "Error in matching Password"});
                        }
                    }
                });
            }
        }
    })
});

app.post("/aproveAdmin",(req,res)=>{
    const { panelusername,password,adminusername } = req.body;
    if(panelusername===panel.username && password === panel.password) {
        db.query(`SELECT * FROM admin WHERE adminusername=?`,[adminusername],(err,result)=>{
            if(err) {
                return res.status(500).send({message : "Internal Server Error"});
            }else{
                if(result.length===0) {
                    return res.status(404).send({message : "No User Found"});
                }else{
                    db.query(`UPDATE admin SET role=? WHERE adminusername=?`,["admin",adminusername],(error,resultUpdate)=>{
                        if(error) {
                            res.status(501).send({message : "Internal Server Error"});
                        }else{
                            res.status(200).send({message : "OK"});
                        }
                    })
                }
            }
        });
    }else{
        res.status(401).send({message : "UnAuthoriized"});
    }
});

app.post("/user/showBooks",isUser,(req,res)=>{
    db.query(`SELECT * FROM books`,(err,result)=>{
        if(err) {
            res.status(500).send({message : "Internal Server Error"});
        }else{
            res.status(200).send(result);
        }
    })
});

app.post("/admin/addBook",isAdmin,(req,res)=>{
    const { bookName,author,publishYear } = req.body;
    db.query(`INSERT INTO books(bookname,author,publishYear) VALUES(?,?,?)`,[bookName,author,publishYear],(err,result)=>{
        if(err) {
            res.status(500).send({message : "UnAuthorized"});
        }else{
            res.status(200).send({message : "ok"});
        }
    })
});

app.post("/admin/showBooks",isAdmin,(req,res)=>{
    db.query(`SELECT * FROM books`,(err,result)=>{
        if(err) {
            return res.status(501).send({message : "Internel Server Error"});
        }else{
            res.status(200).send(result);
        }
    });
});

app.post("/admin/editBook",isAdmin,(req,res)=>{
    const { bookid,bookname,author,publishYear } = req.body;
    console.log(req.body);
    db.query(`UPDATE books SET bookname=?, author=?, publishYear=? WHERE bookid=?`,[bookname,author,publishYear,bookid],(err,result)=>{
        if(err) {
            return res.status(501).send({message : "Internel Server Error"})
        }else{
            res.status(200).send({message : "ok"});
        }
    });
});

app.post("/admin/deleteBook",isAdmin,(req,res)=>{
    const { bookid } = req.body;
    db.query(`DELETE FROM books WHERE bookid=?`,[bookid],(err,result)=>{
        if(err) {
            return res.status(501).send({message : "Internel Server Error"})
        }else{
            res.status(200).send({message : "ok"});
        }
    });
});

app.post("/admin/getabook",isAdmin,(req,res)=>{
    const {id} = req.body;
    db.query(`SELECT * FROM books WHERE bookid=?`,[id],(err,result)=>{
        if(err) {
            return res.status(501).send({message : "Internel Server Error"});
        }else{
            return res.status(200).send({bookid:result[0].bookid,bookname : result[0].bookname,author : result[0].author, publishYear : result[0].publishYear });
        }
    });
});

app.post("/admin/getBooks",isAdmin,(req,res)=> {
    // console.log(req.body);
    const {search} = req.body;
    db.query(`SELECT * FROM books WHERE bookname LIKE '%${search}%'`, [search], (err, result) => {
        if(err) {
            return res.status(501).send({message : "Internel Server Error"});
        }else{
            return res.status(200).send(result);
        }
    })
});

app.listen(process.env.PORT,()=>{
    console.log(`Server Running on PORT ${process.env.PORT}`);
});