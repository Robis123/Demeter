const { initializeApp } = require('firebase/app')
const { getStorage, ref, getDownloadURL} = require("firebase/storage");
const axios = require('axios');
const fs = require('fs');

const firebaseConfig = {
    apiKey: "AIzaSyBuTz51FrhMgRnQqQ-XK94vBqB9jgtXVTY",
    authDomain: "demeter-2a73f.firebaseapp.com",
    projectId: "demeter-2a73f",
    storageBucket: "demeter-2a73f.appspot.com",
    messagingSenderId: "221312520191",
    appId: "1:221312520191:web:16411649864ae2549361ca",
    measurementId: "G-W4112HM4G3"
};

const firebaseApp = initializeApp(firebaseConfig);
const storage = getStorage(firebaseApp);

const pdfRef = ref(storage, '11.111.1231234-99/323494.pdf');

getDownloadURL(pdfRef)
    .then((url) => {
        return axios({
            url,
            method: 'GET',
            responseType: 'stream',
        })
    })
    // .then((response) => {
    //     console.log(response);
    //     // const destino = fs.createWriteStream('C:/Users/Diogo Bites/Desktop/testing/nfse.pdf');
    //     // response.data.pipe(destino);
    //  })
    .catch((error) => {
        console.error('Erro ao obter a URL de download:', error);
    });