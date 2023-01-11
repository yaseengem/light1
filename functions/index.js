// const makeUppercase = require('./makeUppercase');
// const addMessage = require('./addMessage');

// exports.makeUppercase = makeUppercase.makeUppercase;
// exports.addMessage = addMessage.addMessage;
const dotenv1 = require('dotenv').config({ path: './.env.local' });
const functions = require("firebase-functions");

const ini = require("./common/initApp");
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

const gusersRouter = require('./v1/gusers/route.js');
app.use('/gusers', gusersRouter);

const cusersRouter = require('./v1/cusers/route.js');
app.use('/cusers', cusersRouter);

const orgsRouter = require('./v1/orgs/route.js');
app.use('/orgs', orgsRouter);

const instsRouter = require('./v1/insts/route.js');
app.use('/insts', instsRouter);

const coursesRouter = require('./v1/courses/route.js');
app.use('/courses', coursesRouter);

const modulesRouter = require('./v1/modules/route.js');
app.use('/modules', modulesRouter);

const topicsRouter = require('./v1/topics/route.js');
app.use('/topics', topicsRouter);

const questionsRouter = require('./v1/questions/route.js');
app.use('/questions', questionsRouter);


date_test = new Date();
console.log("Date is : ", date_test);

/* Error handler middleware */
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    console.error(err.message, err.stack);
    res.status(statusCode).json({ 'message': err.message });

    return;
});



// Expose Express API as a single Cloud Function:
exports.api = functions
    .runWith({ memory: '256MB', timeoutSeconds: 120 })
    .https.onRequest(app);

