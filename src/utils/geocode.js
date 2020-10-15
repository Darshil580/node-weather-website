const request = require('request')


const geocode = (address,callback) => {
    const url = 'https://api.mapbox.com/geocoding/v5/mapbox.places/'+ address +'.json?access_token=pk.eyJ1IjoiZG9tZTEyMyIsImEiOiJja2ZzYm5oMncwN3JlMndxMmRkOGszcGs0In0.WeYmzRSqocz5cKRU6IeXdg&limit=1'
    request({url,json:true}, (error,{body}) =>{
        if(error){
            callback('Unable to Connect to Location Services.',undefined)
        }else if(body.features.length === 0){
            callback('Unable to Find Lcoation. Try another Search.',undefined)
        }
        else{
            callback(undefined,{
                longitude:body.features[0].center[0],
                latitude:body.features[0].center[1],
                place_name:body.features[0].place_name
            })
        }

    })
}
    


module.exports = geocode