const db = require('../../common/db.service');
const helper = require(process.cwd() + '/utils/helper.util.js');
const config = require(process.cwd() + '/configs/general.config');

async function get(req) {
    if (req.body.multi) {
        const rows = await db.getMulti(
            'gusers', req.body.searchstring, req.body.offset, req.body.limit, req.body.sortby
        );
        const data = helper.emptyOrRows(rows);
        const meta = { offset: req.body.offset };
        console.log("Completed exeuting the get multi function in GUsers");
        return {
            data,
            meta
        }
    }
    else {
        console.log("Gusers service. Param id is " + req.query.id);
        const rows = await db.get(
            'gusers', req.query.id
        );
        const data = helper.emptyOrRows(rows);
        const meta = {};
        console.log("Completed exeuting the get one function in GUsers");
        return {
            data,
            meta
        }
    }
}

async function create(req) {
    var new_course = { nickname: req.body.nickname, email: req.body.email, last_login_time: req.body.last_login_time, created_time: req.body.created_time, role: req.body.role, uid: req.body.uid };
    console.log("New Course name is : " + JSON.stringify(new_course));
    const createdId = await db.create(
        'gusers', JSON.stringify(new_course)
    );
    console.log("Completed cerating guser. Id :" + createdId);
    let message = 'Error in creating guser';
    if (createdId != '0') {

        console.log("Send back the created guser id :" + createdId);
        message = 'GUser created successfully';
        return { message, createdId };
    } else {

        return { message };
    }
}

async function update(id, req) {
    var update_course = {nickname: req.body.nickname, email: req.body.email, last_login_time: req.body.last_login_time, created_time: req.body.created_time, role: req.body.role, uid: req.body.uid };
    console.log("Updated Course is : " + JSON.stringify(update_course));
    const result = await db.update(
        'gusers', id, JSON.stringify(update_course)
    );
    let message = 'Error in updating gusers';
    if (result) {
        message = 'GUser updated successfully';
    }
    console.log("Completed exeuting the update function in Gusers");
    return { message };
}

async function remove(id) {
    const result = await db.remove("gusers", id);
    let message = 'Error in deleting GUser';
    if (result) {
        message = 'Guser deleted successfully';
    }
    console.log("Completed exeuting the remove function in gusers");
    return { message };
}

module.exports = {
    get,
    create,
    update,
    remove
}