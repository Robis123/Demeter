const { initializeApp } = require("firebase/app");
const { getStorage, ref, uploadBytes  } = require("firebase/storage");


function firebasePost(file,req){

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

// Create a reference to 'images/mountains.jpg'
const pdf = ref(storage, req.body.nl_company_cnpj_cpf+'/'+file);
console.log(pdf)
// 'file' comes from the Blob or File API
// You need to replace 'path/to/local/file.pdf' with the actual path to your local file
const localFile = new Uint8Array([/* your file data here */]);

uploadBytes(pdf, localFile).then((snapshot) => {
  console.log('Uploaded a blob or file!');
}).catch((error) => {
  console.error('Error uploading file:', error);
});
}

module.exports = { firebasePost };