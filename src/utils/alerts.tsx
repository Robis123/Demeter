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

const notaFiscalSucesso = (mensagem: string) => {
  console.log("Mensagem recebida:", mensagem);
  Toast.show({
    type: 'success',
    position: 'bottom',
    text1: mensagem,
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
};

const notaFiscalQtdErro = () => {
  console.log("Mensagem recebida:");
  Toast.show({
    type: 'error',
    position: 'bottom',
    text1: 'Quantidade inválida',
    visibilityTime: 4000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
};


const cadastradoAtualizadoSucesso = () => {
  Toast.show({
    type: 'success',
    position: 'bottom',
    text1: 'Cadastrado atualizado com sucesso',
    visibilityTime: 3000,
    autoHide: true,
    topOffset: 30,
    bottomOffset: 40,
  });
};

const produtoSalvo = (booleano) => {
  if (booleano == true) {
    Toast.show({
      type: 'success',
      position: 'bottom',
      text1: 'Produto salvo com sucesso',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    },
    );
  } else {
    Toast.show({
      type: 'error',
      position: 'bottom',
      text1: 'Produto já existente',
      visibilityTime: 4000,
      autoHide: true,
      topOffset: 30,
      bottomOffset: 40,
    },
    );
  }}
  


export {cadastradoSucesso, cadastradoAtualizadoSucesso, Toast, produtoSalvo, notaFiscalSucesso, notaFiscalQtdErro};