const { pool } = require('../pgadmin')

// Retorna os dados do banco da Tabela - TB_USUARIO
selectAll = async () => {
    const res = await pool.query('select * from tb_usuario  ');
    return res.rows;
}

// RETORNA os dados do ID Solicitado.
selectOne = async (id) => {
    const res = await pool.query('select * from tb_usuario where id = $1', [id]);
    if (res.rowCount === 0) {
        return;
    }
    return res.rows[0];
}

// valida servico
buscaProfissional = async (definicao ) => {
    const res = await pool.query('select nome, definicao, area_de_atuacao, especialidade from tb_usuario where definicao= $1', [definicao]);

    return res.rows;
}


// valida nome 
selectByNome = async (nome) => {
    const res = await pool.query('select * from categoria where nome = $1', [nome]);
    if(res.rowCount === 0) {
        return;
    }
    return res.rows[0];
}


validaEmail = async ( email ) => {
    const res = await pool.query('select * from tb_usuario where email=$1 ', [email]);
    if(res.rowCount === 0) {
        return;
    }
    return res.rows[0];
}

// cadastra usuario
insert = async (usuario) => {
            //console.log(usuario);
         const findedUsuario = await validaEmail(usuario.email);
         if(findedUsuario){ 
         throw 'user with id already exist - Email Já Consta ';
        }
        const res = await pool.query('insert into tb_usuario (nome, email, definicao, cpf_ou_cnpj, telefone, cep, endereco, nro, bairro, senha, area_de_atuacao, especialidade ) values ($1,$2,$3,$4,$5,$6,$7,$8,$9,$10,$11,$12);', [usuario.nome, usuario.email, usuario.definicao, usuario.cpf_ou_cnpj, usuario.telefone, usuario.cep, usuario.endereco, usuario.nro, usuario.bairro, usuario.senha, usuario.area_de_atuacao, usuario.especialidade ]);
     //const res = await pool.query('insert into tb_usuario (nome, email, definicao, cnpj, cpf, telefone, cep, endereco, nro, bairro, senha, confirmar_senha) values ($1, $2 , $3, $4, $5, $6, $7, $8, $9, $10, $11)',
    // [usuario.nome, usuario.email, usuario.definicao, usuario.cnpj, usuario.telefone, usuario.cep, usuario.endereco, usuario.nro, usuario.bairro, usuario.senha, usuario.confirmar_senha]);
    }

    


update = async (usuario) => {
    const findedUsuario = selectByNome(usuario.id, usuario.email);

    if (!findedUsuario) {
        throw 'cat with nome dont exist';
    }
    findedUsuario.id = usuario.id;
    const res = await pool.query('update td_usuario set email = $2  where id = $1' , [usuario.id, usuario.email] )
    }

//Deleta Usuario Selecionado 
deleteOne = async (id) => {
    const findedUsuario = selectOne(id);
    if (!findedUsuario) {
        throw 'user with id dont exist';
    }
    //usuarios_cadastrados = usuarios_cadastrados.filter(elem => elem.id != id);
    const res = await pool.query('delete from tb_usuario where id = $1', [id]);
}



//Deleta Usuario Selecionado 
deleteUsuarioEmail = async (email) => {
    const findedUsuario = selectEmail(email);
    if (!findedUsuario) {
        throw 'user with id dont exist';
    }
    const res = await pool.query('delete from tb_usuario where email = $1', [email]);
}

module.exports = {
    selectAll: selectAll,
    selectOne: selectOne,
    validaEmail: validaEmail,
    insert: insert,
    update: update,
    deleteOne: deleteOne,
    deleteUsuarioEmail: deleteUsuarioEmail,
    buscaProfissional: buscaProfissional 
}


// const {pool} = require('../config')

// selectAll = async () => {
//     const res = await pool.query('select * from teste');
//     return res.rows;
// }

// selectOne = async (id) => {
//     const res = await pool.query('select * from teste where id = $1', [id]);
//     if(res.rowCount === 0) {
//         return;
//     }
//     return res.rows[0];
// }

// insert = async (user) => {
//     const findedUser = await getOne(user.id);
//     if(findedUser) {
//         throw 'user with id already exist';
//     }
//     const res = await pool.query('insert into teste (id, nome) values ($1, $2)', [user.id, user.nome]);
// }

// update = (user) => {
//     const findedUser = getOne(user.id);
//     if (!findedUser) {
//         throw 'user with id dont exist';
//     }
//     findedUser.email = user.email;
// }

// deleteOne = (id) => {
//     const findedUser = getOne(id);
//     if (!findedUser) {
//         throw 'user with id dont exist';
//     } 
//     users = users.filter(elem => elem.id != id);
// }

// module.exports = {
//     selectAll: selectAll,
//     selectOne: selectOne,
//     insert: insert,
//     update: update,
//     deleteOne: deleteOne
// }
