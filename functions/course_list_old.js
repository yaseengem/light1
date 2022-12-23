
// Take the text parameter passed to this HTTP endpoint and insert it into 
// Firestore under the path /messages/:documentId/original
exports.addCourse = async function () {
  // Grab the text parameter.
  const course_list = global.fadmin.firestore().collection('course_list');


  // const { doc, setDoc } = require( "firebase/firestore"); 

  // await setDoc(doc(db, "course_list", "LA"), {
  //   name: "Course Manners",
  //   author: "Donny",
  //   desc: "This course  is for teaching manners",
  //   duration: 240,
  //   active: true
  // });



  var course = new Object();
  course.name = "Course Manners" + Math.random();
  course.author = "Donny";
  course.desc = "This course  is for teaching manners";
  course.duration = 240;
  course_json = JSON.stringify(course);
  console.log ("JSON String is " + course_json);
  // const original = "Test Storing.. " + Math.random();
  // Push the new message into Firestore using the Firebase Admin SDK.
  const writeResult = await course_list.add({course: course_json});
  // Send back a message that we've successfully written the message
  // console.log({ result: `Message with ID: ${writeResult.id} added.` });

};
