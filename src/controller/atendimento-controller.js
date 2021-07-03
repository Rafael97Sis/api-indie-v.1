var express = require('express')
var atendimentoModel = require('../model/atendimento-model')
var SecurityUtils = require('../security/SecurityUtils')

require("dotenv-safe").config();
const jwt = require('jsonwebtoken');


const router = express.Router();

// Retorna todos os usuario Cadastrado 
const getAll = async (req, res, next) => {
    const atendimento = await atendimentoModel.selectAll();
    if (atendimento) {
        res.status(200).json(atendimento);
        return;
    }
    res.status(200).json([]);
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
const createAtendimento = async (req, res) => {
    const {atividade, insumo, id_funcionario, data_agendada, status_atendimento, comentario } = req.body;
    try {
        const atendimentoCreated = await atendimentoModel.insertAtendimento ({atividade, insumo, id_funcionario, data_agendada, status_atendimento, comentario });

        res.status(200).json({ message: 'Atividade Criada ' });
    } catch (e) {
        res.status(500).json({ message:  'Erro' });
    }
}


router
    .get("/atendimento" ,getAll)
    // .get("/atendimento/:id",SecurityUtils.verifyJWT , get)
    .post("/atendimento", createAtendimento)
    // .post("/atendimento/login", login)
    // .put("/atendimento/:id", update)
    // .delete("/atendimento/:id", remove)
    // .delete("/atendimento/email/:email", removemail);

module.exports = router;