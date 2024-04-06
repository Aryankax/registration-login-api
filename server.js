require('dotenv').config()
const express = require('express')
const app = express();
const mongoose = require('mongoose');
const registrationRoutes = require('../registration-login-api/routes/userRoutes');

app.use((req,res, next)=>{
    console.log(req.path, req.method);
    next();
})

app.use(express.json());

//routes
app.use('/', registrationRoutes);

mongoose.connect(process.env.MONGO_URL).then(()=>{
    //listen for requests
    app.listen(5000, ()=>{
        console.log(`API started on port ${5000}`);
    })
}).catch((error)=> {
    console.log(error);
})



