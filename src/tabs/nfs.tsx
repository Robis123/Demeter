import { Box, ScrollView, HStack, Button, Image, VStack, Input } from "native-base";
import { Titulo } from "../components/titulo";
import { Botao } from "../components/botao";
import React, { useState } from "react";
import { secoes } from '../utils/nfsSecoes';

export default function Nfs() {
  const [numSecao, setNumSecao] = useState(0);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);
  const [quantidadeAtual, setQuantidadeAtual] = useState(0);

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
      {numSecao === 0 && (
        <VStack alignItems='center'>
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
        </VStack>
      )}
      {numSecao === 0 && (
        <ScrollView>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <HStack my={2}>
              {secoes[numSecao]?.entradaCategoria?.map((entrada) => (
                <VStack px={2} key={entrada.categoria}>
                  <Button
                    p={0}
                    borderRadius={100}
                    onPress={() => setCategoriaSelecionada(entrada.categoria)}
                    bgColor={categoriaSelecionada === entrada.categoria ? "blue.400" : "gray.200"}
                  >
                    <Image source={entrada.image} alt="Alternate Text" size="md" />
                  </Button>
                  <Titulo fontSize='md' mt={0}>{entrada.categoria}</Titulo>
                </VStack>
              ))}
            </HStack>
          </ScrollView>
          <ScrollView showsVerticalScrollIndicator={false}>
            {secoes[numSecao]?.entradaProdutos
              ?.filter((produto) => !categoriaSelecionada || produto.categoria === categoriaSelecionada)
              .map((entrada) => {
                return entrada.tiposProdutos.map((tipoProduto) => {
                  return (
                    <HStack key={tipoProduto.produto}>
                      <Image m={3} size='lg' source={tipoProduto.image} alt="testeimage" />
                      <VStack alignItems='flex-start'>
                        <Titulo fontSize='lg' mt={0}>{tipoProduto.produto}</Titulo>
                        <VStack justifyContent='center' alignItems='center'>
                          <HStack mt={5} alignItems='center' justifyContent='center'>
                            <Botao mt={0} bg='gray.200' w='10%' h='100%' _text={{ color: "black" }} m={2} >+</Botao>
                            <Input
                              w='50%'
                              h='110%'
                              placeholder="Quantidade..."
                              bgColor="gray.200"
                              fontSize="lg"
                              onChange={(event) => setQuantidadeAtual(parseInt(event.nativeEvent.text, 10))}
                            />
                            <Botao mt={0} bg='gray.200' w='10%' h='100%' _text={{ color: "black" }} m={2}>-</Botao>
                          </HStack>
                        </VStack>
                        <Button
                          mt={2}
                          w='75%'
                          onPress={() => {
                            const produto = { nome: tipoProduto.produto, quantidade: quantidadeAtual, categoria: categoriaSelecionada };
                            setProdutosSelecionados([...produtosSelecionados, produto]);
                          }}
                        >
                          Adicionar
                        </Button>
                      </VStack>
                    </HStack>
                  );
                });
              })}
            <VStack alignItems='center'>
              <Botao
                mr={8}
                mb={5}
                bg='green.500'
                _text={{ fontSize: '2xl' }}
                w='60%'
                onPress={avancarSecao}
              >
                Continuar
              </Botao>
            </VStack>
          </ScrollView>
        </ScrollView>
      )}
      {numSecao === 1 && (
        <ScrollView>
          <ScrollView showsVerticalScrollIndicator={false}>
            {produtosSelecionados.map((produto, index) => {
              const tipoProduto = secoes[numSecao]?.entradaProdutos
                ?.find((categoria) => categoria.categoria === produto.categoria)
                ?.tiposProdutos.find((tipo) => tipo.produto === produto.nome);

              return (
                <HStack key={index}>
                  <Image m={3} size='lg' source={tipoProduto?.image} alt="testeimage" />
                  <VStack alignItems='flex-start'>
                    <Titulo fontSize='lg' mt={0}>{produto.nome}</Titulo>
                    <Titulo mt={2} w='100%'>Quantidade: {produto.quantidade}</Titulo>
                  </VStack>
                </HStack>
              );
            })}
            <VStack alignItems='center'>
              <Botao
                mr={8}
                mb={5}
                bg='green.500'
                _text={{ fontSize: '2xl' }}
                w='60%'
                onPress={avancarSecao}
              >
                Emitir Nota Fiscal
              </Botao>
            </VStack>
          </ScrollView>
        </ScrollView>
      )}
      <Box mt={5} alignItems="center" p={5} justifyContent="center">
        {numSecao > 0 && numSecao < 2 && (
          <Botao onPress={() => voltarSecao()} bgColor="gray.400">
            Voltar
          </Botao>
        )}
        {numSecao >= 2 && (
          <Botao
            bg='green.500'
            _text={{ fontSize: '3xl' }}
            p={5}
            w='70%'
            onPress={() => {
              setNumSecao(0); // Redefine para a primeira seção
              setProdutosSelecionados([]); // Reseta os produtos selecionados
            }}
          >
            Salvar
          </Botao>
        )}

      </Box>
    </VStack>
  );
}
