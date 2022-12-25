


exports.addCourse = function () {
  // Grab the text parameter.
  // const course_list = global.fadmin.firestore().collection('course_list');
  course_name = "Course Manners" + Math.random();
  course_author = "Donny";
  course_desc = "This course  is for teaching manners";
  course_duration = 240;

  // global.pathdb.existsInDatabase()
  //   .then(exists => {
  //     if (exists) {
  //       console.log("pathdb exists from api call");
  //     } else console.log("pathdb do not exists");
  //   });


  try {
    var coll_promise = global.pathdb.createCollection('courses', { reuseExisting: true });
    var courses = global.pathdb.getCollection('courses');

    courses.add({ name: course_name, desc: course_desc, duration: course_desc, author: course_author }).execute();
  }
  catch (err) {
    console.log('Error during adding object to courses collection. Error message was : ' + err.message);
  }

};


exports.getCourse = async function () {
  try {
    var courses = global.pathdb.getCollection('courses');
    // course_sublist = courses.find().execute();
    // var acourse;
    // while (acourse = course_sublist.fetchOne()) {
    //   console.log(acourse);
    // }
    courses
      .find('')
      // .bind('name', 'L%')
      .execute(function (course_sublist) {
        console.log("exec block: " + course_sublist);
        while (acourse = course_sublist.fetchOne()) {
          console.log(JSON.stringify(acourse));
        }



      })
      .then(function () {
        console.log("then block: " + course_sublist);
        while (acourse = course_sublist.fetchOne()) {
          console.log(JSON.stringify(acourse));
        }
      });
  }
  catch (err) {
    console.log('Error during getting object from courses collection. Error message was : ' + err.message);
  }

};


