// API for courses.

exports.addCourse = async function (new_item) {
  // Grab the text parameter.
  // this.name = name;
  // this.desc = desc;
  // this.authors = authors;
  // this.duration = duration;
  try {
    // var create_course_promise = global.pathdb.createCollection('courses', { reuseExisting: true });
    var courses = global.pathdb.getCollection('courses');
  }
  catch (err) {
    console.log('Error connecting to collection. Ignore if this is first initiailisation of the function:' + err.message + ":");

  }
  try {
    console.log("Doc in Func : " + new_item)
    // var added = await courses.add({ name: 'Laurie', age: 19 }).execute();


    // var newDoc = { name: namee, description: 'Test Description' };
    var added = await courses.add(new_item).execute();
    console.log("Items count in Func : " + added.getAffectedItemsCount());
    if (added.getAffectedItemsCount() > 0) {
      return added.getAffectedItemsCount();
    } else {
      return 0;;
    }

    // return added.getAffectedItemsCount();
  }
  catch (err) {
    console.log('Error creating the item in courses collection. Ignore if this is first initiailisation of the function : ' + err.message);
  }

};
exports.getAllCourses = async function () {
  try {
    var course_sublist_string;
    var courses = global.pathdb.getCollection('courses');
    await courses.find().execute().then(course_sublist => {
      course_sublist_string = course_sublist.fetchAll();
      console.log("In course_list.js : " + JSON.stringify(course_sublist_string));
    });
    return course_sublist_string;
  }
  catch (err) {
    console.log('Error reading from courses collection. Ignore if this is first initiailisation of the function : ' + err.message);
  }
};

//Test
