const express = require('express');
const morgan = require('morgan')

var cadastroController = require ('./controller/cadastro-controller');
//var login = require ('./controller/login-controller');


var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(morgan('dev'));

app.use(cadastroController);
//app.use(login);


app.listen(3005, () => {
    console.log("Server running!");
})
