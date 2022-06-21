const { launches, addNewLaunch, existLaunchWithId, abortLaunchById } = require("../../models/launches.model")

module.exports.getAllLaunches = (req, res) => {
  return res.status(200).json(Array.from(launches.values()))
}

module.exports.addNewLaunch = (req, res) => {
  const launch = req.body;
  if (!launch.mission || !launch.rocket || !launch.launchDate || !launch.target) {
    return res.status(400).json({ error: "Some required inputs missing." })
  }
  launch.launchDate = new Date(launch.launchDate)
  if (isNaN(launch.launchDate)) {
    return res.status(400).json({ error: "Invalid launch date" })
  }
  addNewLaunch(launch);
  return res.status(201).json(launch);
}

module.exports.abortLaunch = (req, res) => {
  const launchID = Number(req.params.id)
  console.log(launchID)
  if (!existLaunchWithId(launchID)) {
    return res.status(404).json({ error: "Launch not found" })
  }
  const aborted = abortLaunchById(launchID)
  return res.status(200).json(aborted);
}