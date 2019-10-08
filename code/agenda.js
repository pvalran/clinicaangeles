const Agenda = require('../models/agenda');

const CtlAgenda = class CtlAgenda extends Agenda {
	constructor() {
		super();
	}

	dbIndex() {
		return Agenda.findAll();
	}

	dbShow(id) {
		return Agenda.findbyPk(id);
	}

	dbCreate(req) {
		let model = {
			persona_id: req.persona_id,
			catmaster_id: req.tipo,
			descripcion: req.descripcion,
			deleted: false
		}

		return Agenda.findOrCreate({
			where: {id: req.id},
			defaults: model
		});
	}

	dbUpdate(id, model) {
		this.update(model, {
			where: {id}
		}).then(data => {

		});
	}

	dbDestroy(id) {
		this.destroy({
			where: {id}
		}).then(data => {
			console.log("Done");
		});
	}
};

module.exports = CtlAgenda;
