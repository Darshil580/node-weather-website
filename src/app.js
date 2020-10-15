const path = require('path')
const express = require('express') 
const hbs = require('hbs')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')

const app = express()

//Define paths for express config
const publicDirectorypath = path.join(__dirname,'../public/')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname,'../templates/partials')

//Setup handlebas engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup Static Directory to serve
app.use(express.static(publicDirectorypath))

app.get('',(req,res)=>{
    res.render('index',{
        title:"Weather App",
        name: 'Darshil Patel'
    })
})

app.get('/about', (req,res) => {
    res.render('about',{
        title:'About Us Page',
        name:'Darshil Patel'
    })
})

app.get('/help', (req ,res ) => {
    res.render('help',{
        message:"Help Needed.",
        name:"Darshil"
    })

})

app.get('/weather',(req,res) => {
    if(!req.query.address){
        return res.send({
            errorMessage:"Please provide the address."
        })
    }
    const address = req.query.address
    geocode(address,(geocode_error,{latitude,longitude,place_name} = {}) => {
        if(geocode_error){
            return res.send({
                errorMessage:geocode_error
            })
        }
    
        forecast(latitude,longitude,(error,forecastData) => {
            if(error){
                return res.send({
                    errorMessage:error
                })
            }

            res.send({
                location:place_name,
                weather: forecastData,
                address

            })

        })
        
        
    })
   

})

app.get('/products',(req,res)=>{

    if(!req.query.search){
       return res.send({
            error:'You must provide search term'
        })
    }
   // console.log(req.query)
    res.send({
        product:[]

    })
})



app.get('/help/*', (req,res) => {
    res.render('404',{
        errorMessage:'Help articale not found.',title:"404",name:"Darshil"
    })
})
app.get('*', (req,res) => {
    res.render('404',{
        errorMessage:'Page Not Found',title:"404",name:"Darshil"
    })
})


app.listen(3000, () => {
    console.log('Server is up on port 3000.')
})