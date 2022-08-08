const express = require('express');
const fs = require("fs");
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

const readFile = () => {
    
}

app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    newNote.id = uuidv4();
    let file = readFile();
    file.push(newNote);
    writeFile(file);
    res.json(newNote);
})

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

app.listen(3001, () => {
    console.log(`API server now on port 3001`);
});