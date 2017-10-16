const
    express = require('express'),
    whRouter = new express.Router()
    require('dotenv').load();
    const webhoseio = require('webhoseio');
    const client = webhoseio.config({token: process.env.webhoseKey});
//

whRouter.get('/:query', (req, res)=>{
    var queryParams = {
        "q": `site_type:news ${req.params.query} language:english`,
        "sort":"crawled"
    }
    client.query('filterWebContent', queryParams)
    .then(output =>{
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