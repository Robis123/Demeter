import { Avatar, Box, Radio, ScrollView, HStack, Button, Image, VStack, Input, Flex, View} from "native-base";
import { Titulo } from "../components/titulo";
import { Botao } from "../components/botao";
import React from "react";
import { useState } from "react";
import { secoes } from '../utils/homeSecoesVarejista'
import Image1 from "../assets/image1.png";
import Image2 from "../assets/image2.png";
import Image3 from "../assets/image3.png";
import Image4 from "../assets/image4.png";
import Image5 from "../assets/image5.png";
import Image6 from "../assets/image6.png";
export default function Nfs() {
  const [numSecao, setNumSecao] = useState(0);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [produtorSelecionado, setProdutorSelecionado] = useState(null);
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
        {numSecao >= 0 && numSecao < 1 && <VStack alignItems='center'>
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
        <>
            <ScrollView>
              {secoes[numSecao]?.entradaProdutores?.map((entrada) => {
                  return (
                    <HStack px={2} m={5}>
                      <Image source={entrada.Image} alt="Alternate Text" size="xl" />
                      <VStack flex={1} alignItems='center' alignContent='center' p={5}>
                        <Titulo mt={0}  fontSize='md' >{entrada.produtor}</Titulo>
                        <Titulo mt={0} fontSize='md' >{entrada.localizacao}</Titulo>
                        <Button onPress={() => {avancarSecao(); setProdutorSelecionado(entrada);}}>Conversar</Button>
                      </VStack>
                    </HStack>
                  );  
                })} 
            </ScrollView>
            {secoes[numSecao]?.entradaProdutor?.map(() => {
              return (
                <VStack flex={1} alignItems='center' >
                  <Image borderRadius={100} source={produtorSelecionado.Image} alt="Alternate Text" size="xl" />
                  <Titulo color='blue.500'>{produtorSelecionado.produtor}</Titulo>
                  <Titulo >Disponibilidade de produtos</Titulo>
                  <ScrollView>
                    {produtorSelecionado.tiposProdutos.filter(produto => produto.categoria === 'Frutas').map((produto) => (
                      <HStack>
                        <Image m={3} size='lg' source={produto.image} alt="testeimage" />
                        <VStack alignItems='flex-start'>
                          <Titulo fontSize='lg' mt={0}>{produto.produto}</Titulo>
                          <Titulo mt={2} w='100%'>Quantidade</Titulo>
                        </VStack>
                      </HStack>
                    ))}
                  </ScrollView>
                </VStack>
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
}
