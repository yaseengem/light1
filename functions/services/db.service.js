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

exports.get = async function (coll, id) {
  try {

    console.log("In dbservice.js id : " +id);
    var items_list;
    var collection_name = global.pathdb.getCollection(coll);
    // console.log("In dbservice.js. offset is : " + offsetno);

    var item_result = await collection_name.find("_id = '"+id+"'").execute();
    var items_list = await item_result.fetchOne();
    console.log("In dbservice.js item: " + JSON.stringify(items_list));

    return items_list;
  }
  catch (err) {
    console.log('Error reading from courses collection. Ignore if this is first initiailisation of the function : ' + err.message);
  }
};


exports.getMulti = async function (coll, searchstring, offsetno, limitcount, sortby) {
  try {
    var items_list;
    var collection_name = global.pathdb.getCollection(coll);
    // console.log("In dbservice.js. offset is : " + offsetno);

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


exports.update = async function (coll, id, update_item) {
  try {
    // var create_course_promise = global.pathdb.createCollection('courses', { reuseExisting: true });
    var collection_name = global.pathdb.getCollection(coll);
  }
  catch (err) {
    console.log('Error connecting to collection. Ignore if this is first initiailisation of the function:' + err.message + ":");
  }
  try {
    console.log("Updating item values : id: " + id + "  Updating values: " + update_item)
    var updated = await collection_name.modify("_id = '"+id+"'")
      .patch(update_item).execute();
    console.log("Items count updated : " + updated.getAffectedItemsCount());
    if (updated.getAffectedItemsCount() > 0) {
      return updated.getAffectedItemsCount();
    } else {
      return 0;
    }
  }
  catch (err) {
    console.log('Error updating the item in courses collection. Ignore if this is first initiailisation of the function : ' + err.message);
  }
};


