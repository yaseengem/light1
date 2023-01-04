const express = require('express');
const router = express.Router();
const coursesController = require('./controller');

/* GET programming languages. */
router.get('/', coursesController.get);
  
/* POST programming language */
router.put('/', coursesController.create);

/* PUT programming language */
router.post('/', coursesController.update);

/* PUT programming language */
// router.post('/:id', coursesController.update);

/* DELETE programming language */
router.delete('/', coursesController.remove);


module.exports = router;