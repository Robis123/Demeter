import { Box, ScrollView, HStack, Button, Image, VStack, Input } from "native-base";
import { Titulo } from "../components/titulo";
import { Botao } from "../components/botao";
import { useState } from "react";
import { secoes } from '../utils/nfsSecoes';
import NFSE from '../utils/api';


export default function Nfs() {
  const [numSecao, setNumSecao] = useState(0);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [produtosSelecionados, setProdutosSelecionados] = useState([]);
  const [quantidadeAtual, setQuantidadeAtual] = useState(0);
  const [valorAtual, setValorAtual] = useState(0);
  const [totaisProdutos, setTotaisProdutos] = useState([]);
  const [totalSecao, setTotalSecao] = useState(0);




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

  function adicionarProduto(produto) {
    const totalProduto = produto.quantidade * produto.valor;
    setTotaisProdutos([...totaisProdutos, totalProduto]);
  
    const novoTotal = totalSecao + totalProduto;
    setTotalSecao(novoTotal);
    setProdutosSelecionados([...produtosSelecionados, produto]);
  }

  return (
    <VStack flex={1}>
      {numSecao === 0 && (
        <VStack alignItems='center'>
          <Titulo px={5} w='100%' color="black" fontSize='xl'>Quais produtos gostaria de emitir na NFEs ?</Titulo>
          <Titulo mt={0} px={5} w='90%' fontSize='md'>Informe a quantidade, valor e adicione</Titulo>
          <Titulo mb={4} px={5} w='100%' color="black" fontSize='xl'>Categorias</Titulo>
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
                    onPress={() => setCategoriaSelecionada(entrada.categoria)}
                    bgColor={categoriaSelecionada === entrada.categoria ? "blue.400" : "gray.100"}
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
                    <Box borderWidth={1} borderColor='gray.200' borderRadius='md'>
                    <HStack key={tipoProduto.produto} my={5} >
                      <Image mt={20} m={3} size='lg' source={tipoProduto.image} alt="testeimage" />
                      <VStack alignItems='flex-start'>
                        <Titulo fontSize='lg' mt={0}>{tipoProduto.produto}</Titulo>
                        <VStack justifyContent='center' alignItems='center'>
                          <HStack mt={5} alignItems='center' justifyContent='center'>
                            <Input
                              w='70%'
                              h='110%'
                              keyboardType="numeric"
                              placeholder="Quantidade..."
                              bgColor="gray.200"
                              fontSize="lg"
                              onChange={(event) => setQuantidadeAtual(parseInt(event.nativeEvent.text, 10))}
                            />
                          </HStack>
                          <HStack mt={5} alignItems='center' justifyContent='center'>
                            <Input
                              w='70%'
                              h='100%'
                              keyboardType="numeric"
                              placeholder="Valor (Real)..."
                              bgColor="gray.200"
                              fontSize="lg"
                              onChange={(event) => setValorAtual(parseFloat(event.nativeEvent.text))}
                            />
                          </HStack>
                        </VStack>
                        <Button
                          mt={2}
                          w='70%'
                          bg='green.500'
                          onPress={() => {
                            const produto = {
                              nome: tipoProduto.produto,
                              quantidade: quantidadeAtual,
                              valor: valorAtual,
                              categoria: categoriaSelecionada
                            };
                            adicionarProduto(produto);
                          }}
                        >
                          Adicionar
                        </Button>
                      </VStack>
                    </HStack>
                    </Box>
                  );
                });
              })}
            <VStack alignItems='center'>
              <Botao
                mx={5}
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
                ?.find((entrada) => entrada.categoria === produto.categoria)
                ?.tiposProdutos.find((tipo) => tipo.produto === produto.nome);

                const totalProduto = totaisProdutos[index];

              return (
                <Box borderWidth={1} borderColor='gray.200' borderRadius='md'>
                  <HStack key={index} mt={5}>
                    <Image m={3} size='lg' source={tipoProduto?.image} alt="testeimage" />
                    <VStack alignItems='flex-start'>
                      <Titulo fontSize='xl' mt={0}>{produto.nome}</Titulo>
                      <Titulo fontSize='md' mt={2} w='100%'>Quantidade: {produto.quantidade}</Titulo>
                      <Titulo fontSize='md' mt={2} w='100%'>Valor: R$ {produto.valor}</Titulo>
                      <Titulo mt={2} w='100%'>Total: R$ {totalProduto.toFixed(2)}</Titulo>
                    </VStack>
                  </HStack>
                </Box>
              );
            })}
            <VStack alignItems='center'>
              <Botao
                mx={5}
                mb={5}
                bg='green.500'
                _text={{ fontSize: '2xl' }}
                w='60%'
                onPress={() => {
                  avancarSecao();
                  NFSE('123456789', '123456789', '99.123.123/1234-99', 'Diogo Bites Faria de Paula', 'Neo Tokyo', '71387390', '24/11/23', 'jardins mangueiral rua H casa 7', 'Brasília', 'DF', '987654321', '10', 'caixa', '(61)99642-3502', '143,50', '[{"nome": "banana","qtd": 10,"vlrunit": 5},{"nome": "maça","qtd": 10,"vlrunit": 5}]');
                }}
              >
                Emitir Nota Fiscal
              </Botao>
              <Titulo>Total: R$ {totalSecao.toFixed(2)}</Titulo>
            </VStack>
          </ScrollView>
        </ScrollView>
      )}
      <Box mt={2} alignItems="center" p={0} justifyContent="center">
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
              setTotaisProdutos([]); // Reseta os totais dos produtos
              setTotalSecao(0); // Reseta o total da seção
            }}
          >
            Salvar
          </Botao>
        )}

      </Box>
    </VStack>
  );
}
