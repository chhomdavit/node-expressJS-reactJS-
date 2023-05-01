const express = require('express')
const app = express()
const cors = require("cors");
const bodyParser = require('body-parser')



app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:false}));
app.use(cors({origin : "*"}));



app.get('/', (req, res) => {
  res.send('Hello express js')
})

require("./src/routes/user.route")(app)

const port = 8080
app.listen(port, () => {
  console.log('http://localhost:'+port)
})