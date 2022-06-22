require('dotenv').config()
require('./config/database')
const Router = require('./routes/routes') 
const express = require('express')
const app = express()
const cors = require('cors')

const PORT = 4000

app.use(cors())
app.use(express.json())
app.use('/api', Router)


app.listen(PORT , () =>  {
    console.log('SERVER READY ON PORT' + PORT)
})