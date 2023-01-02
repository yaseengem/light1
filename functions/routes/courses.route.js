const express = require('express');
const router = express.Router();
const coursesController = require('../controllers/courses.controller');

/* GET programming languages. */
router.get('/', coursesController.get);
  
/* POST programming language */
router.post('/', coursesController.create);

/* PUT programming language */
router.put('/:id', coursesController.update);

/* DELETE programming language */
router.delete('/:id', coursesController.remove);

module.exports = router;