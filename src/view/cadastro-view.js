outbound = (usuario) => {
    const representation = {
        Codigo_id_user: usuario.id,
        Nome_usuario: usuario.nome,
        Email_usuario: usuario.email,
        Definicao_user: usuario.definicao,
        cnpj: usuario.cpnj,
        cpf: usuario.cpf,
        Telefone_user: usuario.telefone,
        Cep: usuario.cep,
        Endereco: usuario.endereco,
        Numero_endereco: usuario.nro,
        Bairro: usuario.bairro,
        Senha: usuario.senha,
        Confirmar_senha: usuario.confirmar_senha,
    }
    return representation;
}

inbound = (representation) => {
    const usuarios = {
        id: representation.Codigo_id_user,
        nome: representation.Nome_usuario,
        email: representation.Email_usuario,
        definicao: representation.Definicao_user,
        cnpj: representation.cpnj,
        cpf: representation.cpf,
        telefone: representation.Telefone_user,
        Cep: representation.cep,
        Endereco: representation.endereco,
        Numero_endereco: representation.nro,
        Bairro: representation.bairro,
        senha: representation.senha,
        confirmar_senha: representation.confirmar_senha,
    }
    return usuarios;
}

module.exports = {
    outbound: outbound,
    inbound: inbound,
}