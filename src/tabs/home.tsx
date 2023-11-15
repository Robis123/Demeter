import { Avatar, Box, Radio, ScrollView, HStack, Button, Image, VStack, Input } from "native-base";
import { Titulo } from "../components/titulo";
import { Botao } from "../components/botao";
import { EntradaTexto } from "../components/entradaTexto";
import { useState } from "react";
import { secoes } from "../utils/homeSecoes";
import { color } from "native-base/lib/typescript/theme/styled-system";
import React, { ReactNode } from "react";
import Image1 from "../assets/image1.png";
import Image2 from "../assets/image2.png";
import Image3 from "../assets/image3.png";
import Image4 from "../assets/image4.png";
import Image5 from "../assets/image5.png";
import Image6 from "../assets/image6.png";

export default function Cadastro({ navigation }) {
  const [numSecao, setNumSecao] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null); // Adicione esta linha

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
    <ScrollView flex={1}>
      <Titulo alignItems="center" p={5} justifyContent="center">
        {" "}
        {secoes[numSecao].titulo}{" "}
      </Titulo>
      <Box
        mt={1}
        mb={0}
        alignItems="center"
        pr={5}
        pl={5}
        justifyContent="center"
      >
        {secoes[numSecao]?.entradaCategoria?.map((entrada) => {
          return (
            <HStack>
              <VStack>
                <Button p={0} m={3} borderRadius={100} onPress={() => avancarSecao()} bgColor="blue.400">
                  <Image borderRadius={100}  source={
                    
                    
                    entrada.image} alt="Alternate Text" size="xl" />
                </Button>
                <Titulo>{entrada.categoria}</Titulo>
              </VStack>
              
            </HStack>
          );
        })}
        {secoes[numSecao]?.entradaProdutos?.map((entrada) => {
          return (
            <HStack>
              <Button p={0} m={3} borderRadius={100} onPress={() => avancarSecao()} bgColor="blue.400">
                <Image borderRadius={100} source={{
                  uri: "https://www.w3schools.com/css/img_lights.jpg"}} alt="Alternate Text" size="xl" />
              </Button>
              <Button p={0} m={3} borderRadius={100} onPress={() => avancarSecao()} bgColor="blue.400">
                <Image borderRadius={100} source={{
                  uri: "https://www.w3schools.com/css/img_lights.jpg"}} alt="Alternate Text" size="xl" />
              </Button>
            </HStack>
          );
        })}
        {secoes[numSecao]?.entradaAdicionar?.map((entrada) => {
          return (
            <VStack flex={1} alignItems='center' >
              <Image borderRadius={100} source={{
              uri: "https://www.w3schools.com/css/img_lights.jpg"}} alt="Alternate Text" size="xl" />
              <Titulo color='blue.500'>Produto</Titulo>
              <HStack>
                <Botao w='40%' h='100%' m={2}>Atualizar </Botao>
                <Botao w='40%' h='100%' m={2}>Excluir</Botao>
              </HStack>
              <HStack mt={5}>
                <Botao w='20%' h='100%' m={2} >+</Botao>
                <Input mt={7} w='40%' h='100%' placeholder="Quantidade.." bgColor="gray.200" fontSize="lg"/>
                <Botao w='20%' h='100%' m={2}>-</Botao>
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
          <Botao onPress={() => setNumSecao(numSecao - 2)} >
            Salvar
          </Botao>
        )}
      </Box>
    </ScrollView>
  );
}