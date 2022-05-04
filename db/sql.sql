CREATE TABLE `usuario` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `nome` varchar(255) NOT NULL,
  `senha` varchar(255) NOT NULL,
  PRIMARY KEY (`id`)
);

INSERT INTO usuario(nome, senha) VALUES ('admin', 'admin');
INSERT INTO usuario(nome, senha) VALUES ('user', 'user');

SELECT * FROM usuario;

UPDATE usuario SET nome = 'admin2' WHERE id = 1;
UPDATE usuario SET nome = 'user2' WHERE id = 2;

