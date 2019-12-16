// Icons
import ExploreIcon from '@material-ui/icons/Explore';
import AppsIcon from '@material-ui/icons/Apps';
// Pages
import {
    Home,
    PacienteHome,
    ConsultaHome,
    ExpedienteHome,
    SearchPacientes
} from './pages';

export default {
    items: [{
        path: '/',
        name: 'Inicio',
        type: 'link',
        icon: ExploreIcon,
        component: Home
    }, {
        path: '/paciente',
        name: 'Paciente',
        type: 'submenu',
        icon: AppsIcon,
        children: [{
            path: '/home',
            name: 'Nuevo',
            component: PacienteHome
        },{
            path: '/home/:id',
            name: 'Actualizar',
            component: PacienteHome
        },{
            path: '/search',
            name: 'Buscar',
            component: SearchPacientes
        }]
    }, {
        path: '/consulta',
        name: 'Consulta',
        type: 'submenu',
        icon: AppsIcon,
        children: [{
            path: '/home',
            name: 'Nueva',
            component: ConsultaHome
        },{
            path: '/:id',
            name: 'Buscar',
            component: ConsultaHome
        }]
    }, {
        path: '/expediente',
        name: 'expediente',
        type: 'submenu',
        icon: AppsIcon,
        children: [{
            path: '/home',
            name: 'Clinico',
            component: ExpedienteHome
        }]
    }]
};
