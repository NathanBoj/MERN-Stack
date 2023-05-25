import express from 'express'
import mysql from 'mysql'
import cors from 'cors'
import jwt from 'jsonwebtoken'; //token

const secretKey = 'your_secret_key';

const app = express()

const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Deep2001!",
    database: "test"
})

app.use(express.json())
app.use(cors())

app.get("/", (req, res) => {
    res.json("hello this is backend")
})

//Reading database, get movies only from same uid
app.get("/movies/:uid", (req, res) => {
    const uid = req.params.uid;
    const q = "SELECT * FROM movies WHERE uid = ?";
    db.query(q, [uid], (err, data) => {
      if (err) return res.json(err);
      return res.json(data);
    });
  });


//Creating data
app.post("/movies", (req, res) => {
    const q = "INSERT INTO movies (`title`,`description`, `rating`, `cover`, `uid`) VALUES (?)"
    const values = [
        req.body.title,
        req.body.description,
        req.body.rating,
        req.body.cover,
        req.body.uid,
    ]
    db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.json(data)
    })
})

//Delete data
app.delete("/movies", (req, res) => {
    const movieID = req.body.id
    const q = "DELETE FROM movies WHERE id = ?"

    db.query(q, [movieID], (err, data) => {
        err ? res.json(err) : res.json("movie removed")
    })
})

//Update data
app.put("/movies/:id", (req, res) => {
    const movieID = req.params.id
    const q = "UPDATE movies SET `title` = ?, `description`=?, `rating`=?, `cover`=? WHERE id = ?";

    const values = [
        req.body.title,
        req.body.description,
        req.body.rating,
        req.body.cover,
    ]

    db.query(q, [...values, movieID], (err, data) => {
        if (err) return res.send(err)
        return res.json(data)
    })
})

//Registering User
app.post('/register', (req, res) => {
    const { username, email, password } = req.body;
    const q = 'INSERT INTO user (username, email, password) VALUES (?, ?, ?)';
    const values = [username, email, password];

    db.query(q, values, (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).json({ message: 'Registration failed' });
        } else {
            res.status(201).json({ message: 'Registration successful' });
        }
    });
});

//Generate login token
function generateToken(userId) {
    const payload = {
      userId: userId,
    };
  
    const options = {
      expiresIn: '1h', // Token expiration time
    };
  
    return jwt.sign(payload, secretKey, options);
  }

//Login user
app.post('/login', (req, res) => {
    const { email, password } = req.body;
    const q = 'SELECT * FROM user WHERE email = ? AND password = ?';
    const values = [email, password];
  
    db.query(q, values, (err, results) => {
      if (err) {
        console.log(err);
        res.status(500).json({ message: 'Login failed' });
      } else {
        if (results.length === 1) {
          const userId = results[0].id;
          const token = generateToken(userId);
          res.status(200).json({ message: 'Login successful', token, userId });
        } else {
          res.status(401).json({ message: 'Invalid credentials' });
        }
      }
    });
  });

app.listen(8800, () => {
    console.log("Connected to backendccccc")
})