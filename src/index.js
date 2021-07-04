const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');


var usuarioController = require('./controller/usuario-controller')
var atendimentoController = require('./controller/atendimento-controller');
const servicoController = require('./controller/servico-controller');
//var login = require ('./controller/login-controller');


var app = express();
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(cors());
app.use(morgan('dev'));

app.use(usuarioController);
app.use(atendimentoController);
app.use(servicoController);


app.use((req, res, next) => {
    const erro =  new Error ("Não Encontrado");
    erro.status = 404;
    next(erro);
});


app.listen(3006, () => {
    console.log("Server running!");
})
