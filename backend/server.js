const express= require('express')
const colors=require('colors')
const dotenv= require('dotenv').config()
const port =process.env.PORT || 5000
const connectDB=require('./config/db')

connectDB()
const app=express()
app.listen(port, ()=>console.log(`server started on port ${port}`))
