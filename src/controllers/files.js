const express = require('express');
const router = express.Router();

// ROTA PARA COLOCAR O PAR JSON E ASSINATURA NA NUVEM
const saveFile = (req, res) => {
    // O arquivo está disponível em req.files
    let jsonArquivo = req.files['jsonArquivo'][0]
    let assinaturaArquivo = req.files['assinaturaArquivo'][0]
  
    // const blobValue = jsonArquivo.buffer;
    // console.log(blobValue)
    // console.log(Buffer.from(blobValue, 'base64').toString('utf-8'));
  
    // // Faça o processamento necessário com os dados
    fetch(`https://nuvem.iti.gov.br/remote.php/webdav/bucket/${req.body['hash']}.json`, {
      method: 'PUT',
      body: JSON.stringify({jsonArquivo, assinaturaArquivo}),
      headers: {
        'Authorization': 'Basic ' + Buffer.from('arthur.trindade:@ITI.art23').toString('base64')
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(`Erro ao enviar o arquivo: ${response.status} ${response.statusText}`);
        }
        res.status(200).send('Arquivo enviado com sucesso!');
      })
      .catch(error => {
        res.status(500).send(`Erro ao enviar o arquivo: ${error.message}`);
      });
} 

// ROTA PARA RESGATAR O PAR JSON E ASSINATURA DA NUVEM A PARTIR DE UMA HASH_PRESC
const resgataNuvem = (req,res) => {
    fileID = req.body['hash']
  
    const requestOptions = {
      method: 'GET',
      headers: {
        'Authorization': 'Basic ' + Buffer.from('arthur.trindade:@ITI.art23').toString('base64')
      }
    };
  
    fetch(`https://nuvem.iti.gov.br/remote.php/webdav/bucket/${fileID}.json`, requestOptions)
      .then(response => response.json())
      .then(data => {
        let jsonArquivo = data.jsonArquivo
        let assinaturaArquivo = data.assinaturaArquivo
  
        var jsonBlob = jsonArquivo.buffer;
        const decodedJson = Buffer.from(jsonBlob, 'base64').toString('utf-8');
        var assinaturaBlob = assinaturaArquivo.buffer;
        const decodedAssinatura = Buffer.from(assinaturaBlob, 'base64').toString('utf-8');
  
        jsonBlob = new Blob([decodedJson], { type: 'application/json' });
        assinaturaBlob = new Blob([decodedAssinatura], { type: 'application/pkcs7-signature' })
  
        res.json({json: decodedJson, assinatura: decodedAssinatura});
      })
      .catch(error => {
        console.error('Ocorreu um erro ao acessar o blob:', error);
      })
}
  
module.exports = {saveFile, resgataNuvem};
