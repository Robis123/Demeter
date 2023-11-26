const express = require('express');
const multer = require('multer');
const route = express.Router();
const { htmlPDF } = require('../template/gerarPDF.js');

const app = express();
app.use(express.json());
const upload = multer(); // Configuração básica para o multer

// Rota para processar formulário form-data
route.post('/teste', upload.none(), async (req, res) => {
    // req.body agora contém os dados do formulário
    // const requisição = req.body;
    // console.log(nome);
    htmlPDF(req,res)
});

module.exports = route;