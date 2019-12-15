import React, { Component } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';

import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from  '@material-ui/core/ListItemSecondaryAction';

import green from '@material-ui/core/colors/green';
import amber from '@material-ui/core/colors/amber';

import Snackbar from '@material-ui/core/Snackbar';
import SnackbarContent from '@material-ui/core/SnackbarContent';
import Slide from '@material-ui/core/Slide';
import Drawer from '@material-ui/core/Drawer';

import Input  from '@material-ui/core/Input';
import TextField from '@material-ui/core/TextField';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import FormHelperText from '@material-ui/core/FormHelperText';
import InputLabel  from '@material-ui/core/InputLabel';

import Add from '@material-ui/icons/Add';
import Delete from '@material-ui/icons/Delete';
import Edit from '@material-ui/icons/Edit';
import Save from '@material-ui/icons/Save';
import Done from '@material-ui/icons/Done';
import Search from '@material-ui/icons/Search';
import Clear from '@material-ui/icons/Clear';
import ErrorIcon from '@material-ui/icons/Error';
import InfoIcon from '@material-ui/icons/Info';
import CloseIcon from '@material-ui/icons/Close';
import WarningIcon from '@material-ui/icons/Warning';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

import { Wrapper } from '../../components';
import SocialStyles from '../../styles/Social';

import {MenuItem} from "@material-ui/core";

import ListClinicos from "../../stateless/ListClinicos";
import ListContactos from "../../stateless/ListContactos";
import ModalAlert from "../../stateless/ModalAlert";


const TabContainer = (props) => (
   <Typography component="div" className="pa-0">
      {  props.children }
   </Typography>
);

const variantIcon = {
   success: CheckCircleIcon,
   warning: WarningIcon,
   error: ErrorIcon,
   info: InfoIcon,
};

const styles1 = theme => ({
   success: {
      backgroundColor: green[600],
   },
   error: {
      backgroundColor: theme.palette.error.dark,
   },
   info: {
      backgroundColor: theme.palette.primary.dark,
   },
   warning: {
      backgroundColor: amber[700],
   },
   icon: {
      fontSize: 20,
   },
   iconVariant: {
      opacity: 0.9,
      marginRight: theme.spacing.unit,
   },
   message: {
      display: 'flex',
      alignItems: 'center',
   },
});

const MySnackbarContent = props => {
   const { classes, className, message, onClose, variant, ...other } = props;
   const Icon = variantIcon[variant];

   return (
      <SnackbarContent
         className={classNames(classes[variant], className)}
         aria-describedby="client-snackbar"
         message={
            <span id="client-snackbar" className={classes.message}>
               <Icon className={classNames(classes.icon, classes.iconVariant)} />
               {message}
            </span>
         }
         action={[
            <IconButton
               key="close"
               aria-label="Close"
               color="inherit"
               className={classes.close}
               onClick={onClose}
               >
               <CloseIcon className={classes.icon} />
            </IconButton>,
         ]}
         {...other}
         />
   );
}

MySnackbarContent.propTypes = {
   classes: PropTypes.object.isRequired,
   className: PropTypes.string,
   message: PropTypes.node,
   onClose: PropTypes.func,
   variant: PropTypes.oneOf(['success', 'warning', 'error', 'info']).isRequired,
};

const MySnackbarContentWrapper = withStyles(styles1)(MySnackbarContent);

const TransitionLeft = props => {
   return <Slide {...props} direction='left' />
}

class PacienteHome extends Component {
   state = {
      tab: 0,
      paciente:{
         id:'',
         nombre:'',
         apellido_paterno:'',
         apellido_materno:'',
         sexo: 'M',
         sangre:'M',
         fecha_nacimiento:'',
         altura:'',
         peso:''
      },
      direccion:{
         id:'',
         calle:'',
         numero:'',
         entre:'',
         colonia:'',
         municipio:''
      },
      tipo_contacto:'',
      tipo_clinico:'',
      clinico_edit:'',
      clinico:{
         id:'',
         clinico_oid:-1,
         clinico_tipo:"",
         clinico_label:"",
         clinico_descripcion:""
      },
      contacto_edit:'',
      contacto:{
         id:'',
         oid:-1,
         tipo:"",
         label:"",
         descripcion:""
      },
      data_contactos:[],
      data_clinicos:[],
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
      },
      openMsg:false,
      variantMsg: 'warning',
      snackMsg: '',
      Transition: null,
      error:{}
   };

   componentWillMount = () => {

   }

   componentDidMount = () => {
      const { params } = this.props.match;
      if (params.hasOwnProperty("id")){
         const url = '/api/persona/'+params.id;
         fetch(url,{
            method:'GET',
            headers:{
               'Accept': 'application/json',
               'content-type': 'application/json'
            }
         }).then(response => {
            return response.json();
         }).then(data =>{
            this.handleData(data);
         });
      } else {
         let paciente={
            id:'',
            nombre:'',
            apellido_paterno:'',
            apellido_materno:'',
            sexo: '',
            sangre:'',
            fecha_nacimiento:'',
            altura:'',
            peso:''
         };

         let direccion = {
            id:'',
            calle:'',
            numero:'',
            entre:'',
            colonia:'',
            municipio:''
         };

         let data_contactos = [];

         let data_clinicos = [];

         this.setState({paciente,direccion,data_contactos,data_clinicos});
      }
   }

   componentWillReceiveProps = (nextProps) => {

   }

   componentWillUpdate = (nextProps, nextState) => {

   }

   componentDidUpdate = (prevProps, prevState) => {

   }

   componentWillUnmount = () => {

   }

    handleData = (data) => {
        let paciente={
            id:data.id,
            nombre:data.nombre,
            apellido_paterno:data.apepat,
            apellido_materno:data.apemat,
            sexo: data.sexo,
            sangre:data.sangre,
            fecha_nacimiento:data.fecha_nacimiento,
            altura:data.altura,
            peso:data.peso
        };

      let direccion = {
         id:'',
         calle:'',
         numero:'',
         entre:'',
         colonia:'',
         municipio:''
      };

      data.direccion.map(item =>
         direccion = {
            id:item.id,
            calle:item.calle,
            numero:item.numero,
            entre:item.entre,
            colonia:item.colonia,
            municipio:item.municipio
         }
      );

      let data_contactos = [];

      data.agenda.map((item,idx) =>
         data_contactos.push({
            id: item.id,
            oid: idx,
            tipo: item.catmaster_id,
            label: item.catalogo.etiqueta,
            descripcion: item.descripcion
         })
      );

      let data_clinicos = [];
      data.expediente.map((item,idx) =>
      data_clinicos.push({
         id:item.id,
         clinico_oid: idx,
         clinico_tipo: item.catmaster_id,
         clinico_label: item.catalogo.etiqueta,
         clinico_descripcion: item.descripcion
      })
   );

   this.setState({paciente,direccion,data_contactos,data_clinicos});
   };

   handlePaciente = (evt) => {
      let paciente = this.state.paciente;
      paciente[evt.target.name] = evt.target.value
      this.setState({paciente:paciente});
   };

   handleDireccion = (evt) => {
      let direccion = this.state.direccion;
      direccion[evt.target.name] = evt.target.value
      this.setState({direccion:direccion});
   };

   handleChange = (evt) => {
      this.setState({ [evt.target.name] : evt.target.value});
   };

   handleTabToggle = (event, tab) => {
      this.setState({ tab });
   };

   handleContacto = (evt) => {
      let contacto = this.state.contacto;
      if (evt.target.name == 'tipo_contacto'){
         let slt_idx = document.getElementById('tipo_contacto').selectedIndex;
         let slt_ops = document.getElementById('tipo_contacto').options;
         let slt_text =  slt_ops[slt_idx].text;
         contacto["label"] = slt_text;
         contacto["tipo"] = evt.target.value;
         contacto["descripcion"] = '';
      } else if (evt.target.name == 'contacto'){
         contacto["descripcion"] = evt.target.value;
      }

      this.setState({contacto: contacto});
   }

   handleClinico = (evt) => {
      let clinico = this.state.clinico;
      if (evt.target.name == 'clinico_tipo'){
         let slt_idx = document.getElementById('clinico_tipo').selectedIndex;
         let slt_ops = document.getElementById('clinico_tipo').options;
         let slt_text =  slt_ops[slt_idx].text;
         clinico["clinico_label"] = slt_text;
         clinico["clinico_descripcion"] = '';
      }
      clinico[evt.target.name] = evt.target.value;
      this.setState({clinico: clinico});
   };

   handleEditClinico = (idx) => {
      let clinico = this.state.clinico;
      let listClinico = this.state.data_clinicos[idx];
      clinico.clinico_oid = idx;
      clinico.clinico_tipo = listClinico.clinico_tipo;
      clinico.clinico_label = listClinico.clinico_label;
      clinico.clinico_descripcion = listClinico.clinico_descripcion;
      this.setState({clinico:clinico,
         clinico_edit:idx+1
      });
   }

   handleEditContacto = (idx) => {
      let contacto = this.state.contacto;
      let listContacto = this.state.data_contactos[idx];
      contacto.oid = idx;
      contacto.tipo = listContacto.tipo;
      contacto.label = listContacto.label;
      contacto.descripcion = listContacto.descripcion;
      this.setState({contacto:contacto,
         contacto_edit:idx+1
      });
   }

   handleEditCancelarClinico = () =>{
      this.setState({clinico_edit:""});
   }
   handleEditCancelarContacto = () =>{
      this.setState({contacto_edit:""});
   }

   handleAddListClinico = (evt) => {
      if(this.state.clinico.clinico_descripcion == ''){
         this.setState({openMsg:true,
            snackMsg:'Debes agregar la descripcion del dato clinico',
            Transition: TransitionLeft
         });
         return false;
      }

      if(this.state.clinico.clinico_tipo == ''){
         this.setState({openMsg:true,
            snackMsg:'Debes seleccionar un dato clinico',
            Transition: TransitionLeft
         });
         return false;
      }

      let ListClinicos = this.state.data_clinicos;
      ListClinicos.push( Object.assign({}, this.state.clinico));
      this.setState({data_clinicos: ListClinicos});
   };

   handleAddListContacto = (evt) => {
      if(this.state.contacto.descripcion == ''){
         this.setState({openMsg:true,
            snackMsg:'Debes agregar la descripcion del contacto',
            Transition: TransitionLeft
         });
         return false;
      }

      if(this.state.contacto.tipo == ''){
         this.setState({openMsg:true,
            snackMsg:'Debes selecionar tu tipo de contacto',
            Transition: TransitionLeft
         });
         return false;
      }


      let ListContactos = this.state.data_contactos;
      ListContactos.push( Object.assign({}, this.state.contacto));
      this.setState({data_contactos: ListContactos});
   };

   handleEditListClinico = (idx) => {
      let clinicos = this.state.data_clinicos;
      clinicos[idx].clinico_tipo = this.state.clinico.clinico_tipo;
      clinicos[idx].clinico_label = this.state.clinico.clinico_label;
      clinicos[idx].clinico_descripcion = this.state.clinico.clinico_descripcion;
      this.setState({data_clinicos:clinicos});
      this.handleEditCancelarClinico();
   }

   handleEditListContacto = (idx) => {
      let contacto = this.state.data_contactos;
      contacto[idx].tipo = this.state.contacto.tipo;
      contacto[idx].label = this.state.contacto.label;
      contacto[idx].descripcion = this.state.contacto.descripcion;
      this.setState({data_contactos:contacto});
      this.handleEditCancelarContacto();
   }

   handleRemoveListClinico = (idx) => {
      let modal = this.state.modal;
      let clinico = this.state.clinico;
      clinico.clinico_oid = idx;
      this.setState({clinico:clinico});
      modal.open = true;
      modal.title = "¡¡¡Advertencia¡¡¡";
      modal.descripcion = "Desea eliminar el dato clinico";
      modal.handleConfirm = (evt) => {
         let clinicos = this.state.data_clinicos.filter((item,key) => key != this.state.clinico.clinico_oid);
         this.setState({data_clinicos:clinicos});
         this.state.modal.handleClose();
      }
      this.setState({modal:modal});
   };

   handleRemoveListContacto = (idx) => {
      let modal = this.state.modal;
      let contacto = this.state.contacto;
      contacto.oid = idx;
      this.setState({contacto:contacto});
      modal.open = true;
      modal.title = "¡¡¡Advertencia¡¡¡";
      modal.descripcion = "Desea eliminar el contacto";
      modal.handleConfirm = (evt) => {
         let contactos = this.state.data_contactos.filter((item,key) => key != this.state.contacto.oid);
         this.setState({data_contactos:contactos});
         this.state.modal.handleClose();
      }
      this.setState({modal:modal});
   }

   handleSave = (evt) => {
      let persona = this.state.paciente;
      let direccion = this.state.direccion;
      let contactos = this.state.data_contactos;
      let clinicos = this.state.data_clinicos;
      let error = {};

      if (persona.nombre == ''){
         error.nombre = "Debes ingresar el nombre del paciente";
      }

      if (persona.apellido_paterno == ''){
         error.apellido_paterno = "Debes ingresar el apellido paterno del paciente";
      }

      if (persona.fecha_nacimiento == ''){
         error.fecha_nacimiento = "Debes ingresar la fecha de nacimiento del paciente";
      }

      if (direccion.calle == ''){
         error.calle = "Debes ingresar la dirección del paciente";
      }

      if (direccion.numero == ''){
         error.numero = "Debes ingresar el número dirección del paciente";
      }

      if (direccion.colonia == ''){
         error.colonia = "Debes ingresar la colonia de la dirección del paciente";
      }

      if (direccion.municipio == ''){
         error.municipio = "Debes ingresar el municipio de la dirección del paciente";
      }

      persona['direccion'] = direccion;
      persona['contactos'] = contactos;
      persona['clinicos'] = clinicos;
      //console.log(error);
      this.setState({error});
      if (Object.keys(error).length == 0){
         fetch('/api/persona',{
            method:'post',
            headers:{
               'Accept': 'application/json',
               'content-type': 'application/json'
            },
            body: JSON.stringify(persona)
         }).then(response => {
            return response.json();
         }).then(data =>{
            let modal = this.state.modal;
            modal.open = true;
            modal.title = "¡¡¡Información¡¡¡";
            modal.descripcion = "Su información a sido almacenada correctamente";
            modal.handleConfirm = (evt) => {
               this.handleData(data);
               this.state.modal.handleClose();
            }
            this.setState({modal:modal});
         });
      }
   }

   handleCloseMsg = (evt) => {
      this.setState({ openMsg: false });
   }

   render() {
      const { classes } = this.props;
      const { tab,modal,clinico_edit,contacto_edit,paciente,direccion,error } = this.state;

      return (
         <Wrapper>
            <ModalAlert
               open={this.state.modal.open}
               title={modal.title}
               descripcion={modal.descripcion}
               handleConfirm={modal.handleConfirm}
               handleClose={modal.handleClose}
               >
            </ModalAlert>
            <Snackbar
               anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'center',
               }}
               open={this.state.openMsg}
               TransitionComponent={this.state.Transition}
               >
               <MySnackbarContentWrapper
                  onClose={this.handleCloseMsg}
                  variant={this.state.variantMsg}
                  message={this.state.snackMsg}
                  />
            </Snackbar>
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
                           <Grid item xs={12} sm={7} md={7} lg={7} container spacing={8}>
                              <Grid item xs={12} sm={12} md={12} lg={12}>
                                 <TextField id="nombre" name="nombre" value={paciente.nombre} error={error.nombre && Boolean(error.nombre)} helperText={error.nombre ? error.nombre : "Nombre de paciente"} onChange={this.handlePaciente} fullWidth/>
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={6}>
                                 <TextField id="apellido_paterno" name="apellido_paterno" value={paciente.apellido_paterno} error={error.apellido_paterno && Boolean(error.apellido_paterno)} helperText={error.apellido_paterno ? error.apellido_paterno : "Apellido paterno"}  onChange={this.handlePaciente} fullWidth/>
                              </Grid>
                              <Grid item xs={12} sm={6} md={6} lg={6}>
                                 <TextField id="apellido_materno" name="apellido_materno" value={paciente.apellido_materno} helperText="Apellido materno"  onChange={this.handlePaciente} fullWidth/>
                              </Grid>
                           </Grid>
                           <Grid item  xs={12} sm={5} md={5} lg={5}>
                              <TextField type="date" id="fecha_nacimiento" name="fecha_nacimiento" value={paciente.fecha_nacimiento} error={error.fecha_nacimiento && Boolean(error.fecha_nacimiento)} helperText={error.fecha_nacimiento ? error.fecha_nacimiento : "Fecha nacimiento"} onChange={this.handlePaciente} fullWidth/>
                              <Select id="sexo" name="sexo" value={paciente.sexo}  onChange={this.handlePaciente} fullWidth>
                                 <MenuItem value="M">Masculino</MenuItem>
                                 <MenuItem value="F">Femenino</MenuItem>
                              </Select>
                              <FormHelperText>Sexo</FormHelperText>
                           </Grid>
                        </Grid>
                     </CardContent>
                     <Divider />
                     <CardContent className="text-xs-center">
                        <Grid container spacing={8}>
                           <Grid item xs={12} sm={4} md={4} lg={4}>
                              <Select id="sangre" name="sangre" value={paciente.sangre}  onChange={this.handlePaciente} fullWidth>
                                 <MenuItem value="A+">A+</MenuItem>
                                 <MenuItem value="A-">A-</MenuItem>
                                 <MenuItem value="B+">B+</MenuItem>
                                 <MenuItem value="B-">B-</MenuItem>
                                 <MenuItem value="AB+">AB+</MenuItem>
                                 <MenuItem value="AB-">AB-</MenuItem>
                                 <MenuItem value="O+">0+</MenuItem>
                                 <MenuItem value="O-">0-</MenuItem>
                              </Select>
                              <FormHelperText>Tipo de sangre</FormHelperText>
                           </Grid>
                           <Grid item xs={12} sm={4} md={4} lg={4}>
                              <TextField id="altura" name="altura" value={paciente.altura} helperText="Altura"   onChange={this.handlePaciente} fullWidth/>
                           </Grid>
                           <Grid item xs={12} sm={4} md={4} lg={4}>
                              <TextField id="peso" name="peso" value={paciente.peso} helperText="Peso" onChange={this.handlePaciente} fullWidth/>
                           </Grid>
                        </Grid>
                     </CardContent>
                  </Card>
               </Grid>
               <Grid item xs={12} sm={12} md={12} lg={12}>
                  <Card>
                     <Tabs value={tab} onChange={this.handleTabToggle}>
                        <Tab label="Direccion" classes={{ root: classes.tabRoot }} />
                        <Tab label="Datos de contacto" classes={{ root: classes.tabRoot }} />
                        <Tab label="Datos clinico" classes={{ root: classes.tabRoot }} />
                     </Tabs>
                     <Divider />
                     { tab == 0 &&
                        <TabContainer>
                           <CardContent className="pb-0">
                              <Grid container spacing={8}>
                                 <Grid item xs={8}>
                                    <TextField id="calle" name="calle" value={direccion.calle}  error={error.calle && Boolean(error.calle)} helperText={error.calle ? error.calle : "Calle"} onChange={this.handleDireccion} fullWidth/>
                                 </Grid>
                                 <Grid item xs={4}>
                                    <TextField id="numero" name="numero" value={direccion.numero}  error={error.numero && Boolean(error.numero)} helperText={error.numero ? error.numero : "Número"} onChange={this.handleDireccion} fullWidth/>
                                 </Grid>
                                 <Grid item xs={12}>
                                    <TextField id="entre" name="entre" value={direccion.entre} helperText="Entre calles" onChange={this.handleDireccion} fullWidth/>
                                 </Grid>
                                 <Grid item xs={6}>
                                    <TextField id="colonia" name="colonia" value={direccion.colonia} error={error.colonia && Boolean(error.colonia)} helperText={error.colonia ? error.colonia : "Colonia"} onChange={this.handleDireccion} fullWidth/>
                                 </Grid>
                                 <Grid item xs={6}>
                                    <TextField id="municipio" name="municipio" value={direccion.municipio} error={error.municipio && Boolean(error.municipio)} helperText={error.municipio ? error.municipio : "Poblacion o Municipio"} onChange={this.handleDireccion} fullWidth/>
                                 </Grid>
                              </Grid>
                           </CardContent>
                        </TabContainer>
                     }
                     { tab == 1 &&
                        <TabContainer>
                           <CardContent>
                              <Grid container spacing={8}>
                                 <Grid item xs={4}>
                                    <Select id="tipo_contacto" name="tipo_contacto"
                                       native value={this.state.contacto.tipo}
                                       onChange={this.handleContacto}
                                       fullWidth
                                       >
                                       <option value="">Seleccione una opcion</option>
                                       <option value="1">Celular</option>
                                       <option value="2">Telefono de casa</option>
                                       <option value="3">Telefono oficina</option>
                                       <option value="4">Facebook</option>
                                       <option value="5">Twitter</option>
                                    </Select>
                                    <FormHelperText>Contacto</FormHelperText>
                                    <TextField id="contacto" name="contacto"
                                       value = {this.state.contacto.descripcion}
                                       onChange={this.handleContacto} helperText="Descripción" fullWidth
                                       />
                                 </Grid>
                                 <Grid item xs={1}>
                                    <FormControl className={classes.formControl} fullWidth>
                                       { contacto_edit == '' &&
                                          <Button variant="fab" color="primary" aria-label="Nuevo" className={classes.fab}
                                             onClick={this.handleAddListContacto}>
                                             <Add />
                                          </Button>
                                       }
                                       { contacto_edit != '' &&
                                          <Button variant='fab' color="primary" aria-label="Editar" className={classes.tab}
                                             onClick = {(evt) => this.handleEditListContacto(this.state.contacto.oid) }
                                             >
                                             <Done />
                                          </Button>
                                       }
                                       { contacto_edit != '' &&
                                          <Button variant='fab' color="secondary" aria-label="Cancelar" className={classes.tab}
                                             onClick = {(evt) => this.handleEditCancelarContacto() }
                                             >
                                             <Clear />
                                          </Button>
                                       }
                                    </FormControl>
                                 </Grid>
                                 <Grid item xs={7}>
                                    <List>
                                       {
                                          this.state.data_contactos.map((item, idx) =>
                                          <ListItem key={idx} >
                                             <ListItemText  primary={item.label} secondary={item.descripcion} />
                                             <ListItemSecondaryAction>
                                                <Button aria-label="Eliminar" onClick={(evt) => this.handleRemoveListContacto(idx)}>
                                                   <Delete />
                                                </Button>
                                                <Button aria-label="Editar" onClick={(evt) => this.handleEditContacto(idx)}>
                                                   <Edit />
                                                </Button>
                                             </ListItemSecondaryAction>
                                          </ListItem>
                                       )
                                    }
                                 </List>
                              </Grid>
                           </Grid>
                        </CardContent>
                     </TabContainer>
                  }
                  { tab == 2 &&
                     <TabContainer>
                        <CardContent>
                           <Grid container spacing={8}>
                              <Grid item xs={4}>
                                 <InputLabel>Dato clinico</InputLabel>
                                 <FormControl className={classes.formControl} fullWidth>
                                    <Select id="clinico_tipo" name = "clinico_tipo"
                                       native
                                       value={this.state.clinico.clinico_tipo}
                                       onChange={this.handleClinico}
                                       >
                                       <option value="">Seleccione una opcion</option>
                                       <option value="6">Alegias</option>
                                       <option value="7">Alegias a Medicamentos</option>
                                       <option value="8">Operacion</option>
                                       <option value="9">Enfermedades</option>
                                    </Select>
                                 </FormControl>
                                 <InputLabel>Descripcion clinica</InputLabel>
                                 <FormControl className={classes.formControl} fullWidth>
                                    <textarea id="clinico_descripcion" name="clinico_descripcion" rows="5"
                                       className={classes.textarea}
                                       onChange={this.handleClinico}
                                       value={this.state.clinico.clinico_descripcion}
                                       />
                                 </FormControl>
                              </Grid>
                              <Grid item xs={1}>
                                 <FormControl className={classes.formControl} fullWidth>
                                    { clinico_edit == '' &&
                                       <Button variant="fab" color="primary" aria-label="Nuevo" className={classes.fab}
                                          onClick={this.handleAddListClinico}>
                                          <Add />
                                       </Button>
                                    }
                                    { clinico_edit != '' &&
                                       <Button variant='fab' color="primary" aria-label="Editar" className={classes.tab}
                                          onClick = {(evt) => this.handleEditListClinico(this.state.clinico.clinico_oid) }
                                          >
                                          <Done />
                                       </Button>
                                    }
                                    { clinico_edit != '' &&
                                       <Button variant='fab' color="secondary" aria-label="Cancelar" className={classes.tab}
                                          onClick = {(evt) => this.handleEditCancelarClinico() }
                                          >
                                          <Clear />
                                       </Button>
                                    }
                                 </FormControl>
                              </Grid>
                              <Grid item xs={7}>
                                 <ListClinicos
                                    data={this.state.data_clinicos}
                                    handleRemove={this.handleRemoveListClinico}
                                    handleEdit={this.handleEditClinico}
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

PacienteHome.propTypes = {
   classes: PropTypes.object.isRequired,
};

export default withStyles(SocialStyles)(PacienteHome);
