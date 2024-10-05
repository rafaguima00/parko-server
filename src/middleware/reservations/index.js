const modelVehicle = require("../../model/vehicles")
const modelReservations = require("../../model/reservations")

const validateBody = async (req, res, next) => {
    
    const { data_entrada, hora_entrada, data_saida, hora_saida, license_plate } = req.body

    if(
        data_entrada === "",
        hora_entrada === "",
        data_saida === "",
        hora_saida === ""
    ) {
        return res.status(400).json({ message: "The field cannot be empty" })
    }

    if(
        data_entrada === undefined,
        hora_entrada === undefined,
        data_saida === undefined,
        hora_saida === undefined
    ) {
        return res.status(400).json({ message: "The field is required" })
    }

    const getVehicles = await modelVehicle.getVehicles()
    const findVehicle = getVehicles.find(item => item.license_plate === license_plate)

    if(!findVehicle) {
        await modelVehicle.createVehicle(req.body, req.body.id_costumer)
    }

    next()
}

const validatePutRequest = async (req, res, next) => {

    if(req.body.status === "Recusado") {
        const gerarNumero = () => {
            const number1 = Math.floor(Math.random()*9000) + 1000
            return number1.toString()
        }
    
        const numeroGerado = gerarNumero()
    
        console.log(numeroGerado)
    }

    next()
}

const atualizarValor = async (req, res, next) => {
    const getReservations = await modelReservations.getReservation()
    
}

module.exports = {
    validateBody,
    validatePutRequest,
    atualizarValor
}