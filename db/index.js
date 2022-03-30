const db = require('./db');
const usuarios = await db.selectUsuario();
console.log(usuarios);

const resultInsert = await db.insertUsuario({
    nome: 'João',
    senha: '123'
});
console.log(resultInsert);

const resultUpdate = await db.updateUsuario(1, {
    nome: 'Maria',
    senha: '456'
});
console.log(resultUpdate);

const resultDelete = await db.deleteUsuario(1);
console.log(resultDelete);
