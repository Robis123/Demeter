import Toast from "react-native-toast-message";


const cadastradoSucesso = () => {
  Toast.show({
    type: 'success',
    position: 'bottom',
    text1: 'Cadastrado com sucesso',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
};

const produtoSalvo = () => {
  Toast.show({
    type: 'success',
    position: 'bottom',
    text1: 'Produto salvo com sucesso',
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
};


export {cadastradoSucesso, Toast, produtoSalvo};