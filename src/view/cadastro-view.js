outbound = (cadastro) => {
    const representation = {
        identifier: cadastro.id,
        personalEmail: cadastro.email,
    }
    return representation;
}

inbound = (representation) => {
    const cadastro = {
        id: representation.identifier,
        email: representation.personalEmail,
    }
    return cadastro;
}

module.exports = {
    outbound: outbound,
    inbound: inbound,
}