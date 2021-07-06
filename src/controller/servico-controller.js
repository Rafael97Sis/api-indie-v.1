var express = require('express')
var SecurityUtils = require('../security/SecurityUtils')
var servicoModel = require('../model/servico-model')

require("dotenv-safe").config();
const jwt = require('jsonwebtoken');

const router = express.Router();

// Retorna todos os usuario Cadastrado 
const getAll = async (req, res, next) => {
    const servico = await servicoModel.solicita_servico();
    if (servico) {
        res.status(200).json(servico);
        return;
    }
    res.status(200).json([]);
}

// apresenta dados do usuario  por  (nome) solicitado 
const getServico = async (req, res, next) => {
    const { nome } = req.params;
    const servico = await servicoModel.buscaServico(nome);
    if (servico) {
        res.status(200).json(servico);
        return;
    }
    res.status(404).json({ message: 'not found & servico nao Existe ' });
}

// apresenta dados do usuario  pelo  (ID) solicitado 
const get = async (req, res, next) => {
    const { nome } = req.params;
    const servico = await servicoModel.selectOne(nome);
    if (servico) {
        res.status(200).json(servico);
        return;
    }
    res.status(404).json({ message: 'not found & servico nao Existe ' });
}

// Cria servico 
const createServico = async (req, res) => {
    const {nome, insumo } = req.body;
    try {
        const servicoCreated = await servicoModel.insert ({nome, insumo });

        res.status(200).json({ message: 'Servico created - Gerado' });
    } catch (e) {
        res.status(500).json({ message:  'Erro'||  e });
    }
}

const deleteServico = async ( req, res) => {

}

router
    
    .get("/servico/2", get)
    .post("/servico", createServico)
    .get("/servico", getAll)
    .get("/servico/servico/:nome", getServico)
    .delete("/servico", deleteServico)
    
    
module.exports = router;