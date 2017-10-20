const
express = require('express')
sportsRouter = new express.Router()
passport = require('passport')
httpClient = require('request')
require('dotenv').load()
key = process.env.sportsKey,
statsKey = process.env.statsKey

sportsRouter.route('/')
.get((req, res) => {
  var apiUrl = `http://api.sportradar.us/nfl-ot2/games/2017/REG/7/schedule.json?api_key=nrqn8ufuv3w8hbswrjq8bvq5`
  httpClient.get(apiUrl, (err, response, body) => {
      var data = JSON.parse(body)
      // console.log(data)
      res.json(data)
    //   console.log(data.week.games[2].home.alias) //test 
  })
})

sportsRouter.route('/stats/:id')
.get((req, res) => {
  var statUrl = `http://api.sportradar.us/nfl-ot2/seasontd/2017/REG/teams/${req.params.id}/statistics.json?api_key=nrqn8ufuv3w8hbswrjq8bvq5`
  httpClient.get(statUrl, (err, response, body) => {
    if(err) return console.log(err)
      var data = JSON.parse(body)
      // console.log(body)
      res.json(data)
  })
})


module.exports = sportsRouter