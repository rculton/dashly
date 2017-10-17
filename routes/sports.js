const
express = require('express'),
sportsRouter = new express.Router(),
passport = require('passport')
httpClient = require('request')

sportsRouter.route('/')
.get((req, res) => {
  var apiUrl = `http://api.sportradar.us/nfl-ot2/games/2017/REG/7/schedule.json?api_key=ptr58dz7pn2z8mdxbqrcsqdj`
  httpClient.get(apiUrl, (err, response, body) => {
      var data = JSON.parse(body)
      res.json(data)
    //   console.log(data.week.games[2].home.alias) //test 
  })
})

module.exports = sportsRouter