import { Titulo } from "../components/titulo";
import { Botao } from "../components/botao";
import { AuthContext } from '../context/authContext';
import UserContext from "../context/userContext";
import React, { useContext, useState } from "react";
import { Box, ScrollView, HStack, Button, Image, VStack, Input, Flex, Divider } from "native-base";
import { secoes } from "../utils/perfilSecoes";
import { db } from "../firebase/firebase.js";
import { collection, getDocs, query, where } from "firebase/firestore";
import { cadastradoSucesso, produtoSalvo, Toast } from "../utils/alerts";


export default function Perfil() {

  const user = React.useContext(UserContext);
  const { signOut } = useContext(AuthContext);
  const [numSecao, setNumSecao] = useState(0);
  const [categoriaSelecionada, setCategoriaSelecionada] = useState(null);
  const [produtoSelecionado, setProdutoSelecionado] = useState(null);

  function avancarSecao() {
    if (numSecao < secoes.length - 1) {
      setNumSecao(numSecao + 1);
      console.log('avaniu');
    }
  }
  function voltarSecao() {
    if (numSecao > 0) {
      setNumSecao(numSecao - 1);
    }
  }

  const montaSecoes = async () => {
    console.log("teste1" + user.uid)
    const q = query(collection(db, "usuarios", user.uid), where("produtos", "array-contains",
      { categoria: "Frutas" }));
    console.log("testelog2");
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      console.log(doc.id + ' => ' + doc.data());
    });
  }

  const carregarProdutosUsuario = async () => {
    const q = query(collection(db, "usuarios", user.uid, "produtos"));
    const querySnapshot = await getDocs(q);
  
    const produtosUsuario = [];
    querySnapshot.forEach((doc) => {
      produtosUsuario.push(doc.data());
    });
    return produtosUsuario;
  };

  return (
    <VStack flex={1}>
      {numSecao === 0 && (

          <ScrollView flex={1}>
            <VStack flex={1} alignItems='center' p={5}>
              <Titulo>Perfil</Titulo>
              <HStack flex={1} alignItems='top' p={5}>
                <Image size='xl' borderRadius='3xl' source={{ uri: user.photoURL }} alt="profile-image" />
                <VStack flex={1} alignItems='flex-start'>
                  <Titulo ml={5} color='blue.500'>{user.displayName}</Titulo>
                  <Titulo fontSize='xs' ml={5} mt={1} color='gray.500'>Atualizar perfil</Titulo>
                </VStack>
              </HStack>
              <Divider mt={5} />
              <Botao w='50%' h='10%' bg='#E9E8E7' _text={{ color: "black" }} onPress={() => { avancarSecao(); montaSecoes(); }}>Produtos</Botao>
              <Botao w='50%' h='10%' bg='#E9E8E7' _text={{ color: "black" }}>Notas</Botao>
              <Botao w='50%' h='10%' bg='#E9E8E7' _text={{ color: "black" }} onPress={signOut}>Log Out</Botao>
              <Divider mt={5} />
            </VStack>
          </ScrollView>

      )}
      {numSecao === 1 && (
        <VStack flex={1}>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <HStack my={10}>
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
                    <Button bgColor='gray.100' onPress={() => { avancarSecao(); setProdutoSelecionado(tipoProduto); }}>
                      <HStack key={tipoProduto.produto} my={10}>
                        <Image m={3} size='lg' source={tipoProduto.image} alt="testeimage" />
                        <VStack alignItems='flex-start' justifyContent='center'>
                          <Titulo fontSize='lg' mt={0}>{tipoProduto.produto}</Titulo>
                          <Titulo mt={2} w='100%'>Quantidade: </Titulo>
                        </VStack>
                      </HStack>
                    </Button>
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
        </VStack>
      )}
      {numSecao === 2 && (
        <VStack flex={1}>
          {secoes[numSecao]?.entradaAdicionar?.map(() => {
            return (
              <VStack flex={1} alignItems='center' my={10} >
                <Image borderRadius={100} source={produtoSelecionado.image} alt="Alternate Text" size="xl" />
                <Titulo color='blue.500'>{produtoSelecionado.produto}</Titulo>
                <HStack mt={5} alignItems='center' justifyContent='center'>
                  <Botao bg='gray.200' w='10%' h='60%' _text={{ color: "black" }} m={2} >+</Botao>
                  <Input mt={7} w='40%' h='60%' placeholder="Quantidade.." bgColor="gray.200" fontSize="lg" />
                  <Botao bg='gray.200' w='10%' h='60%' _text={{ color: "black" }} m={2}>-</Botao>
                </HStack>
                <VStack>
                  <Botao bg='gray.200' w='100%' h='20%' _text={{ color: "black" }} m={2} onPress={() => voltarSecao()}>Atualizar </Botao>
                  <Botao bg='gray.200' w='100%' h='20%' _text={{ color: "black" }} m={2} onPress={() => voltarSecao()}>Excluir</Botao>
                </VStack>
              </VStack>
            );
          })}
        </VStack>
      )}
      <Box mt={5} alignItems="center" p={5} justifyContent="center">
        {numSecao > 0 && numSecao < 2 && (
          <Botao onPress={() => voltarSecao()} bgColor="gray.400">
            Voltar
          </Botao>
        )}

      </Box>
    </VStack>
  );
}
