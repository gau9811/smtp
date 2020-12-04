let express = require('express')
let app = express()
let PORT = 5000 || process.env.PORT
let connectDB = require('./db/db')
let Auth = require('./Auth/Auth')
const bodyParser = require('body-parser');
let cors = require('cors')


connectDB()

app.use(cors())
app.use(express.json())
app.use(bodyParser.urlencoded({extended: true }))

app.use('/api',Auth)
app.get('/',(req,res) =>{ 
    console.log(req.admin) 
    res.json('hello world')
})


app.listen(PORT,()=>console.log(`this server is running at ${PORT}`))