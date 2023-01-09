const express = require('express');
const router = express.Router();
const gusersController = require('./controller');

/* GET programming languages. */
router.get('/', gusersController.get);
  
/* POST programming language */
router.put('/', gusersController.create);

/* PUT programming language */
router.post('/', gusersController.update);


/* DELETE programming language */
router.delete('/', gusersController.remove);


module.exports = router;