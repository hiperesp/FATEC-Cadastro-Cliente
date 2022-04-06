(async () => {
    const db = require('./db');

    const resultInsert = await db.insertUsuario({
        nome: 'João',
        senha: '123'
    });
    console.log(resultInsert);

    const resultUpdate = await db.updateUsuario(2, {
        nome: 'Maria',
        senha: '456'
    });
    console.log(resultUpdate);

    //const resultDelete = await db.deleteUsuario(1);
    //console.log(resultDelete);

    const usuarios = await db.selectUsuario();
    console.log(usuarios);

})();