const db = require('../../common/db.service');
const helper = require(process.cwd() + '/utils/helper.util.js');
const config = require(process.cwd() + '/configs/general.config');
const c_name = 'questions';
async function get(req) {
    if (req.body.multi) {
        const rows = await db.getMulti(
            c_name, req.body.searchstring, req.body.offset, req.body.limit, req.body.sortby
        );
        const data = helper.emptyOrRows(rows);
        const meta = { offset: req.body.offset };
        console.log("Completed exeuting the get multi function in " + c_name);
        return {
            data,
            meta
        }
    }
    else {
        console.log(c_name + " service. Param id is " + req.query.id);
        const rows = await db.get(
            c_name, req.query.id
        );
        const data = helper.emptyOrRows(rows);
        const meta = {};
        console.log("Completed exeuting the get one function in in " + c_name);
        return {
            data,
            meta
        }
    }
}

async function create(req) {
    var new_item = req.body.data_item;
    console.log("New Course name is : " + JSON.stringify(new_item));
    const createdId = await db.create(
        c_name, JSON.stringify(new_item)
    );
    console.log("Completed cerating " + c_name + ". Id :" + createdId);
    let message = "Error in creating in " + c_name;
    if (createdId != '0') {

        console.log("Send back the created " + c_name + " id :" + createdId);
        message = c_name + ' created successfully';
        return { message, createdId };
    } else {
        return { message };
    }
}

async function update(id, req) {
    var update_course =  req.body.data_item;
    console.log("Updated Course is : " + JSON.stringify(update_course));
    const result = await db.update(
        c_name, id, JSON.stringify(update_course)
    );
    let message = 'Error in updating ' + c_name;
    if (result) {
        message = c_name + ' updated successfully';
    }
    console.log("Completed exeuting the update function in  " + c_name);
    return { message };
}

async function remove(id) {
    const result = await db.remove(c_name, id);
    let message = 'Error in deleting ' + c_name;
    if (result) {
        message = c_name + ' deleted successfully';
    }
    console.log("Completed exeuting the remove function in " + c_name);
    return { message };
}

module.exports = {
    get,
    create,
    update,
    remove
}