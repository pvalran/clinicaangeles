const express = require('express');
const CtlReceta = require('../code/receta');
const router = express.Router();

router.post('/', function (req, res, next) {
	CtlReceta.dbCreate(req.body);
});

router.post('/:id', function (req, res, next) {
	CtlReceta.dbUpdate(id, req.body);
});

module.exports = router;
