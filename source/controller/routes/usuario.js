const seguranca = require('../../model/components/seguranca')
const usuarioBanco = require('../../model/repositories/usuarioDB');

module.exports = function (app){

    app.get("/", function(req, resp){
        resp.send("Bem-vindo ao meu app");
    })

    app.get('/usuario/Cadastro', function (req, res){
        if(req.query.fail) 
            res.render('usuario/CadastroUsuario', {mensagem: 'Cadastro'});
        else
            res.render('usuario/CadastroUsuario', {mensagem: null});

    })
    
    app.post('/cadastro/usuario/edit/salvar', (req, res) => {
        var usuario = {
            nome: req.body.nome,
            senha: req.body.senha,
            id: req.body.id
        };
        try {
            usuarioBanco.updateUsuario(usuario);
            res.render('usuario/Sucesso', {mensagem: 'alterado'});
        } catch (error){
            res.render('usuario/EditUsuario', {title: 'Edicção Cadastro', mensagem: "Erro no cadastro"})
        }
    });

    app.post('/cadastro/usuario/salvar', seguranca.autenticar, (req, res) => {
        var usuario = {
            nome: req.body.nome,
            senha: seguranca.ocultarSenha(req.body.senha)
        };
        try {
            usuarioBanco.insertUsuario(usuario);
            res.render('usuario/Sucesso', {mensagem: 'cadastrado'});
        } catch (error){
            res.render('usuario/CadastroUsuario', {title: 'Cadastro', mensagem: "Erro no cadastro"})
        }
    });

    app.get('/lista/usuario', seguranca.autenticar, async (req, res, next) => {
        try {
            const usuarios = await usuarioBanco.getUsuarios();
            res.render('usuario/Lista', {usuarios: usuarios});
        } catch (error){
            next(error);
        }
    });
    app.get('/delete/usuario/:id', seguranca.autenticar, async (req, res, next) => {
        try {
            await usuarioBanco.deleteUsuario(req.params.id);
            const usuarios = await usuarioBanco.getUsuarios();
            res.render('usuario/Lista', {mensagem: 'Usuário excluído com sucesso.', usuarios: usuarios});
        } catch (error){
            next(error);
        }
    });
    app.get('/edit/usuario/:id', seguranca.autenticar, async (req, res, next) => {
        try {
            const usuario = await usuarioBanco.getUsuarioId(req.params.id);
            res.render('usuario/EditUsuario', {mensagem: '', usuario: usuario});
        } catch (error){
            next(error);
        }
    });
    app.get('/login', (req, res) => {
        if(req.query.fail)
            res.render('usuario/Login', {mensagemLogin: 'Login'});
        else
            res.render('usuario/Login', {mensagemLogin: null});
    });

}