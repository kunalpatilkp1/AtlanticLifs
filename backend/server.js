const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const cors = require('cors'); 

const app = express();
app.use(bodyParser.json());
app.use(cors()); // Enable CORS


const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'virtual_agent' 
});


db.connect((err) => {
    if (err) {
        console.error('MySQL connection error:', err);
        return; 
    }
    console.log('MySQL connected...');
});


app.post('/submit', (req, res) => {
    const { name, email, phone, enquiry } = req.body;

    
    if (!name || !email || !phone || !enquiry) {
        return res.status(400).send({ message: 'All fields are required!' });
    }

    
    const sql = `INSERT INTO user (name, email, phone, enquiry) VALUES (?, ?, ?, ?)`;
    const values = [name, email, phone, enquiry];

    db.query(sql, values, (err, result) => {
        if (err) {
            console.error('Error inserting data:', err);
            return res.status(500).send({ message: 'Error storing data. Please try again later.' });
        }
        res.status(201).send({ message: 'User data stored successfully!' });
    });
});



const PORT = 3001; 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
