import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import { useAuthStore } from '@/store/authStore'

import '../node_modules/bulma/css/bulma.css'
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import {
  faUserSecret,
  faUser,
  faUsers,
  faHouse,
  faFileLines,
  faEnvelope,
  faExclamationTriangle,
  faTrash,
  faEdit,
  faSearch,
  faCaretDown,
  faCaretUp,
  faEye,
  faEyeSlash,
  faCity,
  faFilePdf,
  faFileExcel,
  faFileCsv,
  faLocationPin,
  faTreeCity,
  faBugs,
  faPlusCircle,
  faCheck,
  faBan,
  faList,
  faBroom,
  faVialVirus,
  faScrewdriverWrench,
  faInfo,
  faClose,
  faDog,
  faImage,
  faFileText,
  faSearchLocation,
  faRepeat,
  faMapMarker,
  faMapLocationDot,
  faHandPointUp,
  faMicroscope,
  faDiceD6,
  faRotateBack,
  faChartColumn,
  faLayerGroup,
} from '@fortawesome/free-solid-svg-icons'

/* add icons to the library */
library.add(
  faUserSecret,
  faUser,
  faUsers,
  faHouse,
  faFileLines,
  faEnvelope,
  faExclamationTriangle,
  faTrash,
  faEdit,
  faSearch,
  faCaretDown,
  faCaretUp,
  faEye,
  faEyeSlash,
  faCity,
  faFilePdf,
  faFileExcel,
  faFileCsv,
  faLocationPin,
  faTreeCity,
  faBugs,
  faPlusCircle,
  faCheck,
  faBan,
  faList,
  faBroom,
  faVialVirus,
  faScrewdriverWrench,
  faInfo,
  faClose,
  faDog,
  faImage,
  faFileText,
  faSearchLocation,
  faRepeat,
  faMapMarker,
  faMapLocationDot,
  faHandPointUp,
  faMicroscope,
  faDiceD6,
  faRotateBack,
  faChartColumn,
  faLayerGroup,
)

const pinia = createPinia()

const app = createApp(App).use(router).use(pinia)

app.config.globalProperties.$authStore = useAuthStore(pinia)

app.component('font-awesome-icon', FontAwesomeIcon).mount('#app')
