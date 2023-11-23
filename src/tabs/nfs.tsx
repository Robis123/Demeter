import { Avatar, Box, Radio, ScrollView, HStack, Button, Image, VStack, Input, Flex, View} from "native-base";
import { Titulo } from "../components/titulo";
import { Botao } from "../components/botao";
import React from "react";
import { useState } from "react";
import { secoes } from '../utils/nfsSecoes'
import Image1 from "../assets/image1.png";
import Image2 from "../assets/image2.png";
import Image3 from "../assets/image3.png";
import Image4 from "../assets/image4.png";
import Image5 from "../assets/image5.png";
import Image6 from "../assets/image6.png";
export default function Nfs() {
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
      <Box flex={1}>
        {numSecao == 0 && <VStack alignItems='center'>
          <Titulo px={5} w='100%' color="black" fontSize='3xl'>Quais produtos gostaria de emitir na NFEs ?</Titulo>
          <Titulo mt={0} px={5} w='80%' fontSize='md'>Informe a quantidade e adicione</Titulo>
          <Input
            mt={3}
            placeholder='Frutas, Leguminosas etc'
            size="lg"
            w="90%"
            borderRadius="3xl"
            bgColor="gray.100"
            shadow={3}
          />
          <Titulo px={5} w='100%' color="black" fontSize='xl'>Categorias</Titulo>
          <>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <HStack my={2}>
              {secoes[numSecao]?.entradaCategoria?.map((entrada) => {
                  return (
                    <VStack px={2}>
                      <Button p={0} borderRadius={100} onPress={() => {setCategoriaSelecionada(entrada.categoria);}} bgColor="blue.400">
                        <Image source={entrada.image} alt="Alternate Text" size="md" />
                      </Button>
                      <Titulo fontSize='md' mt={0}>{entrada.categoria}</Titulo>
                    </VStack>
                  );  
                })} 
              </HStack>
            </ScrollView>
          </>
        </VStack>}
        <ScrollView showsVerticalScrollIndicator={false}>
          {secoes[numSecao]?.entradaProdutos?.filter(produto => produto.categoria === categoriaSelecionada).map((entrada) => {
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
          <VStack alignItems='center'>
            {numSecao == 0 && (
              <Botao mr={8} mb={5} bg='green.500' _text={{ fontSize: '2xl'}}  w='60%' onPress={avancarSecao}>
                Continuar
              </Botao>
            )}
          </VStack>
        </ScrollView>
      </Box>

      {numSecao == 1 && <VStack flex={1} alignItems='center' m={5}>
        <ScrollView showsVerticalScrollIndicator={false}>
            {secoes[numSecao]?.entradaProdutos?.filter(produto => produto.categoria === categoriaSelecionada).map((entrada) => {
              return entrada.tiposProdutos.map((tipoProduto) => {
                return (
                  <HStack>
                    <Image m={3} size='lg' source={tipoProduto.image} alt="testeimage" />
                    <VStack alignItems='flex-start'>
                      <Titulo fontSize='lg' mt={0}>{tipoProduto.produto}</Titulo>
                      <Titulo mt={2} w='100%'>Quantidade</Titulo>
                    </VStack>
                  </HStack>
                )
              })
            })}
            <VStack alignItems='center'>
                <Botao mr={8} mb={5} bg='green.500' _text={{ fontSize: '2xl'}}  w='60%' onPress={avancarSecao}>
                  Emitir Nota Fiscal
                </Botao>
            </VStack>
        </ScrollView>

      </VStack>}







      {numSecao > 0 && numSecao < 3 && (
            <Botao onPress={() => voltarSecao()} bgColor="gray.400">
              Voltar
            </Botao>
      )}
    </VStack>
  );
}
