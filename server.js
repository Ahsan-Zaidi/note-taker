//Requiring all dependencies
const express = require('express');
const fs = require("fs");
const path = require('path');
const { v4: uuidv4 } = require('uuid');

const app = express();

//method to parse data
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//Using available port or port 3001
const PORT = process.env.PORT || 3001;

//function to read data from db.json file
const readFile = () => {
    return JSON.parse(fs.readFileSync("./db/db.json", "utf-8", err => {
        if (err) {
            console.log(err);
        }
    }));
}

//function to write data on to db.json file
const writeFile = (file) => {
    fs.writeFileSync('db/db.json', JSON.stringify(file), err => {
        if (err) {
            console.log(err);
        }
    });
    return file;
}

//Read the data from request
app.get('/api/notes', (req,res) => {
    res.json(readFile());
});

//adding data to the file upon request
//grab the new note assign its id then push into new version of the note
app.post('/api/notes', (req, res) => {
    let newNote = req.body;
    newNote.id = uuidv4();
    console.log("newNote.id"+newNote.id)
    let file = readFile();
    file.push(newNote);
    writeFile(file);
    res.json(newNote);
});

//Delete data from the file
//filter through note data to identify id of note to be deleted, then delete
app.delete('/api/notes/:id', (req, res) => {
    let id = req.params.id.toString();
    let file = readFile();
    const newFile = file.filter(data => data.id.toString() !== id)
    writeFile(newFile);
    res.json(newFile);
});



//general route to html landing page
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'));
});

//general route to html landing page
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/notes.html'));
});

//connection to available port
app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}`);
});