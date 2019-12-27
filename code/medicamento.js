const Sequelize = require('sequelize');
const sequelize = require('../db/database');
const Op = Sequelize.Op;
const Medicamento = require('../models/medicamento');

const CtlMedicamentos = class CtlMedicamentos extends Medicamento {
	constructor() {
		super();
	}

	dbIndex() {
		return Medicamento.findAll();
	}

	dbShow(id) {
		return Medicamento.findByPk(id);
	}

	dbCreate(req) {
		let model = {
			'id':'',
			'receta_id': req.receta_id,
			'descripcion': req.descripcion,
			'dosis': req.dosis,
			'via_administracion': req.via_administracion,
			'tiempo': req.tiempo,
			'duracion': req.duracion,
			'deleted': false
		};

		return Medicamento.findOrCreate({
			where: {id: req.id},
			defaults: model
		});
	}

	dbUpdate(id, req) {
		let model = {
			'receta_id': req.receta_id,
			'descripcion': req.descripcion,
			'dosis': req.dosis,
			'via_administracion': req.via_administracion,
			'tiempo': req.tiempo,
			'duracion': req.duracion,
			'deleted': false
		};

		return Medicamento.update(model, {
			where: {id}
		});
	}

	dbDestroy(id) {
		this.destroy({
			where: {id}
		}).then(data => {
			console.log("destroy");
		});
	}
}
module.exports = CtlMedicamentos;
