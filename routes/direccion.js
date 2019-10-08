const express = require('express');
const CtlDireccion = require('../code/direccion');
const router = express.Router();

router.post('/', function (req, res, next) {
	CtlDireccion.dbCreate(req.body);
});

router.post('/:id', function (req, res, next) {
	CtlDireccion.dbUpdate(id, req.body);
});

module.exports = router;
