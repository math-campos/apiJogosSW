//Conteúdo o arquivo api.js
var express = require('express');
var router = express.Router();

var jwt = require('jsonwebtoken');
const SECRET = 'senha';

/*criando alguns objetos para manipular no DAO*/
var Jogo = require('../model/Jogo');
var JogoDAO = require('../model/JogoDAO');

var Jogo1 = new Jogo(0, 'Tomb Raider', 2015);
var Jogo2 = new Jogo(1, 'Assassins Creed', 2010);
var Jogo3 = new Jogo(2, 'Call of Duty', 2018);
var Jogo4 = new Jogo(3, 'State of Decay', 2012);

let DAO = new JogoDAO();

DAO.add(Jogo1);
DAO.add(Jogo2);
DAO.add(Jogo3);
DAO.add(Jogo4);

router.post('/login', function (req, res) {
    if (req.body.user === 'matheus' && req.body.pass === 'senha123') {
        var payload = {
            user: req.body.user,
            role: 'admin',
            id: 1
        };

        var token = jwt.sign(payload, SECRET, { expiresIn: '5m' });

        res.status(200).send({ token: token });
    } else
        res.status(401).send({ user: 'user', pass: 'pass' });
});

/* GET retornar lista de todos os jogos. */
router.get('/Jogos', function (req, res, next) {
    res.send(DAO.all());
});

/* POST adicionar jogo na lista de jogos. */
router.post('/Jogos', verificaToken, function (req, res, next) {
    var Jogo = req.body;
    if (Jogo === null || Jogo === 'undefined') {
        res.send(400, { erro: 'sem parâmetro de entrada' });
    } else {
        Jogo.id = DAO.getNextID();
        DAO.add(Jogo);
        res.send(201, Jogo);
    }
});

function verificaToken(req, res, next) {
    var token = req.headers.authorization;
    if (!token)
        return res.status(401).send({ message: 'No token provided.' });

    jwt.verify(token, SECRET, function (err, payload) {
        if (err)
            return res.status(403).send({ auth: false, message: 'Failed to authenticate token.' });

        req.userData = payload;
        next();
    });
};

module.exports = router;