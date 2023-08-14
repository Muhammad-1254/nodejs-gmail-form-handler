const express = require('express');
const appRoute = require('./routes/route')

// localhost port 
const PORT = 5000


const app = express()

app.use(express.json())

// riutes 
app.use('/api',appRoute);

app.listen(PORT,()=>{
console.log("server is started");
})