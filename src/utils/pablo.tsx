const { initializeApp } = require('firebase/app')
const { getStorage, ref, getDownloadURL, storageRef } = require("firebase/storage");
const axios = require('axios');
// const fs = require('fs');
// var FileSaver = require('file-saver');

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


async function getUrlPdf(path) {
    try {
        // console.log('Path:', path);
        const fileRef = ref(storage, path);
        // console.log('fileRef:', fileRef);
        const url = await getDownloadURL(fileRef);
        // console.log('url:', url);

        return url;
    } catch (error) {
        console.error('Erro ao obter a URL de download:', error);
        throw error;
    }
}

export { getUrlPdf };