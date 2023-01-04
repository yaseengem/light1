const db = require('./db.service');
const helper = require(process.cwd() + '/utils/helper.util.js');
const config = require(process.cwd() + '/configs/general.config');

async function get(req) {
    if (req.body.multi) {
        const rows = await db.getMulti(
            'courses', req.body.searchstring, req.body.offset, req.body.limit, req.body.sortby
        );
        const data = helper.emptyOrRows(rows);
        const meta = { offset: req.body.offset };
        return {
            data,
            meta
        }
    }
    else {
        console.log("Courses service. Param id is " + req.query.id);
        const rows = await db.get(
            'courses', req.query.id
        );
        const data = helper.emptyOrRows(rows);
        const meta = {};
        return {
            data,
            meta
        }
    }
}

async function create(req) {
    var new_course = { name: req.body.name, desc: req.body.desc, authors: req.body.authors, duration: req.body.duration, rating: req.body.rating };
    console.log("New Course name is : " + JSON.stringify(new_course));
    const result = await db.create(
        'courses', JSON.stringify(new_course)
    );
    let message = 'Error in creating course';
    if (result) {
        message = 'Course created successfully';
    }
    return { message };
}

async function update(id, req) {
    var update_course = { name: req.body.name, desc: req.body.desc, authors: req.body.authors, duration: req.body.duration, rating: req.body.rating };
    console.log("Updated Course is : " + JSON.stringify(update_course));
    const result = await db.update(
        'courses', id, JSON.stringify(update_course)
    );
    let message = 'Error in updating course';
    if (result) {
        message = 'Course updated successfully';
    }
    return { message };
}

async function remove(id) {
    const result = await db.remove("courses", id);
    let message = 'Error in deleting Course';
    if (result) {
        message = 'Course deleted successfully';
    }
    return { message };
}

module.exports = {
    get,
    create,
    update,
    remove
}