// API for courses.

exports.addCourse = function () {
  // Grab the text parameter.
  // const course_list = global.fadmin.firestore().collection('course_list');
  course_name = "Course Manners" + Math.random();
  course_author = "Donny";
  course_desc = "This course  is for teaching manners";
  course_duration = 240;
  try {
    var coll_promise = global.pathdb.createCollection('courses', { reuseExisting: true });
    var courses = global.pathdb.getCollection('courses');
    // courses.add({ name: 'Laurie', age: 19 }).execute();
    courses.add({ name: course_name, desc: course_desc, duration: course_desc, author: course_author }).execute();
  }
  catch (err) {
    console.log('Error creating the collection. Ignore if this is first initiailisation of the function : ' + err.message);
  }
  try {
    // courses.add({ name: 'Laurie', age: 19 }).execute();
    courses.add({ name: course_name, desc: course_desc, duration: course_desc, author: course_author }).execute();

  }
  catch (err) {
    console.log('Error creating the item in courses collection. Ignore if this is first initiailisation of the function : ' + err.message);
  }

  try {
    courses.find().execute().then(course_sublist => {
      while (acourse = course_sublist.fetchOne()) {
        console.log(JSON.stringify(acourse));
      }
    });
  }
  catch (err) {
    console.log('Error reading from courses collection. Ignore if this is first initiailisation of the function : ' + err.message);
  }

};


exports.getAllCourses = async function () {
  
  try {
        var courses = global.pathdb.getCollection('courses');
 }
  catch (err) {
    console.log('Error getting the collection. Ignore if this is first initiailisation of the function : ' + err.message);
  }

  try {
    courses.find().execute().then(course_sublist => {
      
      while (acourse = course_sublist.fetchOne()) {
        console.log(JSON.stringify(acourse));
      }
    });
  }
  catch (err) {
    console.log('Error reading from courses collection. Ignore if this is first initiailisation of the function : ' + err.message);
  }




};


