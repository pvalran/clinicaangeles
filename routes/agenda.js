const express = require('express');
const CtlAgenda = require('../code/agenda');
const router = express.Router();

router.post('/', function(req, res, next) {
   CtlAgenda.dbCreate (req.body);
});

router.post('/:id', function(req, res, next) {
   const id = parseInt(req.params.id, 10);
   CtlAgenda.dbUpdate (id,req.body);
});

module.exports = router;
