var express = require("express")
var app = express();
var router = express.Router();
var HomeController = require("../controllers/HomeController");
var UserController = require("../controllers/UserController");
var TerritorioController = require("../controllers/TerritorioController");
var LocalidadeController = require("../controllers/LocalidadeController");
const CodendController = require("../controllers/CodendController");

var AdminAuth = require("../middleware/AdminAuth");
const AuxiliaresController = require("../controllers/AuxiliaresController");
const CapturaController = require("../controllers/CapturaController");


router.get('/', HomeController.index);
router.get('/validate', AdminAuth, HomeController.index);
router.post('/user', UserController.create);
router.put('/user', UserController.update);
router.post("/login",UserController.login);
router.post("/endereco", AdminAuth, UserController.endereco);
router.get("/enderecos/:id", AdminAuth, UserController.enderecos);
router.get("/user/:id", AdminAuth, UserController.getUser);
router.get("/users", AdminAuth, UserController.getUsers);
router.delete("/endereco/:id", AdminAuth, UserController.deleteEndereco);

router.post('/localidade', AdminAuth, LocalidadeController.create);
router.get("/localidade/:id", AdminAuth, LocalidadeController.getLocalidade);
router.put('/localidade', AdminAuth, LocalidadeController.update);
router.get("/localidades/:filter", AdminAuth, LocalidadeController.getLocalidades);
router.get("/localidadesbymun/:mun", AdminAuth, LocalidadeController.getLocalidadesByMun);

router.post('/codend', AdminAuth, CodendController.create);
router.get("/codend/:id", AdminAuth, CodendController.getCodend);
router.put('/codend', AdminAuth, CodendController.update);
router.get("/codends/:filter", AdminAuth, CodendController.getCodends);
router.get("/codendsbymun/:mun", AdminAuth, CodendController.getCodendsByMun);

router.get("/municipios/:id", AdminAuth, TerritorioController.getMunicipios);
router.get("/codsis/:id", AdminAuth, TerritorioController.getCodsis);
router.get("/area/:id", AdminAuth, TerritorioController.getSisawebArea);
router.get("/quarteirao/:id", AdminAuth, TerritorioController.getSisawebQuarteirao);

router.get("/auxiliares/:tp", AdminAuth, AuxiliaresController.getAuxiliares);

router.post('/captura', AdminAuth, CapturaController.create);
router.get("/capturas/:filter", AdminAuth, CapturaController.getCapturas);
router.get("/capturas_det/:master", AdminAuth, CapturaController.getCapturasDet);
router.get("/captura/:id", AdminAuth, CapturaController.getCaptura);
router.get("/captura_det/:id", AdminAuth, CapturaController.getCapturaDet);
router.put('/captura', AdminAuth, CapturaController.update);
router.put('/captura_det', AdminAuth, CapturaController.updateDet);


module.exports = router;