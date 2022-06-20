const { planets } = require("../../models/planets.model")

module.exports.getAllPlanets = (req, res) => {
  res.status(200).json(planets)
}