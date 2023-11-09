import { VStack, HStack, ScrollView, Image, Divider} from "native-base";
import { Titulo } from "../components/titulo";
import { Botao } from "../components/botao";
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
import UserContext from "../context/userContext";
import React from "react";

export default function Perfil() {
  const user = React.useContext(UserContext);
  const { signOut } = useContext(AuthContext);
  return (
    <ScrollView flex={1}>
      <VStack flex={1} alignItems='center' p={5}>
        <Titulo>Perfil</Titulo>
        <HStack flex={1} alignItems='top' p={5}>
          <Image size='xl' borderRadius='3xl' source={{ uri: user.photoURL }} alt="profile-image"/>
          <VStack flex={1} alignItems='flex-start'>
            <Titulo ml={5} color='blue.500'>{user.displayName}</Titulo>
            <Titulo fontSize='xs' ml={5} mt={1} color='gray.500'>Atualizar perfil</Titulo>
          </VStack>
        </HStack>
        <Divider mt={5}/>
        <Botao w='50%' h='10%' bgColor={'#E9E8E7'} _text={{ color: "black" }}>Produtos</Botao>
        <Botao w='50%' h='10%' bgColor={'#E9E8E7'} _text={{ color: "black" }}>Notas</Botao>
        <Botao w='50%' h='10%' bgColor={'#E9E8E7'} _text={{ color: "black" }} onPress={signOut}>Log Out</Botao>
        <Divider mt={5}/>

      </VStack>
    </ScrollView>
  );
}
