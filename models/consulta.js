const Sequelize = require('sequelize');
const sequelize = require('../db/database');

const Persona = require('./persona');
const Receta = require('./receta');

const Consulta = sequelize.define('consulta', {
	id: {
		autoIncrement: true,
		primaryKey: true,
		type: Sequelize.INTEGER
	},
	persona_id: {type: Sequelize.INTEGER},
	temperatura: {type: Sequelize.STRING},
	presion: {type: Sequelize.STRING},
	frecuencia: {type: Sequelize.STRING},
	sintomas: {type: Sequelize.STRING},
	carac_fisica: {type: Sequelize.STRING},
	diagnostico: {type: Sequelize.STRING},
	tratamiento: {type: Sequelize.STRING},
	deleted: {type: Sequelize.BOOLEAN}
}, {
	tableName: 'consulta',
	timestamps: false
});

Consulta.hasMany(Receta,{foreignKey:'consulta_id', targetKey: 'id', as: 'receta'});
Consulta.belongsTo(Persona,{foreignKey:'persona_id',targetKey:'id', as: 'persona'});

module.exports = Consulta;
