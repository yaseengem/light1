const functions = require("firebase-functions");

const fadmin = global.fadmin ?? require('firebase-admin');
global.fadmin = fadmin;



exports.initApp = function () {

  // The Firebase Admin SDK to access Firestore.
  const firebaseApp =
    global.firebaseApp ??
    fadmin.initializeApp({
      credential: fadmin.credential.cert({
        projectId: process.env.FIREBASE_PROJECT_ID,
        clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
        privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
      }),
    })

  // store on global object so we can reuse it if we attempt
  // to initialize the app again
  global.firebaseApp = firebaseApp

}



exports.connectSQL = function () {
  const mysql = require('mysql');
  const connection = global.connection ?? mysql.createConnection({
    host: '34.148.109.43',
    user: 'yaseen',
    password: 'Inno12!@',
    database: 'pathdb'
  });
  global.connection = connection;

  connection.connect((err) => {
    if (err) {
      console.log("Not connected");
      global.sqlconnected = false;
    }
    else {

    console.log('Connected!');
    global.sqlconnected = true;
    }
  });

}

