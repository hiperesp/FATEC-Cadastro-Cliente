const LocalStrategy = require('passport-local').Strategy;
const seguranca = require('./seguranca');
const usuarioBanco = require('../repositories/usuarioDB');

module.exports = function(passport) {
    passport.serializeUser(function(usuario, done) {
        done(null, usuario.id);
    });
    passport.deserializeUser(async function(id, done) {
        try {
            const usuario = await usuarioBanco.getUsuarioId(id);
            done(null, usuario);
        } catch (error) {
            done(error, null);
        }
    });
    passport.use(new LocalStrategy({
        usernameField: 'nome',
        passwordField: 'senha',
    }));
    
    return (async function(nome, senha, done){
        try {
            const usuario = await usuarioBanco.login(nome, senha);
            if(usuario) {
                return done(null, usuario);
            } else {
                return done(null, false);
            }
        } catch (error) {
            return done(error, false);
        }
    });
};