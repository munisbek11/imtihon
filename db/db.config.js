const mongoose = require('mongoose')
const Term = require('../models/Term')
require('dotenv').config();


const connectDB = async () => {
	try{
		await mongoose.connect("mongodb+srv://shomurodovmunisbek12102004:2YMWqCT59ICZCUO3@cluster0.9dutp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0").then(async () => {
		console.log('✅Connected to MongoDB')
		})
	} catch(error){
		console.log(error.message)
	}
} 

module.exports = connectDB