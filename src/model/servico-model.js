const { pool } = require('../pgadmin')

// retorna Dados 
solicita_servico = async () => {
    const res = await pool.query('select * from tb_servico  ');
    return res.rows;
}

// valida servico
validaServico = async ( nome ) => {
    const res = await pool.query('select * from tb_servico where nome=$1 ', [nome]);
    if(res.rowCount === 0) {
        return;
    }
    return res.rows[0];
}

// cadastra servico
insert = async (servico) => {
    const findedServico = await validaServico(servico.nome);
    if(findedServico){ 
    throw 'user with id already exist - Servico ja consta ';
   }
   const res = await pool.query('insert into tb_servico (nome, insumo ) values ($1,$2);', [ servico.nome, servico.insumo ]);
}

// 

module.exports = {
    solicita_servico: solicita_servico,
    validaServico: validaServico,
    insert: insert
}