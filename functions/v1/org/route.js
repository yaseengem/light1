const express = require('express');
const router = express.Router();
const orgController = require('./controller');

/* GET programming languages. */
router.get('/', orgController.get);
  
/* POST programming language */
router.put('/', orgController.create);

/* PUT programming language */
router.post('/', orgController.update);


/* DELETE programming language */
router.delete('/', orgController.remove);


module.exports = router;