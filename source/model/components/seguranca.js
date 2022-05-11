const sha1 = require('sha1');

function autenticar(request, response, next) {
    if (request.isAuthenticated()) {
        return next();
    }
    response.redirect('/login');
}

function ocultarSenha(senha){
    return sha1(senha);
}

module.exports = { ocultarSenha, autenticar};