const express = require('express');
const route = express.Router();

const app = express();
app.use(express.json());

//Rotas

route.get('/teste',(req, res) => res.send("olaaa"));

// route.get('/getLogin', getLogin);

// route.get('/logout', getLogout);

// route.post('/save', upload.fields([
//     { name: 'jsonArquivo' },
//     { name: 'assinaturaArquivo' }
//   ]),
//    saveFile);

// route.post('/geturl',upload.single('hash'), resgataNuvem);

module.exports = route;
