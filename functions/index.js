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

app.get('/', (req, res) => {
    res.json({ 'message': 'ok' });
})
const coursesRouter = require('./v1/courses/route.js');
app.use('/courses', coursesRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });

    return;
});



// Expose Express API as a single Cloud Function:
exports.api = functions.https.onRequest(app);

