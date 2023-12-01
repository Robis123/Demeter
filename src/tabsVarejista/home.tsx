import {
  Box,
  ScrollView,
  HStack,
  Button,
  Image,
  VStack,
  Input,
  View,
  Text,
  FlatList
} from "native-base";
import { Titulo } from "../components/titulo";
import { Botao } from "../components/botao";

import { secoes } from "../utils/homeSecoesVarejista";
import UserContext from "../context/userContext";
import { useContext, useEffect, useState } from "react";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';

export default function Nfs() {
  const user = useContext(UserContext);
  const [produtos, setProdutos] = useState([]);
  const [produtores, setProdutores] = useState([]);
  const [numSecao, setNumSecao] = useState(0);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [produtorSelecionado, setProdutorSelecionado] = useState(null);

  const getProdutores = async () => {
    try {
      const produtosRef = collection(db, "usuarios");
      const querySnapshot = await getDocs(produtosRef);

      const produtosData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        produtosData.push(data);
      });
      setProdutores(produtosData);
    } catch (error) {
      console.error("Erro ao obter produtos:", error);
    }
  };

  function avancarSecao() {
    if (numSecao < secoes.length - 1) {
      setNumSecao(numSecao + 1);
    }
  }
  function voltarSecao() {
    if (numSecao > 0) {
      setNumSecao(numSecao - 1);
    }
  }
  const funcaoTeste = async(email) => {
      try {
        const produtosRef = collection(db, 'usuarios');
        const q = query(produtosRef, where('email', '==', email));
        const querySnapshot = await getDocs(q);
  
        const produtosData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          produtosData.push(...data.produtos);
        });
        setProdutos(produtosData);
        return console.log("sucesso")
      } catch (error) {
        console.error('Erro ao obter produtos:', error);
      }

  };

  const renderItem = ({ item }) => (

    <View>
      <View style={styles.textContainer}>
        <Text>Nome: {item.nome}</Text>
        <Text>Endereço: {item.id} - {item.uf}</Text>
        <Button onPress={() => {avancarSecao();funcaoTeste(item.email)}} bgColor="green.500">Conversar</Button>
      </View>
    </View>
  );

  const renderItem2 = ({ item }) => (
    
    <View>
      <View style={styles.textContainer}>
        <Text>Produto: {item.produto}</Text>
        <Text>Quantidade: {item.quantidade}</Text>
      </View>
    </View>
  ); 

  useEffect(() => {
    getProdutores();
  }, [user]);

  return (
    <VStack flex={1}>
      <Box flex={1}>
        {numSecao >= 0 && numSecao < 1 && (
          <VStack alignItems="center">
            <Titulo px={5} w="100%" fontSize="md">
              Selecione a categoria do produto que procura e irá filtrar os
              produtores que possuem o produto:
            </Titulo>
            <Titulo px={5} w="100%" color="black" fontSize="xl">
              Categorias
            </Titulo>
            
            {produtores.length > 0 ? (
              <FlatList
                data={produtores}
                keyExtractor={(item) => item.id}
                renderItem={renderItem}
              />
            ) : (
              <Text>Nenhum produtor cadastrado.</Text>
            )}
           
          </VStack>
        )}
        <>
        
          {secoes[numSecao]?.entradaProdutor?.map(() => {
            return (
              <View>
                <Text>Meus Produtos</Text>
                {produtos.length > 0 ? (
                  <FlatList
                    data={produtos}
                    keyExtractor={(item) => item.id}
                    renderItem={renderItem2}
                  />
                ) : (
                  <Text>Nenhum produto cadastrado.</Text>
                )}
              </View>
                      );
                    })}
        </>
        {/* <ScrollView showsVerticalScrollIndicator={false}>
          {secoes[numSecao]?.entradaProdutores?.filter(produto => produto.categoria === categoriaSelecionada).map((entrada) => {
            return entrada.tiposProdutos.map((tipoProduto) => {
              return (
                <HStack>
                  <Image m={3} size='lg' source={tipoProduto.image} alt="testeimage" />
                  <VStack alignItems='flex-start'>
                    <Titulo fontSize='lg' mt={0}>{tipoProduto.produto}</Titulo>
                    <VStack justifyContent='center' alignItems='center'>
                      <HStack mt={5} alignItems='center' justifyContent='center'>
                        <Botao mt={0} bg='gray.200' w='10%' h='100%' _text={{ color: "black" }} m={2} >+</Botao>
                        <Input  w='50%' h='110%' placeholder="Quantidade..." bgColor="gray.200" fontSize="lg"/>
                        <Botao mt={0} bg='gray.200' w='10%' h='100%' _text={{ color: "black" }} m={2}>-</Botao>
                      </HStack>
                    </VStack>
                    <Button mt={2} w='75%'>Adicionar</Button>
                  </VStack>
                </HStack>
              )
            })
          })}
        </ScrollView> */}
      </Box>

      {numSecao > 0 && numSecao < 3 && (
        <Botao onPress={() => voltarSecao()} bgColor="gray.400">
          Voltar
        </Botao>
      )}
    </VStack>
  );

};

const styles = ({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  displayName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#4FAF5A',
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
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
  lixeiraIcon: {
    marginLeft: 10,
  },
  textContainer: {
    margin: 10,
  },
  deleteButton: {
    marginLeft: 10,
  },
});

