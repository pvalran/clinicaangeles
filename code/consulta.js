const Sequelize = require('sequelize');
const sequelize = require('../db/database');
const Op = Sequelize.Op;
const Persona = require('../models/persona');
const Consulta = require('../models/consulta');
const Receta = require('../models/receta');
const Medicamento = require('../models/medicamento');

const CtlConsulta = class CtlConsulta extends Consulta {
    constructor() {
		super();
    }

	dbIndex() {
		return Consulta.findAll();
	}

	dbShow(id) {
		return Consulta.findByPk(id, {
			include: [
				{
					model: Receta,
					as: 'receta',
					include: [
						'medicamento'
					],
				}, {
                    model: Persona,
					as: 'persona',
				}
			]
		});
	}

    dbCreate(req) {
		let model = {
			'id':'',
			'persona_id': req.persona_id,
			'temperatura': req.temperatura,
			'presion': req.presion,
			'frecuencia': req.frecuencia,
			'sintomas': req.sintomas,
			'carac_fisica': req.carac_fisica,
			'diagnostico': req.diagnostico,
			'tratamiento': req.tratamiento,
			'deleted': false
		};

		return Consulta.findOrCreate({
			where: {id: req.id},
			defaults: model
		});
	}

	dbUpdate(id, req) {
		let model = {
			'persona_id': req.persona_id,
			'temperatura': req.temperatura,
			'presion': req.presion,
			'frecuencia': req.frecuencia,
			'sintomas': req.sintomas,
			'carac_fisica': req.carac_fisica,
			'diagnostico': req.diagnostico,
			'tratamiento': req.tratamiento,
			'deleted': false
		};

		return Consulta.update(model, {
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

    dbFindPersona (id){
        return Consulta.findOne({
			where: {persona_id: id},
			include: [
				{
					model: Receta,
					as: 'receta',
					include: [
						'medicamento'
					],
				}, {
					model: Persona,
					as: 'persona',
				}
			]
		});
    }
};

module.exports = CtlConsulta;
