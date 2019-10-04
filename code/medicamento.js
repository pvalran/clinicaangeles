const Medicamentos = require('../models/medicamento');

const CtlMedicamentos = class CtlMedicamentos  extends Medicamentos {
   constructor(){
      super();
   }

   dbCreate(model){
      this.create(model).then(data => {

      });
   }

   dbUpdate(id,model){
      this.update(model, {
         where: {id}
      }).then(data => {

      });
   }

   dbDestroy(id){
      this.destroy({
         where: {id}
      }).then(data => {
        console.log("Done");
      });
   }
}
module.exports = CtlMedicamentos;
