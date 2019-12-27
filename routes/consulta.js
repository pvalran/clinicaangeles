const express = require('express');
const CtlPersona = require('../code/persona');
const CtlConsulta = require('../code/consulta');
const CtlReceta = require ('../code/receta');
const CtlMedicamento = require ('../code/medicamento');
const router = express.Router();

router.get('/', function (req, res, next) {
	const objConsulta = new CtlConsulta();
	objConsulta.dbIndex().then(data => {
		res.status(200).json(data);
	});
});

router.get('/persona/:id', function (req, res, next) {
	const id = req.params.id;
	const objConsulta = new CtlConsulta();
	objConsulta.dbFindPersona(id).then(data => {
		let dataResponse = Object.assign('', data);
		res.status(200).json(dataResponse.dataValues);
	});
});

router.post('/', async function (req, res, next) {
	const objPersona = new CtlPersona();
	const objConsulta = new CtlConsulta();
	const objReceta = new CtlReceta();
	const objMedicamento = new CtlMedicamento();
	const date = new Date();
	let persona;
	let persona_id;

	try {
		if (req.body.persona_id === '') {
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
			persona = await objPersona.dbCreate(model);
			req.body.persona_id = persona[0].dataValues.id;
		} else  {
			persona = await  objPersona.dbShow(req.body.persona_id);
			req.body.persona_id = persona.dataValues.id;
		}

		let consulta = await objConsulta.dbCreate(req.body);
		let receta_id = '';
		req.body.receta.medicamentos.forEach(async (medicamento) => {
			req.body.receta.persona_id = req.body.persona_id;
			req.body.receta.consulta_id = consulta[0].dataValues.id;
			req.body.receta.fecha_alta = date.getFullYear()+'/'+date.getMonth()+'/'+date.getDay();
			req.body.receta.descripcion = "";
			if (req.body.receta.id === '') {
				let receta = await objReceta.dbCreate(req.body.receta);
				receta_id = receta[0].dataValues.id;
			} else {
				receta_id = req.body.receta.id;
			}

			let modelMedicamento = {
				'id':medicamento.id,
				'receta_id': receta_id,
				'descripcion': medicamento.descripcion,
				'dosis': medicamento.dosis,
				'via_administracion': medicamento.via_admin,
				'tiempo': medicamento.tiempo,
				'duracion': medicamento.duracion,
				'deleted': false
			};

			let dataMedicamento = await objMedicamento.dbCreate(modelMedicamento).then(async ([model, created]) => {
				if (!created) {
					let medicamento_id = await objMedicamento.dbUpdate(modelMedicamento.id,modelMedicamento).then(data => {
						return model.id;
					});
					return medicamento_id;
				} else {
					return model.dataValues.id;
				}
			});
		});

		let data = await objConsulta.dbShow(consulta[0].dataValues.id);
		let dataResponse = Object.assign('', data);
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
