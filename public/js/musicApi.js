$(document).ready(function() {
    console.log(<%- JSON.stringify(user) %>)
    
    var musicApi = 'https://itunes.apple.com/search?media=music&limit=10&entity=musicTrack&term=john+legend'
    var music
    var i = 0
    $.ajax({
        url: musicApi,
        method: 'get',
        dataType: 'json'
    })
    .done((res, body) => {
        var results = res.results
    
        var generateContent = function(i) {
            music = results[i]
            len = results.length - 1
            // for cover art
            var $coverArt = $('<img>')
            $coverArt.attr('src', music.artworkUrl100).attr('style', 'width:100%;')
            var $caption = $('<figcaption>')
            $caption.text(music.collectionName)
            $('#cover-art').empty().append($coverArt, $caption)
            // for music info
            var $h2 = $(`<h2>${music.artistName}</h2>`);
            var $div = $('<div class="container">')
            var $h3 = $(`<h3>${music.trackName}</h3>`)
            var $audioPlayer = $(`<audio src="${music}" controls>Your browser doesn't support the audio element</audio>`)
    
            $('#music-info').empty().append($h2, $h3,`<audio src="${music.previewUrl}" controls>
                Your browser does not support the audio element.
                </audio>`, `<button id="next">Next</button> `)
            $('#next').on('click', () => {
                if(i >= len) {
                    i = 0;
                } else {
                    i++;
                }
                generateContent(i)
            })
        }
        generateContent(i)
        })  
    
})

