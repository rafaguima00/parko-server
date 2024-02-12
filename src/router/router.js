const express = require("express");
const router = express.Router();

const controlColab = require("../controller/colaborators");
const controlEstab = require("../controller/establishments");
const controlReserv = require("../controller/reservations");
const controlUsers = require("../controller/users");
const controlDebts = require("../controller/debts");
const controlVehicles = require("../controller/vehicles");
const controlAcc = require("../controller/accounts");
const controlHer = require("../controller/heritage");
const controlOccurrence = require("../controller/occurrence");

const middleColab = require("../middleware/colaborators");
const middleReserv = require("../middleware/reservations");
const middleUsers = require("../middleware/users");

//Colaboradores
router.get("/colaborators", controlColab.getColaborators);
router.post("/colaborators", middleColab.validateBody, controlColab.postColaborators);
router.delete("/colaborators/:id", controlColab.deleteColaborators);
router.put("/colaborators/:id", middleColab.validateRequestPut, controlColab.updateColaborators);

//login dos colaboradores
router.post("/colaborators/login", controlColab.loginColaborators);

//estabelecimentos
router.get("/establishments", controlEstab.getEstablishments);
router.get("/establishments/colaborators/:id", controlEstab.getColaboratorsByEst);
router.post("/establishments", controlEstab.createEstablishment);
router.delete("/establishments/:id", controlEstab.deleteEstablishment);
router.put("/establishments/:id", controlEstab.updateEstablishment);

//reservas
router.get("/reservations", controlReserv.getReservations);
router.post("/reservations", middleReserv.validateBody, controlReserv.postReservations);
router.delete("/reservations/:id", controlReserv.deleteReservation);
router.put("/reservations/:id", controlReserv.updateReservation);

//usuários B2C
router.get("/users", controlUsers.getUsers);
router.post("/users", middleUsers.validateBody, controlUsers.postUsers);
router.delete("/users/:id", controlUsers.deleteUsers);
router.put("/users/:id", middleUsers.updateBody, controlUsers.putUsers);

//login dos usuários B2C
router.post("/users/login", controlUsers.loginUsers);

//Dívidas
router.get("/debts", controlDebts.getDebts);
router.get("/debts/:id"); //Pendente
router.post("/debts", controlDebts.postDebts);
router.delete("/debts/:id", controlDebts.deleteDebts);
router.put("/debts/:id", controlDebts.putDebts);

//Veículos
router.get("/vehicles", controlVehicles.getVehicles);
router.get("/vehicles/:id", controlVehicles.getVehiclesByOwnerId);
router.post("/vehicles", controlVehicles.postVehicles);
router.delete("/vehicles/:id", controlVehicles.deleteVehicle);

//Registro de Contas
router.get("/accounts", controlAcc.getAccounts);
router.post("/accounts", controlAcc.postAccounts);
router.put("/accounts/:id", controlAcc.putAccounts);
router.delete("/accounts/:id", controlAcc.deleteAccount);

//Registro de Patrimônio
router.get("/heritage", controlHer.getHeritage);
router.post("/heritage", controlHer.postHeritage);
router.put("/heritage/:id", controlHer.putHeritage);
router.delete("/heritage/:id", controlHer.deleteHeritage);

//Registro de ocorrências
router.get("/occurrence", controlOccurrence.getOccurrence);
router.post("/occurrence", controlOccurrence.postOccurrence);
router.put("/occurrence/:id", controlOccurrence.putOccurrence);
router.delete("/occurrence/:id", controlOccurrence.deleteOccurrence);

module.exports = router;