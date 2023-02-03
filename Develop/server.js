
const _ = require('lodash');
const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs'); // FileSystem

const databasePath = './db/db.json';

const database = require(databasePath);

const app = express();

const port = 3000;
const SUCCESS = 200; // HTTP Status Code

// Middleware. Allow user to access anything under /public folder.
app.use(express.static('public', { extensions: ['html'] }));

// Middleware. Allow user to send JSON in POST.
app.use(bodyParser.json());

app.get('/api/notes', (req, res) => {
    // TODO: return the database
    res.json(database); // respond with json from database
});

app.post('/api/notes', (req, res) => {
    // TODO: add the note to the database
    const newNote = req.body; // From public/js/index.js line 42
    newNote.id = `${Date.now()}`;
    database.push(newNote);
    // Write File to `databasePath` with contents `database` in `utf8` encoding
    fs.writeFileSync(databasePath, JSON.stringify(database, null, 2), 'utf8');
    res.status(SUCCESS).end();
});

app.delete('/api/notes/:id', (req, res) => {
    // TODO: remove the note from the database
    // req.params = { id: '???' }; // from public/js/index.js line 46
    const id = req.params.id;
    _.remove(database, /* for each note */ (note) => {
        // Match note.id and id
        return note.id == id;
    });
    // Write File to `databasePath` with contents `database` in `utf8` encoding
    fs.writeFileSync(databasePath, JSON.stringify(database, null, 2), 'utf8');
    // Send something:
    res.status(SUCCESS).end();
});

app.listen(port, () => {
    console.log('Listening on port:', port);
});
