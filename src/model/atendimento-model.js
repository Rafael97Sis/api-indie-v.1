const { pool } = require('../pgadmin')


// Retorna os dados do banco da Tabela - TB_USUARIO
selectAll = async () => {
    const res = await pool.query('select * from tb_atendimento  ');
    return res.rows;
}

// valida Servico 
verificaServico = async ( nome ) => {
    const res = await pool.query('select * from tb_servico where nome=$1 ', [nome]);
    if(res.rowCount === 0) {
        return;
    }
    return res.rows[0];

    
}
// cadastra usuario
insertAtendimento = async (atendimento) => {
   const findedAtendimento = await verificaServico(atendimento.atividade);
    if(findedAtendimento){ 
    throw 'user with id already exist - Usuario Já Consta ';
   }
   const res = await pool.query('insert into tb_atendimento (atividade, insumo, id_funcionario, data_agendada, status_atendimento, comentario ) values ($1,$2,$3,$4,$5,$6);',
    [atendimento.atividade, atendimento.insumo, atendimento.id_funcionario, atendimento.data_agendada, atendimento.status_atendimento, atendimento.comentario ]);

}

// valida atendimento 
selectAtendimento= async (id) => {
    const res = await pool.query('select * from tb_atendimento where id =$1', [id]);
    if(res.rowCount === 0) {
        return;
    }
    return res.rows[0];
}


updateAtendimento = async (atendimento) => {
    const findedUsuario = selectAtendimento(atendimento.id);

    if (!findedUsuario) {
        throw 'cat with nome dont exist';
    }
    findedUsuario.id = atendimento.id;
    const res = await pool.query('update tb_atendimento set atividade = $1, insumo = $2, id_funcionario = $3 , data_agendada = $4, status_atendimento = $5 , comentario = $6 where id = $7 ',
     [atendimento.atividade, atendimento.insumo, atendimento.id_funcionario, atendimento.data_agendada, atendimento.status_atendimento, atendimento.comentario, atendimento.id ] )
}



module.exports = {
    insertAtendimento: insertAtendimento,
    selectAll:selectAll,
    verificaServico: verificaServico,
    updateAtendimento:updateAtendimento
    // update: update,
    
}