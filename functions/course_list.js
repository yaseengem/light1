// API for courses.

exports.addCourse = function () {
  // Grab the text parameter.
  // const course_list = global.fadmin.firestore().collection('course_list');
  course_name = "Course Manners" + Math.random();
  course_authors = "Donny";
  course_desc = "This course is for teaching manners";
  course_duration = 240;

  try {
    var coll_promise = global.pathdb.createCollection('courses', { reuseExisting: true });
    var courses = global.pathdb.getCollection('courses');
  }
  catch (err) {
    console.log('Error creating the collection. Ignore if this is first initiailisation of the function : ' + err.message);
  }
  try {
    // courses.add({ name: 'Laurie', age: 19 }).execute();
    courses.add({ name: course_name, desc: course_desc, duration: course_desc, authors: course_authors }).execute();
  }
  catch (err) {
    console.log('Error creating the item in courses collection. Ignore if this is first initiailisation of the function : ' + err.message);
  }

};
exports.getAllCourses = function () {


  try {
    var courses = global.pathdb.getCollection('courses');
    courses.find().execute().then(course_sublist => {
      var course_sublist_string = "{  [ ";


      while (acourse = course_sublist.fetchOne()) {
        // console.log(JSON.stringify(acourse));
        course_sublist_string += JSON.stringify(acourse) + ',';
      }
      course_sublist_string = course_sublist_string.slice(0, -2) + ']  }';

      console.log("In course_list.js" + course_sublist_string);
      return course_sublist_string;
    });

  }
  catch (err) {
    console.log('Error reading from courses collection. Ignore if this is first initiailisation of the function : ' + err.message);
  }




};


