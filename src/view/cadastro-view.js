outbound = (usuario) => {
    const representation = {
        identifier: usuario.id,
        personalEmail: usuario.email,
    }
    return representation;
}

inbound = (representation) => {
    const usuario = {
        id: representation.identifier,
        email: representation.personalEmail,
    }
    return usuario;
}

module.exports = {
    outbound: outbound,
    inbound: inbound,
}