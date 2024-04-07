const mongoose = require('mongoose')
const cors = require('cors')
const express = require('express')
const app = express()

const fileroute = require('./routes/image')
const ErrorMiddleware = require('./middlewares/errorMiddleware')



const connect = async () => {
    try {
        mongoose.connect('mongodb://localhost/FileSharing')
        console.log('Connected to MongoDB...')
    }
    catch (error) {
        throw error
    }
}


mongoose.connection.on('disconnected', () => {
    console.log('MongoDB Disconnected..')
});



app.use(cors())

app.use(express.json())

app.use("/" , fileroute)

app.use(ErrorMiddleware)




const port = process.env.PORT || 8000;
app.listen(port,
    () => {
        connect()
        console.log(`Listening on port ${port}...`)
    }
);