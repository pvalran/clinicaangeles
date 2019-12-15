const express = require('express');
const CtlPersona = require('../code/persona');
const CtlConsulta = require('../code/consulta');
const router = express.Router();

router.get('/', function (req, res, next) {
	const objConsulta = new CtlConsulta();
	objConsulta.dbIndex().then(data => {
		res.status(200).json(data);
	});
});

router.get('/:id', function (req, res, next) {
	const id = req.params.id;
	const objConsulta = new CtlConsulta();
	objConsulta.dbShow(id).then(data => {
		let dataResponse = Object.assign('', data);
		res.status(200).json(dataResponse.dataValues);
	});
});

router.post('/', async function (req, res, next) {
	const objPersona = new CtlPersona();
	const objConsulta = new CtlConsulta();
	try {
		if (req.body.persona_id == '') {
			let model = {
				id: req.body.persona_id,
				nombre: req.body.nombre,
				apellido_paterno: req.body.apellido_paterno,
				apellido_materno: req.body.apellido_materno,
				sexo: '',
				sangre: '',
				fecha_nacimiento: '',
				altura: '',
				peso: '',
				deleted: false
			};
			let persona = await objPersona.dbCreate(model);
		}
		req.body.persona_id = persona[0].dataValues.id;
		let consulta = await objConsulta.dbCreate(req.body);
		let dta = await objConsulta.dbShow(consulta[0].dataValues.id);
		let dataResponse = Object.assign('', dta);
		res.status(200).json(dataResponse.dataValues);

	} catch (ex) {
		res.status(400).json({
			error: 1,
			msg:ex
		});
	}
});

router.post('/:id', function (req, res, next) {
	CtlConsulta.dbUpdate(id, req.body);
});

module.exports = router;
