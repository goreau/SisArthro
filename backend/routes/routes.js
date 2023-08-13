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
const EspecieController = require("../controllers/EspecieController");
const IdentificaController = require("../controllers/IdentificaController");


router.get('/', HomeController.index);
router.get('/validate', AdminAuth, HomeController.index);
router.post('/user', UserController.create);
router.put('/user', UserController.update);
router.post("/login",UserController.login);
router.post("/endereco", AdminAuth, UserController.endereco);
router.get("/enderecos/:id", AdminAuth, UserController.enderecos);
router.get("/user/:id", AdminAuth, UserController.getUser);
router.get("/users", AdminAuth, UserController.getUsers);
router.delete("/user/:id", AdminAuth, UserController.delete);

router.post('/localidade', AdminAuth, LocalidadeController.create);
router.get("/localidade/:id", AdminAuth, LocalidadeController.getLocalidade);
router.put('/localidade', AdminAuth, LocalidadeController.update);
router.get("/localidades/:filter", AdminAuth, LocalidadeController.getLocalidades);
router.get("/localidadesbymun/:mun", AdminAuth, LocalidadeController.getLocalidadesByMun);
router.delete('/localidade/:id', AdminAuth, LocalidadeController.delete);

router.post('/codend', AdminAuth, CodendController.create);
router.get("/codend/:id", AdminAuth, CodendController.getCodend);
router.put('/codend', AdminAuth, CodendController.update);
router.get("/codends/:filter", AdminAuth, CodendController.getCodends);
router.get("/codendsbymun/:mun", AdminAuth, CodendController.getCodendsByMun);
router.get("/codendsbyquadra/:qt", AdminAuth, CodendController.getCodendsByQuadra);
router.delete('/codend/:id', AdminAuth, CodendController.delete);

router.get("/municipios/:id", AdminAuth, TerritorioController.getMunicipios);
router.get("/codsis/:id", AdminAuth, TerritorioController.getCodsis);
router.get("/area/:id", AdminAuth, TerritorioController.getSisawebArea);
router.get("/quarteirao/:id", AdminAuth, TerritorioController.getSisawebQuarteirao);

router.get("/auxiliares/:tp", AdminAuth, AuxiliaresController.getAuxiliares);
router.get("/auxiliaresEd/:tp", AdminAuth, AuxiliaresController.getAuxiliaresEd);
router.post('/auxiliares', AdminAuth, AuxiliaresController.create);
router.put('/auxiliares/:id', AdminAuth, AuxiliaresController.update);
router.delete('/auxiliares/:id', AdminAuth, AuxiliaresController.delete);


router.post('/captura', AdminAuth, CapturaController.create);
router.post('/captura_det', AdminAuth, CapturaController.createDet);
router.get("/capturas/:filter", AdminAuth, CapturaController.getCapturas);
router.get("/capturas_det/:master", AdminAuth, CapturaController.getCapturasDet);
router.get("/captura/:id", AdminAuth, CapturaController.getCaptura);
router.get("/captura_det/:id", AdminAuth, CapturaController.getCapturaDet);
router.put('/captura', AdminAuth, CapturaController.update);
router.put('/captura_det', AdminAuth, CapturaController.updateDet);
router.delete('/captura/:id', AdminAuth, CapturaController.delete);
router.delete('/captura_det/:id', AdminAuth, CapturaController.deleteDet);
router.get("/comboCapt/:mun", AdminAuth, CapturaController.getCombo);
router.get("/comboAm/:id", AdminAuth, CapturaController.getComboAm);




router.post('/genero', AdminAuth, EspecieController.createGen);
router.post('/especie', AdminAuth, EspecieController.createSpp);
router.get("/genero/:id", AdminAuth, EspecieController.getGenero);
router.get("/especie/:id", AdminAuth, EspecieController.getEspecie);
router.put('/genero', AdminAuth, EspecieController.updateGen);
router.put('/especie', AdminAuth, EspecieController.updateSpp);
router.get("/generos/:filter", AdminAuth, EspecieController.getGeneros);
router.get("/especies/:filter", AdminAuth, EspecieController.getEspecies);
router.delete('/genero/:id', AdminAuth, EspecieController.deleteGen);
router.delete('/especie/:id', AdminAuth, EspecieController.deleteSpp);
router.get("/comboSpp/:filter", AdminAuth, EspecieController.getCombo);

router.post('/identifica', AdminAuth, IdentificaController.create);
router.get("/identifica/:id", AdminAuth, IdentificaController.getIdentifica);
router.put('/identifica', AdminAuth, IdentificaController.update);
router.get("/identificas/:filter", AdminAuth, IdentificaController.getIdentificas);
router.delete('/identifica/:id', AdminAuth, IdentificaController.delete);
router.post('/identifica_det', AdminAuth, IdentificaController.createDet);
router.get("/identifica_det/:id", AdminAuth, IdentificaController.getIdentificaDet);
router.put('/identifica_det', AdminAuth, IdentificaController.updateDet);
router.get("/identifica_dets/:master", AdminAuth, IdentificaController.getIdentificaDets);
router.delete('/identifica_det/:id', AdminAuth, IdentificaController.deleteDet);


module.exports = router;