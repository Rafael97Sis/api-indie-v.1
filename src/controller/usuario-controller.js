var express = require('express')
var cadastroModel = require('../model/usuario-model')
var SecurityUtils = require('../security/SecurityUtils')

require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

const router = express.Router();

// Retorna todos os usuario Cadastrado 
const getAll = async (req, res, next) => {
    const usuarios = await cadastroModel.selectAll();
    if (usuarios) {
        res.status(200).json(usuarios);
        return;
    }
    res.status(200).json([]);
}


// apresenta dados do usuario  por  (nome) solicitado 
const getUsuario = async (req, res, next) => {
    const { nome } = req.params;
    const servico = await servicoModel.buscaServico(nome);
    if (servico) {
        res.status(200).json(servico);
        return;
    }
    res.status(404).json({ message: 'not found & servico nao Existe ' });
}

// apresenta dados do usuario  pelo  (ID) solicitado 
const getProfissional = async (req, res, next) => {
    const { definicao } = req.params;
    const usuarios = await cadastroModel.buscaProfissional (definicao);
    if (usuarios) {
        res.status(200).json(usuarios);
        return;
    }
    res.status(404).json({ message: 'not found & id nao Existe ' });
}

// apresenta dados do usuario  pelo  (ID) solicitado 
const get = async (req, res, next) => {
    const { id } = req.params;
    const usuarios = await cadastroModel.selectOne(id);
    if (usuarios) {
        res.status(200).json(usuarios);
        return;
    }
    res.status(404).json({ message: 'not found & id nao Existe ' });
}

// Gera usuario 
const create = async (req, res) => {
    const {nome, email, definicao, cpf_ou_cnpj, telefone, cep, endereco, nro, bairro, senha, area_de_atuacao, especialidade } = req.body;
   //const {nome,email} = req.body;
    try {
        const cadastradoCreated = await cadastroModel.insert ({nome, email, definicao, cpf_ou_cnpj, telefone, cep, endereco, nro, bairro, senha, area_de_atuacao, especialidade });

        res.status(200).json({ message: 'usuario  created - Gerado' || cadastradoCreated });
    } catch (e) {
        res.status(500).json({ message:  'Erro - Usuario Já Consta'||  e });
    }
}

//    // update atualiza dados do cadastro
const update = (req, res) => {
    const { id } = req.params;
    const { nome } = req.params;
    const { email } = req.body;
    try {
        const usuarios = cadastroView.inbound({
            id, nome, email, definicao,
            cnpj, cpf, telefone, cep, endereco, 
            nro, bairro, senha, confirmar_senha
        })

        cadastroModel.update(usuarios);
        res.status(200).json({ message: 'user updated' });
    } catch (e) {
        res.status(500).json({ message: e });
    }
}

const remove = (req, res) => {
    const { id } = req.params;
    try {
        cadastroModel.deleteOne(id);
        res.status(200).json({ message: 'user removed' });
    } catch (e) {
        res.status(500).json({ message: e });
    }
}

const removemail = (req, res) => {
    const { email } = req.params;
    try {
        cadastroModel.deleteOne(email);
        res.status(200).json({ message: 'user removed' });
    } catch (e) {
        res.status(500).json({ message: e });
    }
}

// realiza login e validacao do usuario 
const login = async (req, res, next ) => {
    const {email, senha } = req.body;
    const user = await cadastroModel.validaEmail(email);
        if (user && user.senha === senha){
            //aqui JWT
            const token = jwt.sign({ id: user.id }, process.env.SECRET, {
                expiresIn: 3000 // expires in 50 min
            });
            res.status(200).json({message: "ok" , token:token, definicao:user.definicao });
            return;
        }
        res.status(401).json({message: 'Nao autorizado 401 '})
}

router
    .get("/usuario/2" ,getAll)
    .get("/usuario/:id",SecurityUtils.verifyJWT , get)
    .post("/usuario", create)
    // .post("/usuario/login", login)
    // .put("/usuario/:id", update)
    // .delete("/usuario/:id", remove)
    // .delete("/usuario/email/:email", removemail)
    // .get("/usuario/profissional/:definicao", getProfissional)
    

module.exports = router;