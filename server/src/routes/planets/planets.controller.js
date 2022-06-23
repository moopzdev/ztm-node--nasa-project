const { planets, getAllPlanets } = require("../../models/planets.model")

module.exports.getAllPlanets = async (req, res) => {
  res.status(200).json(await getAllPlanets())
}