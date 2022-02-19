const express = require('express');
const cors = require('cors');
const app = express();

var corsOption = {
    origin: 'http://localhost:2000'
}

app.use(cors(corsOption));
app.use(express.json());
app.use(express.urlencoded({extended: true}))

app.get('/', (req, res)=>{
    res.json({message: 'I am Doreen, a junior software programmer'});
})

require(app);

const port = process.env.port || 2000


app.listen(port, ()=>console.log(`The server is running on port ${port}`))
