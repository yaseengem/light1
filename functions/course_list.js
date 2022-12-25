


exports.addCourse = async function () {
  // Grab the text parameter.
  const course_list = global.fadmin.firestore().collection('course_list');
  course_name = "Course Manners" + Math.random();
  course_author = "Donny";
  course_desc = "This course  is for teaching manners";
  course_duration = 240;
  // var sql = "INSERT INTO pathdb.courses( name, desc, author, duration ) " +
  //   " VALUES (' " + employeeName +
  //   " ', " + employeeSalary +
  //   ", " + employeeAge
  //   + " );";

  var squel = require("squel");
  var sqlcommand = squel.insert()
    .into("courses")
    .set("name", course_name)
    .set("duration", course_duration)
    .set("author", course_author)
    .set("desc", course_desc)
    .toString();

  console.log(sqlcommand);
  global.connection.query(sqlcommand, (err, result) => {
    if (err) {
      console.log("Error inserting into SQL. Error message  is " + err);
    }
    else {
      console.log("Record inserted " + sqlcommand);
    }
  });



  // const course_ref = await course_list.add({ course: course_name });
  // const res = await course_ref.set({ name: course_name, desc: course_desc, duration: course_duration }, { merge: true });
};


exports.getCourse = async function () {
  // Grab the text parameter.
  const course_list = global.fadmin.firestore().collection('course_list');


  // const course1 = await course_list.
  const course = await course_list.where('desc', '>=', 'teaching').where("desc", "<=", "~").get();
  if (course.empty) {
    console.log('No matching documents.');
    return;
  }

  course.forEach(doc => {
    console.log(doc.id, '=>', doc.data());
  });




};


