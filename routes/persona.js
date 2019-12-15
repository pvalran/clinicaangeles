const express = require('express');
const CtlPersona = require('../code/persona');
const CtlDireccion = require('../code/direccion');
const CtlAgenda = require('../code/agenda');
const CtlExpendiente = require('../code/expediente');

const Persona = require('../models/persona');
const Direccion = require('../models/direccion');
const Agenda = require('../models/agenda');
const Expediente = require('../models/expediente');

const router = express.Router();

router.get('/', function (req, res, next) {
	const objPersona = new CtlPersona();
	objPersona.dbIndex().then(data => {
		res.status(200).json(data);
	});
});

router.get('/:id', function (req, res, next) {
	const id = req.params.id;
	const objPersona = new CtlPersona();
	objPersona.dbShow(id).then(data => {
		let dataResponse = Object.assign('', data);
		res.status(200).json(dataResponse.dataValues);
	});
});

router.post('/', async function (req, res, next) {
	const objPersona = new CtlPersona();
	let persona_id = await objPersona.dbCreate(req.body).then(async ([model, created]) => {
		if (!created) {
			let persona_id = await Persona.update(req.body, {where: {id: model.id}})
				.then(data => {
					return model.dataValues.id;
				});
			return persona_id;
		} else {
			return model.dataValues.id;
		}
	});

	req.body.direccion.persona_id = persona_id;
	const objDireccion = new CtlDireccion();
	let response = await objDireccion.dbCreate(req.body).then(async ([model, created]) => {
		if (!created) {
			let direccion_id = await Direccion.update(req.body.direccion, {where: {id: model.id}}).then(data => {
				return model.dataValues.id;
			});
			return direccion_id;
		} else {
			return model.dataValues.id;
		}
	});

	const objAgenda = new CtlAgenda();
	req.body.contactos.forEach(async (contacto) => {
		contacto.persona_id = persona_id;
		let agenda_id = await objAgenda.dbCreate(contacto).then(async ([model, created]) => {
			if (!created) {
				let agenda_id = await Agenda.update(contacto, {where: {id: model.id}}).then(data => {
					return model.dataValues.id;
				});
				return agenda_id;
			} else {
				return model.dataValues.id;
			}
		});
	});

	const objExpendiente = new CtlExpendiente();
	req.body.clinicos.forEach(async (expediente) => {
		expediente.persona_id = persona_id;
		let expendiente_id = await objExpendiente.dbCreate(expediente).then(async ([model, created]) => {
			if (!created) {
				let data = {
					persona_id: expediente.persona_id,
					catmaster_id: expediente.clinico_tipo,
					descripcion: expediente.clinico_descripcion,
					deleted: false
				}

				let expendiente_id = await Expediente.update(data, {where: {id: model.id}}).then(data => {
					return model.id;
				});
				return expendiente_id;
			} else {
				return model.dataValues.id;
			}
		});
	});

	let dta = await objPersona.dbShow(persona_id);
	let dataResponse = Object.assign('', dta);
	res.status(200).json(dataResponse.dataValues);
});

router.post('/:id', function (req, res, next) {
	const objPersona = new CtlPersona();
	objPersona.dbUpdate(id, req.body);
});

module.exports = router;
