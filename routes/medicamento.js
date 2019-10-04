const express = require('express');
const CtlMedicamento = require('../code/medicamento');
const router = express.Router();

router.post('/', function(req, res, next) {
   CtlMedicamento.dbCreate (req.body);
});

router.post('/:id', function(req, res, next) {
   CtlMedicamento.dbUpdate (id,req.body);
});

module.exports = router;
