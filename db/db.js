async function connect() {
    if(global.connection && global.connection.state !== 'disconnected')
        return global.connection;

    const mysql = require('mysql2/promise');
    global.connection = await mysql.createConnection({
        host: 'localhost',
        user: 'root',
        password: '',
        database: 'test'
    });
    console.log("Conectou no MySQL!");

    return global.connection;
}

async function selectUsuario() {
    const conn = await connect();
    const [rows] = await conn.query('SELECT * FROM usuario');
    return rows;
}

async function insertUsuario(usuario) {
    const conn = await connect();
    const sql = "INSERT INTO usuario (nome, senha) VALUES (?, ?)";
    const values = [ usuario.nome, usuario.senha ];
    return await conn.query(sql, values);
}

async function updateUsuario(id, usuario) {
    const conn = await connect();
    const sql = "UPDATE usuario SET nome = ?, senha = ? WHERE id = ?";
    const values = [ usuario.nome, usuario.senha, id ];
    return await conn.query(sql, values);
}

async function deleteUsuario(id) {
    const conn = await connect();
    const sql = "DELETE FROM usuario WHERE id = ?";
    const values = [ id ];
    return await conn.query(sql, values);
}

module.exports = {
    selectUsuario, insertUsuario, updateUsuario, deleteUsuario
}