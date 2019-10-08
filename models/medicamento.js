const Sequelize = require('sequelize');
const sequelize = require('../db/database');

const Medicamento = sequelize.define('medicamento', {
	id: {
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER
	},
	receta_id: {type: Sequelize.INTEGER},
	descripcion: {type: Sequelize.STRING},
	dosis: {type: Sequelize.STRING},
	via_administracion: {type: Sequelize.STRING},
	tiempo: {type: Sequelize.STRING},
	duracion: {type: Sequelize.STRING},
	deleted: {type: Sequelize.BOOLEAN}
}, {
	tableName: 'medicamento',
	timestamps: false
});

module.exports = Medicamento;
