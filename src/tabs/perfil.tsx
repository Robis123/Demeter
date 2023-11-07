import { VStack, Text, ScrollView, Avatar, Divider} from "native-base";
import { Titulo } from "../components/titulo";
import { Botao } from "../components/botao";
import { useContext } from 'react';
import { AuthContext } from '../context/authContext';
export default function Perfil() {
  const { signOut } = useContext(AuthContext);
  return (
    <ScrollView flex={1}>
      <VStack flex={1} alignItems='center' p={5}>
        <Titulo>Perfil</Titulo>
        <Avatar size='xl' source={{ uri: 'https://avatars.githubusercontent.com/u/72632169?v=4'}}/>

        <Titulo color='blue.500'>Tiago Gandra</Titulo>
        <Divider mt={5}/>
        <Botao w='50%' h='10%'>Produtos</Botao>
        <Botao w='50%' h='10%'>Notas</Botao>
        <Botao w='50%' h='10%' onPress={signOut}>Log Out</Botao>
        <Divider mt={5}/>

      </VStack>
    </ScrollView>
  );
}
