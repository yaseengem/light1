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

// Setting environment variables and  putting it to global.
var host;
var port;
var username;
var passw;


exports.setEnv = function () {
  if (!process.env.FUNCTIONS_EMULATOR) {
    //DO STUFF SPECIFIC TO EMULATOR ENVIRONMENT
    host = '34.148.109.43';
    port = 33060;
    username = 'yaseen';
    passw = 'Inno12!@'; 
    console.log("cloud instance used.")   

  }
  else {

    host = 'localhost';
    port = 33060;
    username = 'yaseen';
    passw = 'Inno12!@';   
    console.log("local emulator used.")  
  }
  global.host = host;
  global.port = port;
  global.username = username;
  global.passw = passw;



}

exports.connectSQL = function () {
  try {
    const mysqlx = require('@mysql/xdevapi');
    var mySession;
    mysqlx.getSession({
      host: host, port: port,
      user: username, password: passw
    }).then(function (mySession) {
      var pathdb = mySession.getSchema('pathdb');
      pathdb.existsInDatabase()
        .then(exists => {
          if (exists) {
            console.log("pathdb exists");
          } else console.log("pathdb do not exists");
        });
      global.pathdb = pathdb;

      var coll_promise = pathdb.createCollection('courses', { reuseExisting: true });
      var courses = pathdb.getCollection('courses');

      // var myColl = pathdb.createCollection('my_collection');
    });
    // pathdb = mySession.getSchema('pathdb');


  }
  catch (err) {
    console.log('The following error occurred: ' + err.message);
  }

}

