const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const app = express()
const port = process.env.PORT ││ 3000

// Define path for Express config
const publicDirectoryPath = path.join(__dirname,'../public')
const viewsPath = path.join(__dirname,'../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

//Setup handlebar engine and views location
app.set('view engine','hbs')
app.set('views',viewsPath)
hbs.registerPartials(partialsPath)

//Setup static directory to serve
app.use(express.static(publicDirectoryPath))


app.get('',(req,res)=>{
    res.render('index',{
        title : 'Weather',
        name : 'Indra Permana'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title : 'About Me',
        name : 'Indra Permana'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        helpText : 'This is help page',
        name : 'Indra Permana'
    })
})
app.get('/weather',(req,res)=>{
   if(!req.query.address){
       return res.send({
          error :  'Please provide an address'
       })
   }else{
       geocode(req.query.address,(error,data)=>{
           if(error){
               return res.send({error})
           }
           forecast(data.latitude,data.longitude,(error,dataForecast)=>{
               if(error){
                   return res.send({error})
               }else{
                   res.send({
                       location : data.location,
                       forecast : dataForecast,
                       address : req.query.address
                   })
               }
           })
       })
   }
})

app.get('/help/*',(req,res)=>{
    res.render('404',{
        title : '404',
        name : 'Indra Permana',
        errorMessage : 'help article not found'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title : '404 page',
        name : 'Indra Permana',
        errorMessage : 'page not found'
    })
})

app.listen(port,()=>{
    console.log('Server is up on port ' + port)
})