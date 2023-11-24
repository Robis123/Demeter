const express = require('express');
const multer = require('multer');
const route = express.Router();

const app = express();
app.use(express.json());

//Rotas

const upload = multer(); // Configuração básica para o multer

// Rota para processar formulário form-data
route.post('/teste', upload.none(), (req, res) => {
    // req.body agora contém os dados do formulário
    const nome = req.body.nome;
    console.log(nome);
    res.send(nome);
});

// route.get('/getLogin', getLogin);

// route.get('/logout', getLogout);

// route.post('/save', upload.fields([
//     { name: 'jsonArquivo' },
//     { name: 'assinaturaArquivo' }
//   ]),
//    saveFile);

// route.post('/geturl',upload.single('hash'), resgataNuvem);

module.exports = route;
