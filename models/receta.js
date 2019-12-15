const Sequelize = require('sequelize');
const sequelize = require('../db/database');
const Medicamento = require('./medicamento');
const Consulta = require('./consulta');
const Persona = require('./persona');

const Receta = sequelize.define('receta', {
	id: {
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER
	},
	persona_id: {type: Sequelize.INTEGER},
	consulta_id: {type: Sequelize.INTEGER},
	fecha_alta: {type: Sequelize.DATE},
	descripcion: {type: Sequelize.STRING},
	deleted: {type: Sequelize.BOOLEAN},
}, {
	tableName: 'receta',
	timestamps: false
});

Receta.hasMany(Medicamento,{foreignKey:'receta_id',targetkey:'id',as:'medicamento'});

module.exports = Receta;
