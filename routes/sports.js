const
express = require('express')
sportsRouter = new express.Router()
passport = require('passport')
httpClient = require('request')
require('dotenv').load()
key = process.env.sportsKey

sportsRouter.route('/')
.get((req, res) => {
  var apiUrl = `http://api.sportradar.us/nfl-ot2/games/2017/REG/7/schedule.json?api_key=${key}`
  httpClient.get(apiUrl, (err, response, body) => {
      var data = JSON.parse(body)
      // console.log(data)
      res.json(data)
    //   console.log(data.week.games[2].home.alias) //test 
  })
})

sportsRouter.route('/stats/:id')
.get((req, res) => {
  // var statsUrl = `http://api.sportradar.us/nfl-ot2/seasontd/2017/REG/teams/33405046-04ee-4058-a950-d606f8c30852/statistics.json?api_key=${key}`
  
  var statsUrl = `https://api.sportradar.us/nfl-ot2/seasontd/2017/REG/teams/${req.params.id}/statistics.json?api_key=${key}`
  httpClient.get(statsUrl, (err, response, body) => {
    if(err) return console.log(err)
      // var data = JSON.parse(body)
      console.log(body)
      res.json(body)
  })
})


module.exports = sportsRouter