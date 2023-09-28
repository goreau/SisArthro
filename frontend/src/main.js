import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'


import '../node_modules/bulma/css/bulma.css'
import { library } from '@fortawesome/fontawesome-svg-core'
import '../node_modules/tabulator-tables/dist/css/tabulator_bulma.min.css'


/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faUserSecret, faUser, faUsers, faHouse, faFileLines, faEnvelope, faExclamationTriangle, faTrash, faEdit, faSearch, faCaretDown, faCaretUp, faEye, faEyeSlash, faCity,
  faFilePdf, faFileExcel, faFileCsv, faLocationPin, faTreeCity, faBugs, faPlusCircle, faCheck, faBan, faList, faBroom, faVialVirus, faScrewdriverWrench, faInfo, faClose } from '@fortawesome/free-solid-svg-icons'


/* add icons to the library */
library.add(faUserSecret, faUser, faUsers, faHouse, faFileLines, faEnvelope, faExclamationTriangle, faTrash, faEdit, faSearch, faCaretDown, faCaretUp, faEye, faEyeSlash, faCity, 
  faFilePdf, faFileExcel, faFileCsv, faLocationPin, faTreeCity, faBugs, faPlusCircle, faCheck, faBan, faList, faBroom, faVialVirus, faScrewdriverWrench, faInfo, faClose)

createApp(App)
.use(router)
.use(store)
.component('font-awesome-icon', FontAwesomeIcon)
.mount('#app')
