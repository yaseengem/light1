const express = require('express');
const router = express.Router();
const aController = require('./controller');

/* GET programming languages. */
router.get('/', aController.get);
  
/* POST programming language */
router.put('/', aController.create);

/* PUT programming language */
router.post('/', aController.update);


/* DELETE programming language */
router.delete('/', aController.remove);


module.exports = router;