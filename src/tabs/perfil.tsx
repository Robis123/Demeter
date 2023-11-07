import { VStack, Text, ScrollView, Image, Divider} from "native-base";
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
        <Image size='xl' borderRadius='3xl' source={{ uri: user.photoURL }}/>

        <Titulo color='blue.500'>{user.displayName}</Titulo>
        <Divider mt={5}/>
        <Botao w='50%' h='10%'>Produtos</Botao>
        <Botao w='50%' h='10%'>Notas</Botao>
        <Botao w='50%' h='10%' onPress={signOut}>Log Out</Botao>
        <Divider mt={5}/>

      </VStack>
    </ScrollView>
  );
}
