//arquivo java script que ira servir as requisões do usuario usando protocolo http

const express = require('express');
const app = express();

//ira disponibiliza ao servidor todos icone / menus que são utilizados de forma estatica
app.use(express.static(__dirname + '/dist/algamoney-ui'));

//ira atender a qualquer requisicao solicitada 
app.get('/*' , function(req, res) {

    //caminho que ira identificar e responder a requisicao
    res.sendFile(__dirname + '/dist/algamoney-ui/index.html');
});

//porta de acesso ao acesso da aplicacao
app.listen(process.env.PORT || 4200);