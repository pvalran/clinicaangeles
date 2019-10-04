const Consulta = require('../models/consulta');

const CtlConsulta = class CtlConsulta extends Consulta {
   constructor() {
      super();
   }

   dbCreate(model) {
      this.create(model).then(data => {

      });
   }

   dbUpdate(id,model) {
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
}

module.exports =  CtlConsulta;
