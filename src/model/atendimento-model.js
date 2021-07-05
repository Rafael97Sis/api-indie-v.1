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

// update = async (usuario) => {
//     const findedUsuario = selectByNome(usuario.id, usuario.email);

//     if (!findedUsuario) {
//         throw 'cat with nome dont exist';
//     }
//     findedUsuario.id = usuario.id;
//     const res = await pool.query('update td_usuario set email = $2  where id = $1' , [usuario.id, usuario.email] )
//     }

module.exports = {
    insertAtendimento: insertAtendimento,
    selectAll:selectAll,
    verificaServico: verificaServico,
    // update: update,
    
}