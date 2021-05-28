const express = require('express');
const morgan = require('morgan')
const cors = require('cors')
var cadastroController = require('./controller/cadastro-controller')
//var login = require ('./controller/login-controller');


var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));

app.use(cadastroController);
//app.use(ca)
//app.use(login);


app.listen(3006, () => {
    console.log("Server running!");
})
