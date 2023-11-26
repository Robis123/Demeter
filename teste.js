const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes  } = require("firebase/storage");
const fs = require('fs');
const pathTotal = require('./template/gerarPDF');

function firebasePost(file,req,res,resposta){

const firebaseConfig = {
  apiKey: "AIzaSyBuTz51FrhMgRnQqQ-XK94vBqB9jgtXVTY",
  authDomain: "demeter-2a73f.firebaseapp.com",
  projectId: "demeter-2a73f",
  storageBucket: "demeter-2a73f.appspot.com",
  messagingSenderId: "221312520191",
  appId: "1:221312520191:web:16411649864ae2549361ca",
  measurementId: "G-W4112HM4G3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Cloud Storage and get a reference to the service
const storage = getStorage(app);

variavel = req.body.nl_company_cnpj_cpf.replace(/\//g, '')
// Create a reference to 'images/mountains.jpg'
const pdf = ref(storage, variavel+'/'+file);
const gandra = variavel+'/'+file

//const filePath = 'C:/Users/Diogo Bites/Desktop/TCC-MAIN/Demeter/870031.pdf';  // Substitua pelo caminho real do seu arquivo
console.log(resposta.filename+ '<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<<')
const fileContent = fs.readFileSync(resposta.filename);

// Criar um Uint8Array a partir do conteúdo do arquivo
const localFile = new Uint8Array(fileContent);

// 'file' comes from the Blob or File API
// You need to replace 'path/to/local/file.pdf' with the actual path to your local file

uploadBytes(pdf, localFile).then((snapshot) => {
  console.log('Uploaded a blob or file!');
  res.send(gandra)
}).catch((error) => {
  console.error('Error uploading file:', error);
  res.send('erro na linha 43 teste.js :D')
});
}

module.exports = { firebasePost };