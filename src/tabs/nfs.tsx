import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking, Clipboard, StyleSheet, TextInput, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/authContext';
import UserContext from '../context/userContext';
import { collection, getDocs, query, where, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import NFSE from '../utils/api';
import { getUrlPdf } from '../utils/pablo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { notaFiscalSucesso,  Toast } from '../utils/alerts';


const Stack = createNativeStackNavigator();

const NotasScreen = ({ navigation }) => {
  const user = useContext(UserContext);
  const [valor, setValor] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [quantidadeAtual, setQuantidadeAtual] = useState(0);
  const [valorAtual, setValorAtual] = useState(0);
  const [totaisProdutos, setTotaisProdutos] = useState([]);
  const [totalSecao, setTotalSecao] = useState(0);
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);
  const [path, setPath] = useState('');



  // Função para adicionar um produto à lista
  const adicionarProduto = (produto) => {
    const produtoExistenteIndex = produtosSelecionados.findIndex(
      (p) => p.produto === produto.produto
    );

    const novoTotalProduto = produto.quantidade * produto.valor;

    let novoTotal = totalSecao;

    if (produtoExistenteIndex !== -1) {
      // Produto já existe, apenas atualize a quantidade
      const novosProdutosSelecionados = [...produtosSelecionados];
      novosProdutosSelecionados[produtoExistenteIndex] = {
        ...novosProdutosSelecionados[produtoExistenteIndex],
        quantidade: produto.quantidade,
        valor: produto.valor,
      };
      setProdutosSelecionados(novosProdutosSelecionados);
      //botão cinza
    } else {
      // Novo produto, adicione ao array
      setProdutosSelecionados([...produtosSelecionados, produto]);
      novoTotal += novoTotalProduto;
    }

    console.log('Valor total', novoTotal);
    setTotalSecao(novoTotal);
  };

  const atualizarQuantidadeProduto = async (produto, quantidadeAtual) => {
    try {
      const usuarioRef = doc(db, 'usuarios', user.uid);
      const usuarioDoc = await getDoc(usuarioRef);
  
      if (usuarioDoc.exists()) {
        const produtos = usuarioDoc.data().produtos;
        const produtoIndex = produtos.findIndex((p) => p.produto === produto.produto);
  
        if (produtoIndex !== -1) {
          // Produto encontrado, atualize a quantidade
          produtos[produtoIndex].quantidade -= quantidadeAtual;
  
          // Atualize o documento no Firestore
          await updateDoc(usuarioRef, { produtos });
        }
      }
    } catch (error) {
      console.error('Erro ao atualizar a quantidade do produto:', error);
    }
  };
  // Mova a adição de totalProduto para fora da função adicionarProduto
  useEffect(() => {
    var totalProduto = produtosSelecionados.reduce(
      (total, produto) => total + produto.quantidade * produto.valor,
      0
    );
    setTotaisProdutos([...totaisProdutos, totalProduto]);
    console.log(produtosSelecionados)
  }, [produtosSelecionados]);

  var MyComponent = () => {
    // Defina um estado para armazenar o valor do sessionStorage
    const [storedData, setStoredData] = useState('');
  }
  // Função para emitir a nota fiscal

  var [pathReady, setPathReady] = useState(false);
  var emitirNotaFiscal = async () => {
    try {
      var produtosRef = collection(db, 'usuarios');
      var q = query(produtosRef, where('email', '==', user.email));
      var querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        var data = doc.data();
        NFSE(
          data.inscricaoEstadual,
          'Inscrição Estadual ST',
          data.cnpj,
          data.nome,
          data.bairroDistrito,
          data.cep,
          '30/11/2023',
          data.endereco,
          data.cidade,
          data.uf,
          '11111111',
          100,
          'caixa',
          data.telefone,
          145.50,
          JSON.stringify(data.produtos)
        )
          .then(async (result) => {
            var url = await getUrlPdf(result);

            // console.log(url);
            // setPath(url);
            // setPathReady(true);
            //handleCopyPress(url);
            var json = { testeurl: url };
            return Robson(json);
          })
          .catch(async (error) => {
            console.error('Error:', error);
          });
      });

      setProdutos([]);
      setProdutosSelecionados([]);
      setTotaisProdutos([]);
      setTotalSecao(0);

    } catch (error) {
      console.error('Erro ao obter produtos:', error);
    }
  };
  useEffect(() => {
    getProdutos();
  }, [user]);
  // Função para obter os produtos do usuário
  const getProdutos = async () => {
    try {
      const produtosRef = collection(db, 'usuarios');
      const q = query(produtosRef, where('email', '==', user.email));
      const querySnapshot = await getDocs(q);

      const produtosData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        produtosData.push(...data.produtos);
      });
      setProdutos(produtosData);
    } catch (error) {
      console.error('Erro ao obter produtos:', error);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha Nota Fiscal</Text>
      <Text style={styles.subtitle}>Informe a quantidade e valor do produto que deseja adicionar à nota fiscal:</Text>

      {/* Lista de produtos */}
      <FlatList
        data={produtos}
        showsVerticalScrollIndicator={false}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={{ flex: 1, alignItems: 'center', margin: 20 }}>
            <View style={styles.produtoContainer}>
              <View style={styles.textContainer}>
                <Text style={styles.itemText}>{item.produto}</Text>
                <Text style={styles.itemText}>Categoria: {item.categoria}</Text>
                <Text style={styles.itemText}>Quantidade: {item.quantidade}</Text>
              </View>
              <View style={[styles.textContainer, { alignSelf: 'flex-end' }]}>
                <Text style={styles.label}>Valor(R$)</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Valor"
                  keyboardType="numeric"
                  value={valorAtual.toString()}
                  onChange={(event) => {
                    const text = event.nativeEvent.text;
                    setValorAtual(text ? parseInt(text, 10) : 0);
                  }}
                />
                <Text style={styles.label}>Quantidade</Text>
                <TextInput
                  style={styles.input}
                  placeholder="Quantidade"
                  keyboardType="numeric"
                  value={quantidadeAtual.toString()}
                  onChange={(event) => {
                    const text = event.nativeEvent.text;
                    setQuantidadeAtual(text ? parseInt(text, 10) : 0);
                  }}
                />
              </View>
              {/* Botão de adição de produto */}
            </View>
              <TouchableOpacity style={styles.addButton} onPress={() => {
                const produto = {
                  produto: item.produto,
                  quantidade: quantidadeAtual,
                  valor: valorAtual,
                };
                const mensagem = `${item.produto} - Qtd: ${quantidadeAtual} - Vlr: ${valorAtual} -> Adicionados à nota fiscal`;
                notaFiscalSucesso(mensagem);
                adicionarProduto(produto);
                atualizarQuantidadeProduto(item, quantidadeAtual);
              }}>
                <Ionicons name="add" size={24} color="#fff" />
                <Text style={styles.buttonText}>Adicionar Produto</Text>
              </TouchableOpacity>
          </View>
        )}
      />

      {/* Botão para emitir a nota fiscal */}
      <TouchableOpacity style={styles.emitirButton} onPress={() => {
          emitirNotaFiscal();
          getProdutos();
          setTimeout(() => {
              navigation.navigate('ProdutosNotas');
          }, 2000); // Adicione um atraso de 2 segundos
      }}>
          <Text style={styles.buttonText}>Emitir Nota Fiscal</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
};

const Robson = (url) => {
  var urlDesejada = url.testeurl;

  const handleDownloadPress = async (urlDesejada) => {
    await Linking.openURL(urlDesejada);
  };

  const handleCopyPress = async (urlDesejada) => {
    Clipboard.setString(urlDesejada);
    alert('Link copiado para a área de transferência!');
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity style={styles.urlButton} onPress={handleDownloadPress}>
        <Ionicons name="download" size={30} color="#fff" />
        <Text style={styles.urlbuttonText}>Download</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.urlButton} onPress={handleCopyPress}>
        <Ionicons name="copy" size={30} color="#fff" />
        <Text style={styles.urlbuttonText}>Copiar link</Text>
      </TouchableOpacity>
    </View>
  );
};



// const Robson = ({ path }) => {
//   console.log(typeof(path));
//   console.log('ROBSON PATH:', path)
//   return (
//     <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() => handleDownloadPress(path)}
//       >
//         <Ionicons name="download" size={20} color="#fff" />
//         <Text style={styles.buttonText}>Download</Text>
//       </TouchableOpacity>
//       <TouchableOpacity
//         style={styles.addButton}
//         onPress={() => handleCopyPress(path)}
//       >
//         <Ionicons name="copy" size={20} color="#fff" />
//         <Text style={styles.buttonText}>Copiar link</Text>
//       </TouchableOpacity>
//     </View>
//   );
// };

const handleDownloadPress = (path: string) => {
  // Abra o link no navegador padrão
  console.log(path)
  Linking.openURL(path);
};

const handleCopyPress = (path) => {
  try {
    console.log('jsonteorico:: ' + path)
    console.log('CopyLink:', path)
    Clipboard.setString(path);
    alert('Link copiado para a área de transferência!');
  } catch (error) {
    console.error('Erro ao copiar o link para a área de transferência:', error);
  }
};

// const handleCopyPress = (path: string) => {
//   const pathString = typeof path === 'string' ? path : JSON.stringify(path);
//   try {
//     // Copie o link para a área de transferência
//     //MODIFIQUEI AQUI: com use context
//     console.log('CopyLink:', pathString)
//     Clipboard.setString(pathString);
//     alert('Link copiado para a área de transferência!');
//   } catch (error) {
//     console.error('Erro ao copiar o link para a área de transferência:', error);
//   }
// };

const NotasStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Notas" component={NotasScreen} options={{ headerTransparent: true, headerTitle: '' }} />
    <Stack.Screen name="ProdutosNotas" component={Robson} options={{ headerTransparent: true, headerTitle: '' }} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#808080',
  },
  produtoContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    width: '90%',
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  textContainer: {
    margin: 10,
  },
  deleteButton: {
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: '80%',
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#4FAF5A',
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
  },
  urlButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 40,
    backgroundColor: '#4FAF5A',
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
  },
  emitirButton: {
    backgroundColor: '#1c7a27',
    borderRadius: 10,
    padding: 20,
    width: '80%',
    alignItems: 'center',
    margin: 10,
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 18,
  },
  urlbuttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 24,
  },
  itemText: {
    fontSize: 16,
  },
  label: {
    fontSize: 14,
    marginBottom: 3,
  }
});

export default NotasStack;
