import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, Linking, Clipboard, StyleSheet, TextInput, FlatList, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserContext from '../context/userContext';
import { collection, getDocs, query, where, doc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import NFSE from '../utils/api';
import { getUrlPdf } from '../utils/pablo';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { notaFiscalSucesso,  Toast, notaFiscalQtdErro } from '../utils/alerts';


const Stack = createNativeStackNavigator();

const NotasScreen = ({ navigation }) => {
  const user = useContext(UserContext);
  const [produtos, setProdutos] = useState([]);
  const [quantidadeAtual, setQuantidadeAtual] = useState(0);
  const [valorAtual, setValorAtual] = useState(0);
  const [totaisProdutos, setTotaisProdutos] = useState([]);
  const [totalSecao, setTotalSecao] = useState(0);
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);
  const [Bitera, setbitera] = useState()

  const images = {
    banana: require('../assets/Banana.png'),
    maca: require('../assets/Maça.png'),
    pera: require('../assets/Pera.png'),
    soja: require('../assets/Soja.png'),
    trigo: require('../assets/Trigo.png'),
    uva: require('../assets/Uva.png'),
    morango: require('../assets/Morango.png'),
    milho: require('../assets/Milho.png'),
    mamão: require('../assets/Mamão.png'),
    lentilha: require('../assets/Lentilha.png'),
    leguminosas: require('../assets/Leguminosas.png'),
    hortaliças: require('../assets/Hortaliças.png'),
    'grão de bico': require('../assets/GrãodeBico.png'),
    feijao: require('../assets/Feijão.png'),
    espinafre: require('../assets/Espinafre.png'),
    ervilha: require('../assets/Ervilha.png'),
    couve: require('../assets/Couve.png'),
    cevada: require('../assets/Cevada.png'),
    cereais: require('../assets/Cereais.png'),
    centeio: require('../assets/Centeio.png'),
    brócolis: require('../assets/Brócolis.png'),
    aveia: require('../assets/Aveia.png'),
    arroz: require('../assets/Arroz.png'),
    amendoim: require('../assets/Amendoim.png'),
    alface: require('../assets/Alface.png'),
    adubo: require('../assets/Adubo.png'),
    'adubo organomineral': require('../assets/AduboOrganomineral.png'),
    'adubo orgânico': require('../assets/AduboOrganico.png'),
    'adubo mineral': require('../assets/AduboMineral.png'),
    acelga: require('../assets/Acelga.png'),
    'muda 1': require('../assets/Muda1.png'),
    'muda 2': require('../assets/Muda2.png'),
    'muda 3': require('../assets/Muda3.png'),
  };

   



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
      setProdutosSelecionados([...produtosSelecionados, produto]);
      novoTotal += novoTotalProduto;
    console.log('Valor total', novoTotal);
    setTotalSecao(novoTotal);
    }
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

  var emitirNotaFiscal = async () => {
    try {
      var produtosRef = collection(db, 'usuarios');
      var q = query(produtosRef, where('email', '==', user.email));
      var querySnapshot = await getDocs(q);
      let dataAtual: Date = new Date();
      let dia: string = String(dataAtual.getDate()).padStart(2, '0');
      let mes: string = String(dataAtual.getMonth() + 1).padStart(2, '0'); // Os meses do JavaScript começam do 0
      let ano: number = dataAtual.getFullYear();
      let dataFormatada: string = dia + '/' + mes + '/' + ano;
  
      // Crie um array para armazenar as URLs
      const urls = [];
  
      // Use Promise.all para esperar todas as promessas serem resolvidas
      await Promise.all(querySnapshot.docs.map(async (doc) => {
        var data = doc.data();
        try {
          const result = await NFSE(
            '123456789',
            'Inscrição Estadual ST',
            data.cnpj,
            data.nome,
            data.bairroDistrito,
            data.cep,
            dataFormatada,
            data.endereco,
            data.cidade,
            data.uf,
            data.inscricaoEstadual,
            produtosSelecionados.length,
            'caixa',
            data.telefone,
            totalSecao,
            JSON.stringify(produtosSelecionados)
          );
  
          const url = await getUrlPdf(result);
          urls.push(url);
  
        } catch (error) {
          console.error('Error:', error);
        }
      }));
  
      // Atualize o estado diretamente com a última URL (opcional)
      const lastUrl = urls[urls.length - 1];
      setbitera(lastUrl);
  
      // Aqui você pode usar o array de URLs (urls) conforme necessário
      console.log('Todas as URLs:', urls);
      console.log('Ultima URL:', lastUrl);
      getProdutos();
      navigation.navigate('ProdutosNotas', {lastUrl: lastUrl});
  
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
                <Image style={{width: 75, height: 75}} source={images[item.produto.toLowerCase()]} />
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
            <TouchableOpacity style={styles.addButton} onPress={async () => {
              const produto = {
                produto: item.produto,
                quantidade: quantidadeAtual,
                valor: valorAtual,
                quantidadeTotal: parseInt(item.quantidade, 10) // Converta a string para um número
              };
              
              const mensagem = `${item.produto} - Qtd: ${quantidadeAtual} - Vlr: ${valorAtual} -> Adicionados à nota fiscal`;
              
              if (produto.quantidade <= produto.quantidadeTotal) {
                adicionarProduto(produto);
                await atualizarQuantidadeProduto(item, quantidadeAtual);
                notaFiscalSucesso(mensagem);
                // Atualize a quantidade total disponível
                produto.quantidadeTotal -= produto.quantidade;
              } else {
                notaFiscalQtdErro();
              }
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
      }}>
          <Text style={styles.buttonText}>Emitir Nota Fiscal</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.cancelarButton} onPress={() => {
        // Adicione aqui a lógica para cancelar e zerar os arrays
        setProdutos([]);
        setProdutosSelecionados([]);
        setTotaisProdutos([]);
        setTotalSecao(0);
        getProdutos();
      }}>
        <Text style={styles.buttonText}>Cancelar</Text>
      </TouchableOpacity>
      <Toast />
    </View>
  );
};

const Robson = ({ route, navigation }) => {
  const { lastUrl} = route.params
  var bites = lastUrl; // Utilize a propriedade lastUrl passada como argumento
  const user = useContext(UserContext);


  const attUrls = async (url) => {
    var userRef = doc(db, 'usuarios', user.uid);
    await updateDoc(userRef, {
      urls: arrayUnion(url)
    });
  };

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <TouchableOpacity style={styles.urlButton} onPress={() => {
          Linking.openURL(bites);
          attUrls(bites);
          setTimeout(() => {
            navigation.navigate('Notas');
          }, 2000); // Adicione um atraso de 2 segundos
        }}>
        <Ionicons name="download" size={30} color="#fff" />
        <Text style={styles.urlbuttonText}>Download</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.urlButton} onPress={() => {
          Clipboard.setString(bites);
          alert('Link copiado para a área de transferência!');
          attUrls(bites);
          setTimeout(() => {
            navigation.navigate('Notas');
          }, 2000); // Adicione um atraso de 2 segundos
        }}>
        <Ionicons name="copy" size={30} color="#fff" />
        <Text style={styles.urlbuttonText}>Copiar link</Text>
      </TouchableOpacity>
    </View>
  );
};

const handleDownloadPress = (path: string) => {
  // Abra o link no navegador padrão
  console.log(path)
  Linking.openURL(path);
};

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
    padding: 15,
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
  },
  cancelarButton: {
    backgroundColor: '#808080', // Você pode escolher uma cor diferente
    borderRadius: 10,
    padding: 15,
    width: '80%',
    alignItems: 'center',
    margin: 10,
  },
});

export default NotasStack;
