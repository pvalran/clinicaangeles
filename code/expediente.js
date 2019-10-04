const Expendiente = require('../models/expediente');

const CtlExpendiente = class CtlExpendiente  extends Expendiente {
   constructor(){
      super();
   }

   dbIndex() {
      return Expendiente.findAll();
   }

   dbShow(id){
      return Expendiente.findbyPk(id);
   }

   dbCreate(req) {
      let model = {
         persona_id: req.persona_id,
         catmaster_id:req.clinico_tipo,
         descripcion:req.clinico_descripcion,
         deleted:false
      }

      return Expendiente.findOrCreate({
         where:{id:req.id},
         defaults: model
      });
   }

   dbUpdate(id,model) {
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
};

module.exports =  CtlExpendiente;
