const Sequelize = require('sequelize');
const sequelize = require('../db/database');

const Catmaster = sequelize.define('catmaster', {
	id: {
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER
	},
	catalogo: {type: Sequelize.STRING},
	etiqueta: {type: Sequelize.STRING},
	etiqueta_corto: {type: Sequelize.STRING},
	codigo: {type: Sequelize.STRING},
	orden: {type: Sequelize.INTEGER},
	parent_id: {type: Sequelize.INTEGER},
	deleted: {type: Sequelize.BOOLEAN}
}, {
	tableName: 'catmaster',
	timestamps: false
});


module.exports = Catmaster;
