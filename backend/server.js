const express= require('express')
const colors=require('colors')
const dotenv= require('dotenv').config()
var cors = require('cors')
const port =process.env.PORT || 5000
const connectDB=require('./config/db')
connectDB()
const app=express()
const bodyparser = require("body-parser");
app.use(bodyparser.urlencoded({ extended: false }));

app.use(cors())
app.use(bodyparser.json());
app.use(express.json())
app.use('/api/users', require('./routes/userRoutes'))
app.listen(port, ()=>console.log(`server started on port ${port}`))
