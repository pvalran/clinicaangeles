const Sequelize = require('sequelize');
const sequelize = require('../db/database');
const Op = Sequelize.Op;
const Persona = require('../models/persona');
const Direccion = require('../models/direccion');
const Agenda = require('../models/agenda');
const Expediente = require('../models/expediente');

const CtlPersona = class CtlPersona {
	constructor() {

	}

	dbIndex() {
		return Persona.findAll();
	}

	dbShow(id) {
		return Persona.findByPk(id, {
			include: [
				{model: Direccion, as: 'direccion'},
				{
					model: Agenda,
					as: 'agenda',
					include: [
						'catalogo'
					],
				},
				{
					model: Expediente,
					as: 'expediente',
					include: [
						'catalogo'
					],
				}
			]
		});
	}

	dbCreate(req) {
		let model = {
			id:'',
			nombre: req.nombre,
			apepat: req.apellido_paterno,
			apemat: req.apellido_materno,
			sexo: req.sexo,
			sangre: req.sangre,
			fecha_nacimiento: req.fecha_nacimiento,
			altura: req.altura,
			peso: req.peso,
			deleted: false
		};

		return Persona.findOrCreate({
			where: {id: req.id},
			defaults: model
		});
	}

	dbUpdate(id, req) {
		let model = {
			nombre: req.nombre,
			apepat: req.apellido_paterno,
			apemat: req.apellido_materno,
			sexo: req.sexo,
			sangre: req.sangre,
			fecha_nacimiento: req.fecha_nacimiento,
			altura: req.altura,
			peso: req.peso,
			deleted: false
		};
		return Persona.update(model, {
			where: {id}
		});
	}

	dbDestroy(id) {
		this.destroy({
			where: {id}
		}).then(data => {
			console.log("Done");
		});
	}
}

module.exports = CtlPersona;
