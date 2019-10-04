const Sequelize = require('sequelize');
const sequelize = require('../db/database');
const Catmaster = require('./catmaster');


const Agenda = sequelize.define('agenda', {
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
   tableName: 'agenda',
   timestamps: false
});

Agenda.belongsTo(Catmaster,{foreignKey:'catmaster_id',targetKey:'id',as:'catalogo'});

module.exports = Agenda;
