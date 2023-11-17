import { Avatar, Box, Radio, ScrollView, HStack, Button, Image, VStack, Input, Flex } from "native-base";
import { Titulo } from "../components/titulo";
import { Botao } from "../components/botao";
import React from "react";
import Image1 from "../assets/image1.png";
import Image2 from "../assets/image2.png";
import Image3 from "../assets/image3.png";
import Image4 from "../assets/image4.png";
import Image5 from "../assets/image5.png";
import Image6 from "../assets/image6.png";
export default function Nfs() {
  return (
    <VStack flex={1} alignItems='center'>
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
      <HStack>
        <VStack justifyContent='center' alignItems='center' p={2}>
          <Image size='md' source={Image1} alt="Frutas-image"/>
          <Titulo fontSize='md' mt={0}>Frutas</Titulo>
        </VStack>
        <VStack justifyContent='center' alignItems='center' px={2}>
          <Image size='md' source={Image2} alt="leg-image"/>
          <Titulo fontSize='md' mt={0}>Leguminosas</Titulo>
        </VStack>
        <VStack justifyContent='center' alignItems='center' p={2}>
          <Image size='md' source={Image3} alt="ssd-image"/>
          <Titulo fontSize='md' mt={0}>Frutas</Titulo>
        </VStack>
        <VStack justifyContent='center' alignItems='center' px={2}>
          <Image size='md' source={Image4} alt="fg-image" />
          <Titulo fontSize='md' mt={0}>Leguminosas</Titulo>
        </VStack>   
      </HStack>

      <ScrollView flex={1}>
        <HStack alignItems='center'>
          <Image m={3} size='lg' source={Image3} alt="testeimage" />
          <VStack alignItems='flex-start'>
            <Titulo fontSize='lg' mt={0}>Produto</Titulo>
            <VStack justifyContent='center' alignItems='center'>
              <HStack mt={5} alignItems='center' justifyContent='center'>
                  <Botao mt={0} bg='gray.200' w='10%' h='100%' _text={{ color: "black" }} m={2} >+</Botao>
                  <Input  w='50%' h='110%' placeholder="Quantidade..." bgColor="gray.200" fontSize="lg"/>
                  <Botao mt={0} bg='gray.200' w='10%' h='100%' _text={{ color: "black" }} m={2}>-</Botao>
              </HStack>
              <Button mt={2} w='75%'>Adicionar</Button>
            </VStack>
          </VStack>
        </HStack>
        <HStack alignItems='center'>
          <Image m={3} size='lg' source={Image3} alt="testeimage" />
          <VStack alignItems='flex-start'>
            <Titulo fontSize='lg' mt={0}>Produto</Titulo>
            <VStack justifyContent='center' alignItems='center'>
              <HStack mt={5} alignItems='center' justifyContent='center'>
                  <Botao mt={0} bg='gray.200' w='10%' h='100%' _text={{ color: "black" }} m={2} >+</Botao>
                  <Input  w='50%' h='110%' placeholder="Quantidade..." bgColor="gray.200" fontSize="lg"/>
                  <Botao mt={0} bg='gray.200' w='10%' h='100%' _text={{ color: "black" }} m={2}>-</Botao>
              </HStack>
              <Button mt={2} w='75%'>Adicionar</Button>
            </VStack>
          </VStack>
        </HStack>
        <HStack alignItems='center'>
          <Image m={3} size='lg' source={Image3} alt="testeimage" />
          <VStack alignItems='flex-start'>
            <Titulo fontSize='lg' mt={0}>Produto</Titulo>
            <VStack justifyContent='center' alignItems='center'>
              <HStack mt={5} alignItems='center' justifyContent='center'>
                  <Botao mt={0} bg='gray.200' w='10%' h='100%' _text={{ color: "black" }} m={2} >+</Botao>
                  <Input  w='50%' h='110%' placeholder="Quantidade..." bgColor="gray.200" fontSize="lg"/>
                  <Botao mt={0} bg='gray.200' w='10%' h='100%' _text={{ color: "black" }} m={2}>-</Botao>
              </HStack>
              <Button mt={2} w='75%'>Adicionar</Button>
            </VStack>
          </VStack>
        </HStack>
        <HStack alignItems='center'>
          <Image m={3} size='lg' source={Image3} alt="testeimage" />
          <VStack alignItems='flex-start'>
            <Titulo fontSize='lg' mt={0}>Produto</Titulo>
            <VStack justifyContent='center' alignItems='center'>
              <HStack mt={5} alignItems='center' justifyContent='center'>
                  <Botao mt={0} bg='gray.200' w='10%' h='100%' _text={{ color: "black" }} m={2} >+</Botao>
                  <Input  w='50%' h='110%' placeholder="Quantidade..." bgColor="gray.200" fontSize="lg"/>
                  <Botao mt={0} bg='gray.200' w='10%' h='100%' _text={{ color: "black" }} m={2}>-</Botao>
              </HStack>
              <Button mt={2} w='75%'>Adicionar</Button>
            </VStack>
          </VStack>
        </HStack>
        <VStack alignItems='center'>
          <Botao mr={8} mb={5} bg='green.500' _text={{ fontSize: '2xl'}}  w='60%'>
            Continuar
          </Botao>
        </VStack>
      </ScrollView>
    </VStack>
  );
}
