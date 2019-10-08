const Sequelize = require('sequelize');
const sequelize = require('../db/database');
const Catmaster = require('./catmaster');

const Expediente = sequelize.define('expediente', {
	id: {
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER
	},
	persona_id: {type: Sequelize.INTEGER},
	catmaster_id: {type: Sequelize.INTEGER},
	descripcion: {type: Sequelize.STRING},
	deleted: {type: Sequelize.BOOLEAN}
}, {
	tableName: 'expediente',
	timestamps: false
});

Expediente.belongsTo(Catmaster, {foreignKey: 'catmaster_id', targetKey: 'id', as: 'catalogo'});

module.exports = Expediente;
