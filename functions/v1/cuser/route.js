const express = require('express');
const router = express.Router();
const cuserController = require('./controller');

/* GET programming languages. */
router.get('/', cuserController.get);
  
/* POST programming language */
router.put('/', cuserController.create);

/* PUT programming language */
router.post('/', cuserController.update);


/* DELETE programming language */
router.delete('/', cuserController.remove);


module.exports = router;