const Sequelize = require('sequelize');
const sequelize = require('../db/database');

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

module.exports = Receta;
