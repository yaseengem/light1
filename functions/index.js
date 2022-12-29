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


// build multiple CRUD interfaces:
app.get('/', async (req, res) => {
    var course_sublist_string;
    var courses = global.pathdb.getCollection('courses');
    await courses.find().execute().then(course_sublist => {
        course_sublist_string = course_sublist.fetchAll();
        console.log("In course_list.js : " + JSON.stringify(course_sublist_string));
    });
    console.log("In index.js: " + JSON.stringify(course_sublist_string));
    res.status(200).json(course_sublist_string);
});
app.get('/:id', (req, res) => {
    clist.getAllCourses();
    res.status(200).json({ 'Good message': 'get for id' });
});
app.post('/', (req, res) => {
    clist.addCourse();
    res.json({ 'Good message': 'post' });
});
app.put('/:id', (req, res) => {
    clist.addCourse();
});
app.delete('/:id', (req, res) => {
});


// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);

