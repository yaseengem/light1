const courses = require('../services/courses.service');

async function get(req, res, next) {
  try {
      res.json(await courses.getMultiple(req.query.page));
  } catch (err) {
      console.error(`Error while getting mutiple courses with query page`, err.message);
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
    res.json(await courses.update(req.params.id, req.body));
  } catch (err) {
    console.error(`Error while updating course`, err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {
    res.json(await courses.remove(req.params.id));
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