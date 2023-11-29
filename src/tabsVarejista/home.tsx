import { Box, ScrollView, HStack, Button, Image, VStack, Input} from "native-base";
import { Titulo } from "../components/titulo";
import { Botao } from "../components/botao";
import { useState } from "react";
import { secoes } from '../utils/homeSecoesVarejista'

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
          <Titulo px={5} w='100%'  fontSize='md'>Selecione a categoria do produto que procura e irá filtrar os produtores que possuem o produto:</Titulo>
          <Titulo px={5} w='100%' color="black" fontSize='xl'>Categorias</Titulo>
          <>
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <HStack my={2}>
              {secoes[numSecao]?.entradaCategoria?.map((entrada) => {
                  return (
                    <VStack px={2}>
                      <Button p={2} onPress={() => {setCategoriaSelecionada(entrada.categoria);}} bgColor={categoriaSelecionada === entrada.categoria ? "blue.400" : "gray.100"}>
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
                        <Button bgColor='green.500' onPress={() => {avancarSecao(); setProdutorSelecionado(entrada);}}>Conversar</Button>
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
                  <Titulo >Disponibilidade de produtos:</Titulo>
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
                    <Button bgColor='green.500' onPress={() => {voltarSecao();}}>Conversar</Button>
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
