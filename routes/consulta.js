const express = require('express');
const CtlConsulta = require('../code/consulta');
const router = express.Router();

router.post('/', function (req, res, next) {
	CtlConsulta.dbCreate(req.body);
});

router.post('/:id', function (req, res, next) {
	CtlConsulta.dbUpdate(id, req.body);
});

module.exports = router;
