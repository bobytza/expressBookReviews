const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req,res) => {
  const username = req.body.username;
  const password = req.body.password;
    if (!username) {
      return res.status(404).json({message: "Body Username Empty"});
    }
    if (!password) {
      return res.status(404).json({message: "Body Password Empty"});
    }

    let user = users.filter(user => user.username === username);
    console.log(user);

    if (user.length > 0) {
      return res.status(404).json({message: "Username already exists"});
    } else {
      users.push({username, password});
      return res.status(200).send("User successfully registered");
    }
});

// Get the book list available in the shop
public_users.get('/',function (req, res) {
  return res.send(JSON.stringify({books}, null, 4));
});

// Get book details based on ISBN
public_users.get('/isbn/:isbn',function (req, res) {
  return res.send(JSON.stringify(books[req.params.isbn], null, 4));
 });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
  let v = [];
  for (const [key, value] of Object.entries(books)) {
    if (value.author === req.params.author) {
      v.push(value);
    }
  }
  return res.send(JSON.stringify(v, null, 4));
});

// Get all books based on title
public_users.get('/title/:title',function (req, res) {
  let v = [];
  for (const [key, value] of Object.entries(books)) {
    if (value.title === req.params.title) {
      v.push(value);
    }
  }
  return res.send(JSON.stringify(v, null, 4));
});

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
  return res.send(JSON.stringify(books[req.params.isbn].reviews, null, 4));
});

module.exports.general = public_users;
