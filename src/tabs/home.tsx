import { Box, ScrollView, HStack, Button, Image, VStack, Input, Flex } from "native-base";
import { Titulo } from "../components/titulo";
import { Botao } from "../components/botao";
import { useState } from "react";
import { secoes } from "../utils/homeSecoes";
import React, { ReactNode } from "react";


export default function Cadastro() {
  const [numSecao, setNumSecao] = useState(0);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

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
      {numSecao >= 0 && numSecao < 2 && <VStack alignItems='center'>
        <Input mt={3} placeholder='Pesquise aqui...' size="lg" w="90%" borderRadius="3xl" bgColor="gray.100" shadow={3} />
      </VStack>}
      <Titulo alignItems="center" p={5} justifyContent="center"> {" "}{secoes[numSecao].titulo}{" "} </Titulo>
      <ScrollView>
        <Box mt={1} mb={0} alignItems="center" pr={5} pl={5} justifyContent="center" >
          <Flex direction="row" wrap="wrap" alignItems='center' justifyContent='center'>
            {secoes[numSecao]?.entradaCategoria?.map((entrada) => {
              return (
                <VStack >
                  <Button p={0} mx={3} my={0} borderRadius={100} onPress={() => {avancarSecao(); setCategoriaSelecionada(entrada.categoria);}} bgColor="blue.400">
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
                      <VStack>
                        <Button p={0} mx={3} my={0} borderRadius={100} onPress={() => {avancarSecao(); setProdutoSelecionado(tipoProduto);}} bgColor="blue.400">
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
              <VStack flex={1} alignItems='center' >
                <Image borderRadius={100} source={produtoSelecionado.image} alt="Alternate Text" size="xl" />
                <Titulo color='blue.500'>{produtoSelecionado.produto}</Titulo>
                <HStack>
                  <Botao bg='gray.200' w='40%' h='60%' _text={{ color: "black" }} m={2}>Atualizar </Botao>
                  <Botao bg='gray.200' w='40%' h='60%' _text={{ color: "black" }} m={2}>Excluir</Botao>
                </HStack>
                <HStack mt={5} alignItems='center' justifyContent='center'>
                  <Botao bg='gray.200' w='10%' h='60%' _text={{ color: "black" }} m={2} >+</Botao>
                  <Input mt={7} w='40%' h='60%' placeholder="Quantidade.." bgColor="gray.200" fontSize="lg"/>
                  <Botao bg='gray.200' w='10%' h='60%' _text={{ color: "black" }} m={2}>-</Botao>
                </HStack>
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
          {numSecao >= 2 && (
            <Botao bg='green.500' _text={{ fontSize: '3xl'}} p={5} w='70%' onPress={() => setNumSecao(numSecao - 2)} >
              Salvar
            </Botao>
          )}
        </Box>
      </ScrollView>
    </VStack>
  );
}