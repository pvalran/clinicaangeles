import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Input  from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputLabel  from '@material-ui/core/InputLabel';

import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Save from '@material-ui/icons/Save';
import Done from '@material-ui/icons/Done';
import Search from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';

import { Wrapper } from '../../components';
import SocialStyles from '../../styles/Social';
import {MenuItem} from "@material-ui/core";

import ListClinicos from "../../stateless/ListClinicos";
import ListMedicamentos from "../../stateless/ListMedicamentos";
import ModalAlert from "../../stateless/ModalAlert";


const TabContainer = (props) => (
   <Typography component="div" className="pa-0">
   {  props.children}
   </Typography>
);

class ConsultaHome extends Component {
   state = {
      tab: 0,
      tab_consulta:'tab2_1',
      sexo: 'M',
      tipo_sangre:'M',
      tipo_contacto:'1',
      tipo_clinico:'1',
      data_clinicos:[],
      medicamento_edit:'',
      medicamento:{
         oid:-1,
         descripcion:"",
         dosis:"",
         via_admin:"",
         tiempo:"",
         duracion:""
      },
      data_medicamentos: [],
      modal:{
         open:false,
         title:'',
         descripcion:'',
         handleConfirm:(param) => {},
         handleClose:() => {
            let modal = this.state.modal;
            modal.open = false;
            this.setState({modal: modal});
         },
      }
   };

   handleChange = (evt) => {
      this.setState({ [evt.target.name] : evt.target.value});
   };

   handleTabToggle = (event, tab) => {
      this.setState({ tab });
   };

   handleTabConsultaToggle = (event, tab_consulta) => {
      console.log(tab_consulta);
      this.setState({ tab_consulta });
   };

   handleMedicamento = (evt) => {
      let medicamento = this.state.medicamento;
      medicamento[evt.target.name] = evt.target.value
      this.setState({medicamento:medicamento});
   }

   handleEditMedicamento = (idx) => {
      let medicamento = this.state.medicamento;
      let listMedicamento = this.state.data_medicamentos[idx];
      medicamento.oid = idx;
      medicamento.descripcion = listMedicamento.descripcion;
      medicamento.dosis = listMedicamento.dosis;
      medicamento.via_admin = listMedicamento.via_admin;
      medicamento.tiempo = listMedicamento.tiempo;
      medicamento.duracion = listMedicamento.duracion
      this.setState({medicamento:medicamento,
         medicamento_edit:idx+1
      });
   };

   handleEditCancelarMedicamento = (evt) => {
      this.setState({medicamento_edit:""});
   };

   handleRemoveListMedicamentos = (idx) => {
      let modal = this.state.modal;
      let medicamento = this.state.medicamento;
      medicamento.oid = idx;
      this.setState({medicamento:medicamento});
      modal.open = true;
      modal.title = "¡¡¡Advertencia¡¡¡";
      modal.descripcion = "Desea eliminar el medicamento";
      modal.handleConfirm = (evt) => {
         let clinicos = this.state.data_medicamentos.filter((item,key) => key != this.state.medicamento.oid);
         this.setState({data_medicamentos:clinicos});
         this.state.modal.handleClose();
      }
      this.setState({modal:modal});
   };

   handleEditListMedicamento = (idx) => {
      let medicamentos = this.state.data_medicamentos;
      medicamentos[idx].descripcion = this.state.medicamento.descripcion;
      medicamentos[idx].dosis = this.state.medicamento.dosis;
      medicamentos[idx].via_admin = this.state.medicamento.via_admin;
      medicamentos[idx].tiempo = this.state.medicamento.tiempo;
      medicamentos[idx].duracion = this.state.medicamento.duracion;
      this.setState({data_medicamentos:medicamentos});
      this.handleEditCancelarMedicamento();
   };

   handleAddListMedicamento = (evt) => {
      let ListMedicamentos = this.state.data_medicamentos;
      ListMedicamentos.push( Object.assign({}, this.state.medicamento));
      this.setState({
         data_medicamentos: ListMedicamentos,
         medicamento: {
            oid: -1,
            descripcion: "",
            dosis: "",
            via_admin: "",
            tiempo: "",
            duracion: ""
         }
      });
   };

   render() {
      const { classes } = this.props;
      const { tab,medicamento_edit,medicamento,data_medicamentos } = this.state;
      const { tab_consulta,modal } = this.state;

      return (
         <Wrapper>
            <ModalAlert
               open={modal.open}
               title={modal.title}
               descripcion={modal.descripcion}
               handleConfirm={modal.handleConfirm}
               handleClose={modal.handleClose}
            ></ModalAlert>
            <Grid container spacing={8}>
               <Grid item xs={12} sm={12} md={12} lg={12} style={{
                  display: 'flex',
                  justifyContent: 'flex-end',
               }} >
                   <Button variant="contained" color="secondary" size="small" className={classes.margin}   >
                      <Delete className={classes.leftIcon} />
                      Cancelar
                   </Button>
                   <Button variant="contained" color="primary" size="small"  onClick={this.handleSave}>
                      <Save className={classNames(classes.leftIcon, classes.iconSmall)} />
                      Actualizar
                   </Button>
               </Grid>
               <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Card>
                     <CardContent>
                        <Grid container spacing={8}>
                              <Grid item xs={12}>
                                 <TextField id="nombre" name="nombre"  helperText="Nombre de paciente" fullWidth/>
                              </Grid>
                              <Grid item xs={6}>
                                 <TextField id="apellido_paterno" name="apellido_paterno"  helperText="Apellido paterno" fullWidth/>
                              </Grid>
                              <Grid item xs={6}>
                                 <TextField id="apellido_materno" name="apellido_materno"  helperText="Apellido materno" fullWidth/>
                              </Grid>
                              <Grid item xs={4}>
                                 <TextField id="temperatura" helperText="Temperatura" className={classes.textField} fullWidth/>
                              </Grid>
                              <Grid item xs={4}>
                                 <TextField id="presion" helperText="Presión"  className={classes.textField} fullWidth/>
                              </Grid>
                              <Grid item xs={4}>
                                 <TextField id="frecuencia" helperText="Frecuencia Cardiaca" className={classes.textField} fullWidth/>
                              </Grid>
                        </Grid>
                     </CardContent>
                  </Card>
               </Grid>
               <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Card>
                     <Tabs value={tab} onChange={this.handleTabToggle}>
                        <Tab label="Consulta" classes={{ root: classes.tabRoot }} />
                        <Tab label="Receta" classes={{ root: classes.tabRoot }} />
                        <Tab label="Datos clinicos" classes={{ root: classes.tabRoot }} />
                     </Tabs>
                     <Divider />
                     { tab === 0 &&
                        <TabContainer>
                           <CardContent className="pb-0">
                              <Grid container spacing={8}>
                                 <Grid item xs={12}>
                                 <Tabs variant="scrollable" value={tab_consulta} onChange={this.handleTabConsultaToggle}>
                                    <Tab value="tab2_0" label="Sintomas" classes={{ root: classes.tabRoot }} />
                                    <Tab value="tab2_1" label="Carac. fisicas" classes={{ root: classes.tabRoot }} />
                                    <Tab value="tab2_2" label="Diagnostico" classes={{ root: classes.tabRoot }} />
                                    <Tab value="tab2_3" label="Tratamiento" classes={{ root: classes.tabRoot}} />
                                 </Tabs>
                                 { tab_consulta === "tab2_0" &&
                                    <TabContainer>
                                       <FormControl className={classes.formControl} fullWidth>
                                          <textarea id="sintomas" rows="15"
                                             className={classes.textarea}
                                             margin="normal" fullWidth
                                          ></textarea>
                                       </FormControl>
                                    </TabContainer>
                                 }
                                 { tab_consulta === "tab2_1"  &&
                                    <TabContainer>
                                       <FormControl className={classes.formControl} fullWidth>
                                          <textarea id="carac_fisicas" rows="15"
                                             className={classes.textarea}
                                             margin="normal" fullWidth
                                          ></textarea>
                                       </FormControl>
                                    </TabContainer>
                                 }
                                 { tab_consulta === "tab2_2"  &&
                                    <TabContainer>
                                       <FormControl className={classes.formControl} fullWidth>
                                          <textarea id="diagnostico"  rows="15"
                                             className={ classes.textarea }
                                             margin="normal" fullWidth
                                          />
                                       </FormControl>
                                    </TabContainer>
                                 }
                                 { tab_consulta === "tab2_3"  &&
                                    <TabContainer>
                                       <FormControl className={classes.formControl} fullWidth>
                                          <textarea id="tratamiento" rows="15"
                                             className={ classes.textarea }
                                             margin="normal" fullWidth
                                          />
                                       </FormControl>
                                    </TabContainer>
                                 }
                                 </Grid>
                              </Grid>
                           </CardContent>
                        </TabContainer>
                     }
                     { tab === 1 &&
                        <TabContainer>
                           <CardContent>
                              <Grid container spacing={8}>
                                 <Grid container spacing={8} item xs={4}>
                                    <Grid item xs={12}>
                                       <TextField id="descripcion" name="descripcion" value={medicamento.descripcion} helperText="Medicamento" onChange={this.handleMedicamento} fullWidth/>
                                    </Grid>
                                    <Grid item xs={12}>
                                       <TextField id="dosis" name="dosis" value={medicamento.dosis} helperText="Dosis" onChange={this.handleMedicamento} fullWidth/>
                                    </Grid>
                                    <Grid item xs={6}>
                                       <TextField id="via_admin" name="via_admin" value={medicamento.via_admin} helperText="Via de administracion" onChange={this.handleMedicamento} fullWidth/>
                                    </Grid>
                                    <Grid item xs={6}>
                                       <TextField id="tiempo" name="tiempo" value={medicamento.tiempo} helperText="Tiempo" onChange={this.handleMedicamento} fullWidth/>
                                    </Grid>
                                    <Grid item xs={12}>
                                       <TextField id="duracion" name="duracion" value={medicamento.duracion} helperText="Duracion" onChange={this.handleMedicamento} fullWidth/>
                                    </Grid>
                                 </Grid>
                                 <Grid item xs={1}>
                                    { medicamento_edit == '' &&
                                    <Button variant="fab"  color="primary" aria-label="Agregar" className={classes.fab} onClick={this.handleAddListMedicamento}>
                                       <Add />
                                    </Button>
                                    }
                                    { medicamento_edit != '' &&
                                    <div>
                                       <Button variant="fab"  color="primary" aria-label="Aceptar" className={classes.fab} onClick = {(evt) => this.handleEditListMedicamento(this.state.medicamento.oid) }>
                                          <Done />
                                       </Button>
                                       <Button variant="fab"  color="secondary" aria-label="Cancelar" className={classes.fab} onClick = {(evt) => this.handleEditCancelarMedicamento() }>
                                          <Clear />
                                       </Button>
                                    </div>
                                    }
                                 </Grid>
                                 <Grid item xs={7}>
                                    <ListMedicamentos data={this.state.data_medicamentos}
                                       handleRemove={this.handleRemoveListMedicamentos}
                                       handleEdit={this.handleEditMedicamento}
                                    />
                                 </Grid>
                              </Grid>
                           </CardContent>
                        </TabContainer>
                     }
                     { tab === 2 &&
                        <TabContainer>
                           <CardContent>
                              <Grid container spacing={8}>
                                 <Grid item xs={12}>
                                    <ListClinicos
                                       data={this.state.data_clinicos}
                                       handleRemove={(evt)=>{}}
                                       handleEdit={(evt)=>{}}
                                    />
                                 </Grid>
                              </Grid>
                           </CardContent>
                        </TabContainer>
                     }
                  </Card>
               </Grid>
            </Grid>
         </Wrapper>
      )
   }
}

ConsultaHome.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(SocialStyles)(ConsultaHome);
