const org = require('./service');

async function get(req, res, next) {

    try {
      res.json(await org.get(req));
    } catch (err) {
      console.error(`Error while getting mutiple items from service`, err.message);
      next(err);
    }
}

async function create(req, res, next) {
  try {


    res.json(await org.create(req));
  } catch (err) {
    console.error(`Error while creating item`, err.message);
    next(err);
  }
}

async function update(req, res, next) {
  try {

    console.log('Reached update function. Id is '+ req.query.id);
    res.json(await org.update(req.query.id, req));
  } catch (err) {
    console.error(`Error while updating item`, err.message);
    next(err);
  }
}

async function remove(req, res, next) {
  try {


    console.log('Reached update function. Id is '+ req.query.id);
    res.json(await org.remove(req.query.id));
  } catch (err) {
    console.error(`Error while deleting item`, err.message);
    next(err);
  } 
}

module.exports = {
  get,
  create,
  update,
  remove
};