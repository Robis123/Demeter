import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/authContext';
import UserContext from '../context/userContext';
import { collection, getDocs, query, where, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import NFSE from '../utils/api';
import { getUrlPdf } from '../utils/pablo';



const NotasScreen = () => {
  const user = useContext(UserContext);
  const [valor, setValor] = useState('');
  const [produtos, setProdutos] = useState([]);
  const [quantidadeAtual, setQuantidadeAtual] = useState(0);
  const [valorAtual, setValorAtual] = useState(0);
  const [totaisProdutos, setTotaisProdutos] = useState([]);
  const [totalSecao, setTotalSecao] = useState(0);
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);





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
    } else {
      // Novo produto, adicione ao array
      setProdutosSelecionados([...produtosSelecionados, produto]);
      novoTotal += novoTotalProduto;
    }
  
    console.log('Valor total', novoTotal);
    setTotalSecao(novoTotal);
  };
  
  // Mova a adição de totalProduto para fora da função adicionarProduto
  useEffect(() => {
    const totalProduto = produtosSelecionados.reduce(
      (total, produto) => total + produto.quantidade * produto.valor,
      0
    );
    setTotaisProdutos([...totaisProdutos, totalProduto]);
    // console.log(produtosSelecionados)
  }, [produtosSelecionados]);

  // Função para emitir a nota fiscal (vamos implementar posteriormente)
  const emitirNotaFiscal = async () => {
    // Adicione a lógica para emitir a nota fiscal
    // Por enquanto, podemos apenas exibir um log
    try {
      const produtosRef = collection(db, 'usuarios');
      const q = query(produtosRef, where('email', '==', user.email));
      const querySnapshot = await getDocs(q);
      
      const produtosData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();

        //const concatenatedData = Object.values(data).join(' ');
        // console.log('>>>'+getUrlPdf((NFSE(data.inscricaoEstadual,'Inscrição Estadual ST', data.cnpj, data.nome, data.bairroDistrito, data.cep, '30/11/2023', data.endereco, data.cidade, data.uf, '11111111',100,'caixa', data.telefone,145.50, JSON.stringify(data.produtos)))))
        // console.log('>>>', NFSE(data.inscricaoEstadual,'Inscrição Estadual ST', data.cnpj, data.nome, data.bairroDistrito, data.cep, '30/11/2023', data.endereco, data.cidade, data.uf, '11111111',100,'caixa', data.telefone,145.50, JSON.stringify(data.produtos)));
        NFSE(data.inscricaoEstadual,'Inscrição Estadual ST', data.cnpj, data.nome, data.bairroDistrito, data.cep, '30/11/2023', data.endereco, data.cidade, data.uf, '11111111',100,'caixa', data.telefone,145.50, JSON.stringify(data.produtos))
          .then(async result => {
            const url = await getUrlPdf(result);
            console.log('Func getUrlPdf: ', url);
          })
          .catch(async error => {
            console.error('Error:', error);
          });
      });
      setProdutos(produtosData);
      setProdutosSelecionados([]);
      setTotaisProdutos([]);
      setTotalSecao(0);

      // console.log('Produtos após a emissão da nota fiscal:', produtosData);

    } catch (error) {
      console.error('Erro ao obter produtos:', error);
    }

    // console.log('Nota Fiscal emitida:', { valor, produtos });
  };

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

  useEffect(() => {
    getProdutos();
  }, [user]);



  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha Nota Fiscal</Text>
      <Text style={styles.subtitle}>Informe a quantidade e valor do produto que deseja adicionar à nota fiscal:</Text>

      {/* Lista de produtos */}
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.produtoContainer}>
            <View style={styles.textContainer}>
              <Text>{item.produto}</Text>
              <Text>Categoria: {item.categoria}</Text>
              <Text>Quantidade: {item.quantidade}</Text>
            </View>
            <View style={styles.textContainer}>
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

              {/* Botão de adição de produto */}
              <TouchableOpacity style={styles.addButton} onPress={() => {
                const produto = {
                  produto: item.produto,
                  quantidade: quantidadeAtual,
                  valor: valorAtual,
                };
                adicionarProduto(produto);
              }}>
                <Ionicons name="add" size={20} color="#fff" />
                <Text style={styles.buttonText}>Adicionar Produto</Text>
              </TouchableOpacity>
            </View>
            {/* Ícone de exclusão (vamos alterar a função depois) */}
            <TouchableOpacity style={styles.deleteButton}>
              <Ionicons name="add" size={20} color="#4FAF5A" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Campo de entrada para o valor */}

      {/* Botão para emitir a nota fiscal */}
      <TouchableOpacity style={styles.emitirButton} onPress={emitirNotaFiscal}>
        <Text style={styles.buttonText}>Emitir Nota Fiscal</Text>
      </TouchableOpacity>
    </View>
  );
};


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
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#808080',
  },
  produtoContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
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
  emitirButton: {
    backgroundColor: '#4FAF5A',
    borderRadius: 10,
    padding: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
  },
});

export default NotasScreen;
