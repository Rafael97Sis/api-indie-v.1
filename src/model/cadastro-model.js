const { pool } = require('../pgadmin')

selectAll = async () => {
    const res = await pool.query('select * from tb_usuario  ');
    return res.rows;
}

selectOne = async (id) => {
    const res = await pool.query('select * from tb_usuario where id = $1', [id]);
    if (res.rowCount === 0) {
        return;
    }
    return res.rows[0];
}

create = async (usuario) => {
        const findedUsuario = await getOne(usuario.id);
        if(findedUsuario){ 
        throw 'user with id already exist';
        }
        const res = await pool.query
        ('insert into tb_usuario (nome, email, definicao, cnpj, telefone, cep, endereco, nro, bairro, senha, confirmar_senha) values ($1, $2 , $3, $4, $5, $6, $7, $8, $9, $10, $11)',
        [usuario.nome, usuario.email, usuario.definicao, usuario.cnpj, usuario.telefone, usuario.cep,
                usuario.endereco, usuario.nro, usuario.bairro, usuario.senha, usuario.confirmar_senha]);
    }


update = async (usuario) => {
    try {
        const findedUsuario = getOne(usuario.id);
        const res = await pool.query('update td_usuario set nome = $2  where id = $1')
    } catch (e) {
        throw 'usuario with id dont exist  ';
    }


}

deleteOne = (id) => {
    const findedUsuario = getOne(id);
    if (!findedUsuario) {
        throw 'user with id dont exist';
    }
    usuarios_cadastrados = usuarios_cadastrados.filter(elem => elem.id != id);
}

module.exports = {
    selectAll: selectAll,
    selectOne: selectOne,
    create: create,
    update: update,
    deleteOne: deleteOne
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
