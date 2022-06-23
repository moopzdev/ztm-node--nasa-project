const { parse } = require("csv-parse")
const path = require("path")
const fs = require("fs")

const planets = require('./planets.mongo')

isHabitable = (planet) => {
  return planet['koi_disposition'] === 'CONFIRMED'
    && planet["koi_insol"] > 0.36 && planet["koi_insol"] < 1.11
    && planet["koi_prad"] < 1.6
}

const loadPlanetsData = () => {
  return new Promise((resolve, reject) => {
    fs.createReadStream(path.join(__dirname, "..", "..", "data", "kepler_data.csv"))
      .pipe(parse({
        comment: "#",
        columns: true,
      }))
      .on('data', async (data) => {
        if (isHabitable(data)) {
          savePlanet(data)
        }
      }).on('error', err => {
        reject(err)
      })
      .on('end', async () => {
        const countPlanetsFound = await getAllPlanets()
        console.log(`Planets found = ${countPlanetsFound.length}`)
        resolve()
      });
  })
}

async function getAllPlanets() {
  return await planets.find({});
}

async function savePlanet(data) {
  try {
    await planets.updateOne({
      keplerName: data.kepler_name
    }, {
      keplerName: data.kepler_name
    }, { upsert: true });
  } catch (error) {
    console.error(`Could not save planet ${error}`)
  }
}

module.exports = {
  loadPlanetsData,
  getAllPlanets,
  planets
}