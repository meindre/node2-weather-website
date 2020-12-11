const request = require('request')

const geocode = (address,callback)=>{
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ encodeURIComponent(address) + '.json?access_token=pk.eyJ1IjoibWVpbmRyZSIsImEiOiJjazRvMDc0eW4yY3BzM2tsYjIwYzc0Ymt0In0.-bLyeMeBvnxnCuJ-WwufJA'
    request({url : url,json : true},(error,response)=>{
        if(error){
            callback('Unable to connect to weather service', undefined)
        }else if(response.body.features.length === 0){
            callback('Your location not found, try another search',undefined)
        }else{
            callback(undefined,{
                latitude : response.body.features[0].center[1],
                longitude : response.body.features[0].center[0],
                location : response.body.features[0].place_name
            })
        }
    })
}

module.exports = geocode