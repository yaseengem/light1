const express = require('express');
const router = express.Router();
const instController = require('./controller');

/* GET programming languages. */
router.get('/', instController.get);
  
/* POST programming language */
router.put('/', instController.create);

/* PUT programming language */
router.post('/', instController.update);


/* DELETE programming language */
router.delete('/', instController.remove);


module.exports = router;