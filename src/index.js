const express=require('express');
const morgan = require("morgan")
const routes=require('./routes.js');
const cors=require('cors');

const app=express();

app.use(morgan("tiny"))

app.use('/',express.static('apidoc'))

app.use((req, res, next) => {
	//Qual site tem permissão de realizar a conexão, no exemplo abaixo está o "*" indicando que qualquer site pode fazer a conexão
    res.header("Access-Control-Allow-Origin", "*");
	//Quais são os métodos que a conexão pode realizar na API
    res.header("Access-Control-Allow-Methods", 'GET,PUT,POST,DELETE');
    app.use(cors());
    next();
});


app.use(cors());

app.use(express.json());
app.use(routes);
const port = process.env.PORT || 3333;
app.listen(port);

