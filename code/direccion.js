const Direccion = require('../models/direccion');

const CtlDireccion = class CtlDireccion extends Direccion {
   constructor() {
      super();
   }

   dbCreate(req) {
      //const persona_id = 3;
      let direccionMdl = {
         'persona_id': req.direccion.persona_id,
         'calle': req.direccion.calle,
         'numero': req.direccion.numero,
         'entre': req.direccion.entre,
         'colonia': req.direccion.colonia,
         'municipio': req.direccion.municipio
      }


      return Direccion.findOrCreate({
         where:{id:req.direccion.id},
         defaults: direccionMdl})

   }

   dbUpdate(id,model) {
      this.update(model, {
         where: {id}
      }).then(data => {
         return data;
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

module.exports =  CtlDireccion;
