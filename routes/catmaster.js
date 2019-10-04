const express = require('express');
const CtlCatmaster = require('../code/catmaster');
const router = express.Router();

router.post('/', function(req, res, next) {
   CtlCatmaster.dbCreate (req.body);
});

router.post('/:id', function(req, res, next) {
   CtlCatmaster.dbUpdate (id,req.body);
});

module.exports = router;
