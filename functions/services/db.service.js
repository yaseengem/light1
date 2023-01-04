// API for courses.

const { limit } = require("@firebase/firestore");

exports.create = async function (coll, new_item) {
  // Grab the text parameter.
  // this.name = name;
  // this.desc = desc;
  // this.authors = authors;
  // this.duration = duration;
  try {
    // var create_course_promise = global.pathdb.createCollection('courses', { reuseExisting: true });
    var collection_name = global.pathdb.getCollection(coll);
  }
  catch (err) {
    console.log('Error connecting to collection. Ignore if this is first initiailisation of the function:' + err.message + ":");

  }
  try {
    console.log("Doc in Func : " + new_item)
    // var added = await courses.add({ name: 'Laurie', age: 19 }).execute();
    // var newDoc = { name: namee, description: 'Test Description' };
    var added = await collection_name.add(new_item).execute();
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


// mysql-js> db.countryinfo.find().sort(["IndepYear desc"]).limit(8).skip(1)
// ... [output removed]
// 8 documents in set (0.00 sec)

exports.getMultiple = async function (coll, searchstring = "", sortby = "duration", limitcount = 20, offsetno = 0) {
  try {
    var items_list;
    var collection_name = global.pathdb.getCollection(coll);
    var item_result = await collection_name.find().sort([sortby]).limit(limitcount).offset(offsetno).execute();
    // var item_result1 = await item_result.sort(sortby).limit(limitno);

    var items_list = await item_result.fetchAll();
    console.log("In dbservice.js : " + JSON.stringify(items_list));

    return items_list;
  }
  catch (err) {
    console.log('Error reading from courses collection. Ignore if this is first initiailisation of the function : ' + err.message);
  }
};
