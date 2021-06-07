var express = require('express')
var cadastroModel = require('../model/cadastro-model')

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
   // const { id, nome, email, definicao, cnpj, cpf, telefone_user, cep, endereco, nro, bairro, senha, confirmar_senha } = req.body;
   const {id, nome} = req.body;
    try {
        const cadastradoCreated = await cadastroModel.create ({ id, nome });
                                                                // email,
                                                                // definicao,
                                                                // cnpj,
                                                                // cpf,
                                                                // telefone_user,
                                                                // cep,
                                                                // endereco,
                                                                // nro,
                                                                // bairro,
                                                                // senha,
                                                                // confirmar_senha });

        res.status(200).json({ message: 'usuario  created' });
    } catch (e) {
        res.status(500).json({ message:  e });
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

router
    .get("/cadastros", getAll)
    .get("/cadastros/:id", get)
    .post("/cadastra", create)
    .put("/cadastros/:id", update)
    .delete("/cadastros/:id", remove);

module.exports = router;