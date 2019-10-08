const Sequelize = require ('sequelize');
const sequelize = require ('../db/database');
const Op = Sequelize.Op;
const Receta = require('../models/receta');

const CtlReceta = class CtlReceta extends Receta {
	constructor() {
		super();
	}

	dbIndex() {
		return Receta.findAll();
	}

	dbShow(id) {
		return Receta.findByPk(id);
	}

	dbCreate(req) {
		let model = {
			'persona_id': req.persona_id,
			'consulta_id': req.consulta_id,
			'fecha_alta': req.fecha_alta,
			'descripcion': req.descripcion,
			'deleted': false
		};

		return Receta.findOrCreate({
			where: {id: req.id},
			defaults: model
		});
	}

	dbUpdate(id, req) {
		let model = {
			'persona_id': req.persona_id,
			'consulta_id': req.consulta_id,
			'fecha_alta': req.fecha_alta,
			'descripcion': req.descripcion,
			'deleted': false
		};

		return Receta.update(model, {
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

module.exports = CtlReceta;
