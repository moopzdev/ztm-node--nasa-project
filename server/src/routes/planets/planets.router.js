const express = require("express")

const controller = require("./planets.controller")

const router = express.Router()

router.get("/", controller.getAllPlanets);

module.exports = router