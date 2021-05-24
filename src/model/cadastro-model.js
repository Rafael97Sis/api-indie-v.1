usuarios_cadastrados = [
    {
        id: 1,
        email: "malopes21@gmail.com"
    },
    {
        id: 2,
        email: "fulano@gmail.com"
    },
    {
        id: 3,
        email: "sicrano@gmail.com"
    }
]
findAll = () => {
    return usuarios_cadastrados.filter(usuario => usuario.id = usuario.id);
}

getOne = (id) => {
    const usuarioFinded = usuarios_cadastrados.find(usuario => usuario.id == id);
    return usuarioFinded;
}

create = (usuario) => {
    const findedUsuario = getOne(usuario.id);
    if (findedUsuario) {
        throw 'usuario with id already exist';
    }
    usuarios_cadastrados.push(usuario);
}

update = (usuario) => {
    const findedUsuario = getOne(usuario.id);
    if (!findedUsuario) {
        throw 'usuario with id dont exist';
    }
    findedUsuario.email = usuario.email;
}

remove = (id) => {
    const findedUsuario = getOne(id);
    if (!findedUsuario) {
        throw 'user with id dont exist';
    }
    usuarios_cadastrados = usuarios_cadastrados.filter(elem => elem.id != id);
}
module.exports = {
    findAll: findAll,
    getOne: getOne,
    create: create,
    update: update,
    remove: remove,
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
