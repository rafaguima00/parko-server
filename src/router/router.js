const express = require("express")
const router = express.Router()

//controllers
const controllers = {
    colab: require("../controller/colaborators"),
    estab: require("../controller/establishments"),
    horaFuncionamento: require("../controller/horario_funcionamento"),
    priceTable: require("../controller/tabela_preco"),
    reserv: require("../controller/reservations"),
    users: require("../controller/users"),
    debts: require("../controller/debts"),
    vehicles: require("../controller/vehicles"),
    ratings: require("../controller/ratings"),
    accounts: require("../controller/accounts"),
    heritage: require("../controller/heritage"),
    occurrence: require("../controller/occurrence"),
    aportes: require("../controller/aportes"),
    retiradas: require("../controller/retiradas")
}

//middlewares
const middlewares = {
    colab: require("../middleware/colaborators"),
    reserv: require("../middleware/reservations"),
    users: require("../middleware/users")
}

//Definir rotas
const routes = [
    //Colaboradores
    { path: "/colaborators", method: "get", handler: controllers.colab.getColaborators },
    { path: "/colaborators/:id", method: "get", handler: controllers.colab.getColaboratorsById },
    { path: "/colaborators", method: "post", middleware: middlewares.colab.validateBody, handler: controllers.colab.postColaborators },
    { path: "/colaborators/:id", method: "delete", handler: controllers.colab.deleteColaborators },
    { path: "/colaborators/:id", method: "put", middleware: middlewares.colab.validateRequestPut, handler: controllers.colab.updateColaborators },
    { path: "/login", method: "post", handler: controllers.colab.loginColaborators },

    //estacionamentos
    { path: "/establishments", method: "get", handler: controllers.estab.getEstablishments },
    { path: "/establishments/:id", method: "get", handler: controllers.estab.getEstablishmentById },
    { path: "/establishments", method: "post", handler: controllers.estab.createEstablishment },
    { path: "/establishments/:id", method: "delete", handler: controllers.estab.deleteEstablishment },
    { path: "/establishments/:id", method: "patch", handler: controllers.estab.updateEstablishment },

    //Horário de funcionamento
    { path: "/hora_funcionamento", method: "get", handler: controllers.horaFuncionamento.getOpeningHour },
    { path: "/hora_funcionamento/:id", method: "get", handler: controllers.horaFuncionamento.getOpeningHourByParking },
    { path: "/hora_funcionamento", method: "post", handler: controllers.horaFuncionamento.postOpeningHour },
    { path: "/hora_funcionamento/:id", method: "delete", handler: controllers.horaFuncionamento.deleteOpeningHour },
    { path: "/hora_funcionamento/:id", method: "put", handler: controllers.horaFuncionamento.putOpeningHour },

    //Tabela de preços
    { path: "/tabela_preco", method: "get", handler: controllers.priceTable.getPriceTable },
    { path: "/tabela_preco/:id", method: "get", handler: controllers.priceTable.getPriceTableById },
    { path: "/tabela_preco", method: "post", handler: controllers.priceTable.postPriceTable },
    { path: "/tabela_preco/:id", method: "put", handler: controllers.priceTable.putPriceTable },
    { path: "/tabela_preco/:id", method: "delete", handler: controllers.priceTable.deletePriceTable },

    // Reservas
    { path: "/reservations", method: "get", handler: controllers.reserv.getReservations },
    { path: "/reservations/:id", method: "get", handler: controllers.reserv.getReservationById },
    { path: "/reservations/parking/:id", method: "get", handler: controllers.reserv.getReservByParkingId },
    { path: "/reservations", method: "post", handler: controllers.reserv.postReservations },
    { path: "/reservations/:id", method: "delete", handler: controllers.reserv.deleteReservation },
    { path: "/reservations/:id", method: "put", middleware: middlewares.reserv.validatePutRequest, handler: controllers.reserv.updateReservation },

    // Usuários B2C
    { path: "/users", method: "get", handler: controllers.users.getUsers },
    { path: "/users", method: "post", middleware: middlewares.users.validateBody, handler: controllers.users.postUsers },
    { path: "/users/:id", method: "delete", handler: controllers.users.deleteUsers },
    { path: "/users/:id", method: "put", middleware: middlewares.users.updateBody, handler: controllers.users.putUsers },
    { path: "/users/login", method: "post", handler: controllers.users.loginUsers },

    // Dívidas
    { path: "/debts", method: "get", handler: controllers.debts.getDebts },
    { path: "/debts/:id", method: "get", handler: controllers.debts.getSelectedDebt },
    { path: "/debts", method: "post", handler: controllers.debts.postDebts },
    { path: "/debts/:id", method: "delete", handler: controllers.debts.deleteDebts },
    { path: "/debts/:id", method: "put", handler: controllers.debts.putDebts },

    // Veículos
    { path: "/vehicles", method: "get", handler: controllers.vehicles.getVehicles },
    { path: "/vehicles/:id", method: "get", handler: controllers.vehicles.getVehiclesByOwnerId },
    { path: "/vehicles", method: "post", handler: controllers.vehicles.postVehicles },
    { path: "/vehicles/:id", method: "delete", handler: controllers.vehicles.deleteVehicle },

    { path: "/ratings", method: "get", handler: controllers.ratings.getRatings },
    { path: "/ratings", method: "post", handler: controllers.ratings.postRatings },
    { path: "/ratings/:id", method: "delete", handler: controllers.ratings.deleteRatings },
    { path: "/ratings/:id", method: "put", handler: controllers.ratings.putRatings },

    // Registro de Contas
    { path: "/accounts", method: "get", handler: controllers.accounts.getAccounts },
    { path: "/accounts", method: "post", handler: controllers.accounts.postAccounts },
    { path: "/accounts/:id", method: "put", handler: controllers.accounts.putAccounts },
    { path: "/accounts/:id", method: "delete", handler: controllers.accounts.deleteAccount },

    // Registro de Patrimônio
    { path: "/heritage", method: "get", handler: controllers.heritage.getHeritage },
    { path: "/heritage", method: "post", handler: controllers.heritage.postHeritage },
    { path: "/heritage/:id", method: "put", handler: controllers.heritage.putHeritage },
    { path: "/heritage/:id", method: "delete", handler: controllers.heritage.deleteHeritage },

    // Registro de ocorrências
    { path: "/occurrence", method: "get", handler: controllers.occurrence.getOccurrence },
    { path: "/occurrence", method: "post", handler: controllers.occurrence.postOccurrence },
    { path: "/occurrence/:id", method: "put", handler: controllers.occurrence.putOccurrence },
    { path: "/occurrence/:id", method: "delete", handler: controllers.occurrence.deleteOccurrence },

    //Aportes
    { path: "/aportes", method: "get", handler: controllers.aportes.getAportes },
    { path: "/aportes", method: "post", handler: controllers.aportes.postAportes },
    { path: "/aportes/:id", method: "delete", handler: controllers.aportes.deleteAportes },

    //Retiradas
    { path: "/retiradas", method: "get", handler: controllers.retiradas.getRetiradas },
    { path: "/retiradas", method: "post", handler: controllers.retiradas.postRetiradas },
    { path: "/retiradas/:id", method: "delete", handler: controllers.retiradas.deleteRetiradas }
]

routes.forEach(route => {
    if(route.middleware) {
        router[route.method](route.path, route.middleware, route.handler)
    } else {
        router[route.method](route.path, route.handler)
    }
})

module.exports = router