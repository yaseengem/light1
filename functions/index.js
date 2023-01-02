// const makeUppercase = require('./makeUppercase');
// const addMessage = require('./addMessage');

// exports.makeUppercase = makeUppercase.makeUppercase;
// exports.addMessage = addMessage.addMessage;
const dotenv1 = require('dotenv').config({ path: './.env.local' });

const functions = require("firebase-functions");

const ini = require("./initApp");
ini.setEnv();
ini.initApp();
ini.connectSQL();

const express = require('express');
const cors = require('cors');
const app = express();


// Automatically allow cross-origin requests
app.use(cors({ origin: true }));

// Express middleware that validates Firebase ID Tokens passed in the Authorization HTTP header.
// The Firebase ID token needs to be passed as a Bearer token in the Authorization HTTP header like this:
// `Authorization: Bearer <Firebase ID Token>`.
// when decoded successfully, the ID Token content will be added as `req.user`.
const authenticate = async (req, res, next) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith('Bearer ')) {
        res.status(403).send('Unauthorized');
        return;
    }
    const idToken = req.headers.authorization.split('Bearer ')[1];
    try {
        const decodedIdToken = await global.fadmin.auth().verifyIdToken(idToken);
        req.user = decodedIdToken;
        next();
        return;
    } catch (e) {
        res.status(403).send('Unauthorized');
        return;
    }
};

// app.use(authenticate);
// Parse URL-encoded bodies (as sent by HTML forms)
app.use(express.urlencoded({
    extended: true
}));

// Parse JSON bodies (as sent by API clients)
app.use(express.json());

// build multiple CRUD interfaces:
app.get('/', async (req, res) => {
    const course_list = require('./course_list');
    const course_sublist_string = await course_list.getAllCourses();
    console.log("In index.js: " + JSON.stringify(course_sublist_string));
    res.status(200).json(course_sublist_string);
});


app.get('/:id', (req, res) => {
    clist.getAllCourses();
    res.status(200).json({ 'Good message': 'get for id' });
});

app.post('/', async (req, res) => {
    const course_list = require('./course_list');

    console.log("body. name in Index: " + req.body.name);


    var new_course = { name: req.body.name, desc: req.body.desc, authors: req.body.authors, duration: req.body.duration };
    console.log ("New Course name is : " + JSON.stringify(new_course));
    const added_count = await course_list.addCourse(JSON.stringify(new_course));
    console.log("Completed In index.js: " + added_count);
    if (added_count > 0) {
        res.status(200).json(added_count);
    } else{
        res.status(501).json("Error");
    }

});

// app.post('/', (req, res) => {
//     clist.addCourse();
//     res.json({ 'Good message': 'post' });
// });
app.put('/:id', (req, res) => {
    clist.addCourse();
});
app.delete('/:id', (req, res) => {
});


// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);

