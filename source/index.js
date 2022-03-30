const express = require("express");

const app = express();

app.get("", function(req, res) {
  res.send("Bem-Vindo ao meu app");
});

app.get("/contato", function(req, res) {
  res.send("Contato");
});

app.get("/produto", function(req, res) {
  res.send("Produto");
});

app.get("/dados/:nome/:cargo", function(req, res) {
  res.send("Olá sr(a)"+req.params.nome+", seu cargo é "+req.params.cargo);
});

app.listen(8081, function() {
  console.log("Servidor funcionando");
});
