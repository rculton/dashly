const
    express = require('express'),
    whRouter = new express.Router()
    require('dotenv').load();
    const webhoseio = require('webhoseio');
    const client = webhoseio.config({token: process.env.webhoseKey});
//

whRouter.get('/:query', (req, res)=>{
    var queryParams = {
        "q": `${req.params.query} language:english domain_rank:>5000 site_category:movies performance_score:>3`,
        "ts": "1505600867612",
        "sort":"relevancy"
    }
    client.query('filterWebContent', queryParams)
    .then(output =>{
        console.log(output.posts[0].title)
        res.json(output)
    })

})

// console.log(process.env.webhoseKey)
// const webhoseio = require('webhoseio');
// const whclient = webhoseio.config({token: process.env.webhoseKey});
// var query_params = {
// 	"q": "\"donald trump\" language:english",
// 	"sort": "crawled"
//     }
//     client.query('filterWebContent', query_params)
//     .then(output => {
//         console.log(output['posts'][0]['text']); // Print the text of the first post
//         console.log(output['posts'][0]['published']); // Print the text of the first post publication date
//     });
module.exports = whRouter