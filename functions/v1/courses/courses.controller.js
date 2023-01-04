const courses = require('./courses.service');

async function get(req, res, next) {

    try {
      res.json(await courses.get(req));
    } catch (err) {
      console.error(`Error while getting mutiple courses from course service`, err.message);
      next(err);
    }

}

async function create(req, res, next) {
  try {


    res.json(await courses.create(req));
  } catch (err) {
    console.error(`Error while creating course`, err.message);
    next(err);
  }
}

async function update(req, res, next) {
  try {

    console.log('Reached update function. Id is '+ req.query.id);
    res.json(await courses.update(req.query.id, req));
  } catch (err) {
    console.error(`Error while updating course`, err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {


    console.log('Reached update function. Id is '+ req.query.id);
    res.json(await courses.remove(req.query.id));
  } catch (err) {
    console.error(`Error while deleting course`, err.message);
    next(err);
  }
}

module.exports = {
  get,
  create,
  update,
  remove
};