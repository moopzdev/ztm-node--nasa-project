const http = require("http")
const mongoose = require("mongoose")
require('dotenv').config()

const app = require('./app')

const { loadPlanetsData } = require("./models/planets.model")

const PORT = process.env.PORT || 8000

const MONGO_URL = process.env.MONGO_URL

const server = http.createServer(app)

mongoose.connection.once('open', () => {
  console.log("MongoDB connection ready")
})

mongoose.connection.on('error', (err) => { console.log(err) })

async function startServer() {
  await mongoose.connect(MONGO_URL)
  await loadPlanetsData()

  server.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}.....`)
  })
}

startServer()



