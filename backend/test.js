const request = require('supertest');
const chai = require('chai'); 
const { expect } = chai;

const app = require('./index.js');

describe('Testing POST /user/login', () => {
    // for correct combination of username and password and user doest exist
  it('should respond with valid HTTP status code', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({ username : "",password : ""});

    expect(response.status).to.equal(200);
  });
  // User not in database
  it('should respond with valid HTTP status code', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({ username : "",password : ""});

    expect(response.status).to.equal(404);
  });
  // for invalid combination of username and password or user exist
  it('should respond with valid HTTP status code', async () => {
    const response = await request(app)
      .post('/user/login')
      .send({ username : "",password : ""});

    expect(response.status).to.equal(404);
  });
});

describe('Testing POST /user/signup', () => {
    // for correct combination of username and password and user doest exist
    it('should respond with valid HTTP status code', async () => {
      const response = await request(app)
        .post('/user/signup')
        .send({ username : "",password : ""});
  
      expect(response.status).to.equal(200);
    });
    // Username already existing
    it('should respond with valid HTTP status code', async () => {
        const response = await request(app)
          .post('/user/signup')
          .send({ username : "",password : ""});
    
        expect(response.status).to.equal(409);
      });
    // for correct combination of username and password and user doest exist
    it('should respond with valid HTTP status code', async () => {
        const response = await request(app)
          .post('/user/signup')
          .send({ username : "",password : ""});
    
        expect(response.status).to.equal(409);
    });
});



describe('Testing POST /admin/signup', () => {
    // for correct combination of username and password and user doest exist
    it('should respond with valid HTTP status code', async () => {
      const response = await request(app)
        .post('/admin/signup')
        .send({ username : "",password : ""});
  
      expect(response.status).to.equal(200);
    });
    // Username already existing
    it('should respond with valid HTTP status code', async () => {
        const response = await request(app)
          .post('/admin/signup')
          .send({ username : "",password : ""});
    
        expect(response.status).to.equal(409);
      });
    // for correct combination of username and password and user doest exist
    it('should respond with valid HTTP status code', async () => {
        const response = await request(app)
          .post('/admin/signup')
          .send({ username : "",password : ""});
    
        expect(response.status).to.equal(409);
    });
});



describe('Testing POST /admin/login', () => {
    // for correct combination of username and password and user doest exist
  it('should respond with valid HTTP status code', async () => {
    const response = await request(app)
      .post('/admin/login')
      .send({ username : "",password : ""});

    expect(response.status).to.equal(200);
  });
  // User not in database
  it('should respond with valid HTTP status code', async () => {
    const response = await request(app)
      .post('/admin/login')
      .send({ username : "",password : ""});

    expect(response.status).to.equal(404);
  });
  // for invalid combination of username and password or user exist
  it('should respond with valid HTTP status code', async () => {
    const response = await request(app)
      .post('/admin/login')
      .send({ username : "",password : ""});

    expect(response.status).to.equal(404);
  });
});

describe('Testing POST /aproveAdmin', () => {
    // for correct username and password and adminname
    it('should respond with valid HTTP status code', async () => {
      const response = await request(app)
        .post('/aproveAdmin')
        .send({ adminName : "",token : ""});
  
      expect(response.status).to.equal(401);
    });
    // for incorrect username and password or adminname doestn exist in table
    it('should respond with valid HTTP status code', async () => {
        const response = await request(app)
          .post('/aproveAdmin')
          .send({ username : "",password : ""});
    
        expect(response.status).to.equal(401);
    });
});

describe('Testing POST /admin/showBooks', () => {
    // correct token
    it('should respond with valid HTTP status code', async () => {
      const response = await request(app)
        .post('/admin/showBooks')
        .send({ token : ""});
  
      expect(response.status).to.equal(200);
    });
    // invalid token or server error
    it('should respond with valid HTTP status code', async () => {
        const response = await request(app)
          .post('/admin/showBooks')
          .send({ token : ""});
    
        expect(response.status).to.equal(401);
    });
});

describe('Testing POST /admin/editBook', () => {
    // for correct combination of inputs
    it('should respond with valid HTTP status code', async () => {
      const response = await request(app)
        .post('/admin/editBook')
        .send({ bookid : 10,bookname : "",author : "",publishYear : "",token : ""});
  
      expect(response.status).to.equal(401);
    });
    // for correct combination of inputs
    it('should respond with valid HTTP status code', async () => {
        const response = await request(app)
          .post('/admin/editBook')
          .send({ bookid : 10,bookname : "",author : "",publishYear : "",token : ""});
    
        expect(response.status).to.equal(401);
    });
});

describe('Testing POST /admin/deleteBook', () => {
    // for correct values of input
    it('should respond with valid HTTP status code', async () => {
      const response = await request(app)
        .post('/admin/deleteBook')
        .send({ bookid : "",token : ""});
      expect(response.status).to.equal(200);
    });
    // for incorrect values of token or bookid
    it('should respond with valid HTTP status code', async () => {
        const response = await request(app)
          .post('/admin/editBook')
          .send({ bookid : "",token : ""});
    
        expect(response.status).to.equal(401);
    });
});

describe('Testing POST /admin/getabook', () => {
    // for correct values of input
    it('should respond with valid HTTP status code', async () => {
      const response = await request(app)
        .post('/admin/getabook')
        .send({ id : "",token : ""});
      expect(response.status).to.equal(200);
    });
    // for incorrect values of token or bookid
    it('should respond with valid HTTP status code', async () => {
        const response = await request(app)
          .post('/admin/getabook')
          .send({ id: "",token : ""});
    
        expect(response.status).to.equal(401);
    });
});

describe('Testing POST /admin/getBooks', () => {
    // for correct value of token
    it('should respond with valid HTTP status code', async () => {
      const response = await request(app)
        .post('/admin/getBooks')
        .send({search : "", token : ""});
      expect(response.status).to.equal(200);
    });
    // for incorrect value of token
    it('should respond with valid HTTP status code', async () => {
        const response = await request(app)
          .post('/admin/getabook')
          .send({ search : "",token : ""});
    
        expect(response.status).to.equal(401);
    });
});




