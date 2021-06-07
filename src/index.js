const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');


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

app.use((req, res, next) => {
    const erro =  new Error ("Não Encontrado");
    erro.status = 404;
    next(erro);
});


app.listen(3006, () => {
    console.log("Server running!");
})
