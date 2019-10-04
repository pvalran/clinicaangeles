const Sequelize = require('sequelize');
const sequelize = require('../db/database');


const Direccion = sequelize.define('direccion', {
   id: {
      autoIncrement: true,
      primaryKey: true,
      type: Sequelize.INTEGER
   },
   persona_id: {type: Sequelize.INTEGER},
   calle: {type: Sequelize.STRING},
   numero: {type: Sequelize.STRING},
   entre: {type: Sequelize.STRING},
   colonia: {type: Sequelize.STRING},
   municipio: {type: Sequelize.STRING},
   deleted: {type: Sequelize.BOOLEAN}
}, {
   tableName: 'direccion',
   timestamps: false
});

module.exports =   Direccion;
