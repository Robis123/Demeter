import { Box, ScrollView, HStack, Button, Image, VStack, Input, Flex } from "native-base";
import { Titulo } from "../components/titulo";
import { Botao } from "../components/botao";
import { doc, setDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/firebase.js";
import React, { useState, useContext } from "react";
import { secoes } from "../utils/homeSecoes";
import UserContext from "../context/userContext";
import { produtoSalvo, Toast} from "../utils/alerts";



export default function Cadastro() {
  const user = React.useContext(UserContext);

  const [numSecao, setNumSecao] = useState(0);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);
  const [quantidade, setQuantidade] = useState("");

  const attProduto = async (categoria, produto, quantidade) => {
    try {
      const userRef = doc(db, 'usuarios', user.uid);
      await setDoc(userRef, { produtos: arrayUnion({categoria, produto, quantidade}) }, { merge: true });
      console.log("Produto adicionado com sucesso");
    } catch (e) {
      console.error("Erro ao adicionar produto: ", e);
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
      <Titulo alignItems="center" p={5} justifyContent="center"> {" "}{secoes[numSecao].titulo}{" "} </Titulo>
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
                <Titulo fontSize='md'>Informe a quantidade que deseja adicionar do produto:</Titulo>
                <HStack alignItems='center' justifyContent='center'>
                  <Input keyboardType="numeric"  mt={5} w='90%' h='60%' placeholder="Quantidade.." bgColor="gray.200" fontSize="lg" value={quantidade} onChangeText={setQuantidade}/>
                </HStack>
                <VStack>
                  <Button _text={{ fontSize: '3xl' }} m={4} p={5} bg='green.500' onPress={() => {produtoSalvo();setNumSecao(numSecao - 2); attProduto( categoriaSelecionada, produtoSelecionado.produto, quantidade );}} >
                    Salvar 
                  </Button>
                  <Button _text={{ fontSize: '3xl' }} m={3} p={5} bg='gray.500' onPress={() => {setNumSecao(numSecao - 2);}} >
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