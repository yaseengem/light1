

const db = require('./db.service');
const helper = require(process.cwd() + '/utils/helper.util.js');
const config = require(process.cwd() + '/configs/general.config');

async function get(req) {
    // const offset = helper.getOffset(page, config.listPerPage);
    // const rows = await db.getMultiple(
    //     `SELECT id, name, released_year, githut_rank, pypl_rank, tiobe_rank 
    // FROM programming_languages LIMIT ?,?`,
    //     [offset, config.listPerPage]
    // );
    const rows = await db.get(
        'courses', req.body.searchstring, req.body.offset, req.body.limit, req.body.sortby
    );
    const data = helper.emptyOrRows(rows);
    const meta = { offset: req.body.offset };
    return {
        data,
        meta
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

async function update(id, programmingLanguage) {
    const result = await db.query(
        `UPDATE programming_languages 
    SET name=?, released_year=?, githut_rank=?, 
    pypl_rank=?, tiobe_rank=? 
    WHERE id=?`,
        [
            programmingLanguage.name, programmingLanguage.released_year,
            programmingLanguage.githut_rank, programmingLanguage.pypl_rank,
            programmingLanguage.tiobe_rank, id
        ]
    );

    let message = 'Error in updating programming language';

    if (result.affectedRows) {
        message = 'Programming language updated successfully';
    }

    return { message };
}

async function remove(id) {
    const result = await db.query(
        `DELETE FROM programming_languages WHERE id=?`,
        [id]
    );

    let message = 'Error in deleting programming language';

    if (result.affectedRows) {
        message = 'Programming language deleted successfully';
    }

    return { message };
}

module.exports = {
    get,
    create,
    update,
    remove
}