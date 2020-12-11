const request = require('request')

const forecast = (latitude,longitude,callback)=>{
    const url = 'http://api.weatherstack.com/current?access_key=a3f28a5ce90b80022048e3b86cf1e855&query='+ latitude + ',' + longitude
    request({url : url,json : true},(error,response)=>{
        if(error){
            callback('Unable to connect to weather service', undefined)
        }else if(response.body.error){
            callback('Your location not found, try another search',undefined)
        }else{
            callback(undefined,response.body.current.weather_descriptions[0] + 'It is currently ' + response.body.current.temperature + ' degrees. It feels like  ' + response.body.current.feelslike + ' degrees out'
                
            )
        }
    })
}

module.exports = forecast

