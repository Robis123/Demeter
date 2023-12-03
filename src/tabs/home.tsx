import { Box, ScrollView, HStack, Button, Image, VStack, Input, Flex } from "native-base";
import { Titulo } from "../components/titulo";
import { Botao } from "../components/botao";
import { doc, setDoc, arrayUnion, getDoc, query, getDocs, where, collection } from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import React, { useState, useContext } from "react";
import { secoes } from "../utils/homeSecoes";
import UserContext from "../context/userContext";
import { produtoSalvo, Toast} from "../utils/alerts";
import { ImageSourcePropType } from "react-native";




export default function Cadastro() {
  const user = React.useContext(UserContext);

  const images = [
    
  ];

  const [numSecao, setNumSecao] = useState(0);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [quantidade, setQuantidade] = useState("");

  const attProduto = async (categoria, produto, quantidade) => {
  
    const img = [
      {
        "banana": "../assets/Banana.png",
        "maca": "../assets/Maça.png",
        "pera": "../assets/Pera.png",
        "soja": "../assets/Soja.png",
        "trigo": "../assets/Trigo.png",
        "uva": "../assets/Uva.png",
        "morango": "../assets/Morango.png",
        "milho": "../assets/Milho.png",
        "Mamão": "../assets/Mamão.png",
        "lentilha": "../assets/Lentilha.png",
        "leguminosas": "../assets/Leguminosas.png",
        "hortaliças": "../assets/Hortaliças.png",
        "grão de bico": "../assets/Grão de Bico.png",
        "feijao": "../assets/Feijão.png",
        "espinafre": "../assets/Espinafre.png",
        "ervilha": "../assets/Ervilha.png",
        "couve": "../assets/Couve.png",
        "cevada": "../assets/Cevada.png",
        "cereais": "../assets/Cereais.png",
        "centeio": "../assets/Centeio.png",
        "Brócolis": "../assets/Brócolis.png",
        "aveia": "../assets/Aveia.png",
        "arroz": "../assets/Arroz.png",
        "amendoim": "../assets/Amendoim.png",
        "alface": "../assets/Alface.png",
        "adubo": "../assets/Adubo.png",
        "adubo organomineral": "../assets/Adubo Organomineral.png",
        "Adubo orgânico": "../assets/Adubo Organico.png",
        "adubo mineral": "../assets/Adubo Mineral.png",
        "acelga": "../assets/Acelga.png",
        "muda 1": "../assets/Muda 1.png",
        "muda 2": "../assets/Muda 2.png",
        "muda 3": "../assets/Muda 3.png"
      }
    ]

    // Variável que você pass

  // Inicializa uma variável para armazenar o caminho da imagem
  let caminhoDaImagem = null;

  // Percorre o array de objetos
  for (let i = 0; i < img.length; i++) {
    // Verifica se a chave existe no objeto atual
    if (img[i].hasOwnProperty(produto.toLowerCase())) {
      // Se a chave for encontrada, atribui o valor correspondente à variável
      caminhoDaImagem = img[i][produto.toLowerCase()];
      // Pode interromper o loop, pois já encontrou a correspondência
      break;
    }
  }
    
    try {
      let booleano = true;
      const userRef = doc(db, 'usuarios', user.uid);
      const produtosRef = collection(db, 'usuarios');
      const q = query(produtosRef, where('email', '==', user.email));
      const querySnapshot2 = await getDocs(q);
      const primeiroDoc = querySnapshot2.docs[0];
      const data = primeiroDoc.data();
      const listaProdutos = data.produtos;
      listaProdutos.forEach(produtoArray => {
        if (produtoArray.produto == produto) {
          throw new Error("Produto já existente");
        }
        
      });
      await setDoc(userRef, { produtos: arrayUnion({categoria, produto, quantidade, caminhoDaImagem}) }, { merge: true });
      booleano = true;
      produtoSalvo(booleano);
    } catch (e) {
      const booleano2 = false;
      produtoSalvo(booleano2);
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
  return (
    <VStack flex={1}>
      <Titulo mt={0} alignItems="center" p={5} justifyContent="center"> {" "}{secoes[numSecao].titulo}{" "} </Titulo>
      <ScrollView>
        <Box mt={1} mb={0} alignItems="center" pr={5} pl={5} justifyContent="center" >
          <Flex direction="row" wrap="wrap" alignItems='center' justifyContent='center'>
            {secoes[numSecao]?.entradaCategoria?.map((entrada) => {
              return (
                <VStack >
                  <Button p={0} mx={3} my={0} borderRadius={100} onPress={() => {avancarSecao(); setCategoriaSelecionada(entrada.categoria);}} bgColor="gray.300">
                    <Image borderRadius={100}  source={
                      entrada.image} alt="Alternate Text" size="xl" />
                  </Button>
                  <Titulo mb={10} mt={0}>{entrada.categoria}</Titulo>
                </VStack>
              );  
            })}
          </Flex>  
          {secoes[numSecao]?.entradaProdutos?.filter(produto => produto.categoria === categoriaSelecionada).map((entrada) => {
            return (
              <VStack>
                <Flex direction="row" wrap="wrap" alignItems='center' justifyContent='center'>
                  {entrada.tiposProdutos.map((tipoProduto) => {
                    return (
                      <VStack alignItems='center'>
                        <Button p={0} mx={3} my={0} borderRadius={100} onPress={() => {avancarSecao(); setProdutoSelecionado(tipoProduto);}} bgColor="gray.100">
                          <Image borderRadius={100}  source={tipoProduto.image} alt="Alternate Text" size="xl" />
                        </Button>
                        <Titulo mb={10} mt={0}>{tipoProduto.produto}</Titulo>
                      </VStack>
                    )
                  })}
                </Flex>
              </VStack>
            )
          })}
            
          {secoes[numSecao]?.entradaAdicionar?.map(() => {
            return (
              <VStack flex={1} alignItems='center' p={5}>
                <Image borderRadius={100} source={produtoSelecionado.image} alt="Alternate Text" size="xl" />
                <Titulo color='black'>{produtoSelecionado.produto}</Titulo>
                <Titulo fontSize='md'>Por favor, indique a quantidade do produto que deseja adicionar. Lembre-se, nós medimos nossos produtos em caixas:</Titulo>
                <HStack alignItems='center' justifyContent='center'>
                  <Input keyboardType="numeric"  mt={5} w='90%' h='60%' placeholder="Quantidade.." bgColor="gray.200" fontSize="lg" value={quantidade} onChangeText={setQuantidade}/>
                </HStack>
                <VStack>
                  <Button _text={{ fontSize: '3xl' }} m={4} p={5} bg='green.500' onPress={() => {setNumSecao(numSecao - 2); attProduto( categoriaSelecionada, produtoSelecionado.produto, quantidade );}} >
                    Salvar 
                  </Button>
                  <Button _text={{ fontSize: '3xl' }} m={4} p={5} bg='gray.500' onPress={() => {setNumSecao(numSecao - 2);}} >
                    Cancelar
                  </Button>
                </VStack>
              </VStack>
            );
          })}
        </Box>
        <Box mt={5} alignItems="center" p={5} justifyContent="center">
          {numSecao > 0 && numSecao < 2 && (
            <Botao onPress={() => voltarSecao()} bgColor="gray.400">
              Voltar
            </Botao>
          )}
        </Box>
      </ScrollView>
      <Toast />
    </VStack>
  );
}