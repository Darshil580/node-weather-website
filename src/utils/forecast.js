const request = require('request')

const forecast = (latitude,longitude,callback) => {

    url = 'https://api.openweathermap.org/data/2.5/onecall?lat='+latitude+'&lon='+longitude+'&lang=en&units=metric&appid=9c6a838e22dde83144fed56efc5ddb9a'
    request({url,json:true},(error,{body})=>{
        if(error){
            callback('Unable to Connect to the Weather API Service. Please Check your internet connection.',undefined)
        }
        else if(body.message){
            callback('Unable to find the weather report of the given coordinates.',undefined)
        }
        else{
            callback(undefined,
            //     {
            //     weather:response.body.current.weather[0].main,
            //     temprature:response.body.current.temp,
            //     weather_description:response.body.current.weather[0].description,
            // }
            'Atmosphere:'+body.current.weather[0].description+". It is currently " + body.current.temp + " degree celcius out. "+ "currently total Cloudes in area: "+ body.current.clouds
            )
        }
    })
}


module.exports = forecast