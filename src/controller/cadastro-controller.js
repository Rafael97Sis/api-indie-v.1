var express = require('express')
var cadastroModel = require('../model/cadastro-model')
//var cadastroView = require('../view/cadastro-view')

const router = express.Router();

// Retorna todos os usuario Cadastrado 
const getAll = async (req, res, next) => {
   //const cadastros = await cadastroModel.selectAll();
    //if(cadastros) {
       // const representations = cadastros.map(user_cadast => userView.outbound(user_cadast))
       // res.status(200).json(representations);
        res.status(200).json(cadastroModel.findAll());
        return;
   // }
   // res.status(200).json(cadastroModel.findAll());
}

// apresenta dados do usuario  pelo  (ID) solicitado 
const get = async (req, res, next) => {
    const { id } = req.params;
    const usuario_cadastrado = await cadastroModel.getOne(id);
    if (usuario_cadastrado) {
       // const representation = userView.outbound(cadastros);
        res.status(200).json(usuario_cadastrado);
        return;
    }
    res.status(404).json({ message: 'not found' });
}

// Gera usuario 
const create = (req, res) => {
    const {id, email} = req.body;
    try {
    const userioCreated = cadastroModel.create({id:id, email: email});
    res.status(200).json({message: 'user created'});
    } catch (e) {
    res.status(500).json({message: e});
    }
   }

   // update atualiza dados do cadastro
   const update = (req, res) => {
    const {id} = req.params;
    const {email} = req.body;
    try {
    cadastroModel.update({id:id, email: email});
    res.status(200).json({message: 'user updated'});
    } catch (e) {
    res.status(500).json({message: e});
    }
   }

   const remove = (req, res) => {
    const {id} = req.params;
    try {
    cadastroModel.remove(id);
    res.status(200).json({message: 'user removed'});
    } catch (e) {
    res.status(500).json({message: e});
    }
   }
   
router
    .get("/cadastros", getAll)
    .get("/cadastros/:id", get)
    .post("/cadastros", create)
    .put("/cadastros/:id", update)
    .delete("/cadastros/:id", remove);

module.exports = router;