require('dotenv').config()

const express = require('express')
const artRoutes = require('./routes/art')
const mongoose = require('mongoose')

//express app
const app = express()

//middleware
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/arts', artRoutes)

//connect mongodb
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        //listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to mongodb - listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })

