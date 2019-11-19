// Icons
import ExploreIcon from '@material-ui/icons/Explore';
import AppsIcon from '@material-ui/icons/Apps';
import PhotoIcon from '@material-ui/icons/Photo';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import Looks3Icon from '@material-ui/icons/Looks3';
import Looks4Icon from '@material-ui/icons/Looks4';
import ViewColumnIcon from '@material-ui/icons/ViewColumn';
import ShowChartIcon from '@material-ui/icons/ShowChart';
import NavigationIcon from '@material-ui/icons/Navigation';
import PagesIcon from '@material-ui/icons/Pages';
import FaceIcon from '@material-ui/icons/Face';
import LocalLibraryIcon from '@material-ui/icons/LocalLibrary';
import PersonIcon from '@material-ui/icons/Person';
import BookmarkIcon from '@material-ui/icons/Bookmark';

// Pages
import {
    Home,
    PacienteHome,
    ExpedienteHome
} from './pages';

export default {
   items: [{
      path: '/',
      name: 'Home',
      type: 'link',
      icon: ExploreIcon,
      component: Home
   }, {
      path: '/paciente',
      name: 'Paciente',
      type: 'submenu',
      icon: AppsIcon,
      badge: {
         type: 'primary',
         value: '5'
      },
      children: [{
         path: '/home',
         name: 'Inicio',
         component: PacienteHome
      }]
   }, {
      path: '/expediente',
      name: 'expediente',
      type: 'submenu',
      icon: AppsIcon,
      badge: {
         type: 'primary',
         value: '5'
      },
      children: [{
         path: '/home',
         name: 'Inicio',
         component: ExpedienteHome
      }]
   }]
};
