import { VStack, Text, ScrollView, Avatar, Divider} from "native-base";
// import { Titulo } from "../components/titulo";
// import { Botao } from "../components/botao";
export default function Perfil({navigation}) {
  return (
    <ScrollView flex={1}>
      <VStack flex={1} alignItems='center' p={5}>
        {/* <Titulo>Perfil</Titulo> */}
        <Text size='2xl'>Aqui é o perfil caraleo</Text>
        <Avatar size='xl' source={{ uri: 'https://avatars.githubusercontent.com/u/72632169?v=4'}}/>
        {/* <Titulo color='blue.500'>Tiago Gandra</Titulo> */}
        <Divider mt={5}/>
        {/* <Titulo>Endereço: </Titulo>
        <Titulo>Algum dado: </Titulo>
        <Titulo>Algum outro dado: </Titulo>
        <Botao w='50%' h='10%' onPress={() => navigation.navigate("Login")}>Log Out</Botao> */}
        <Divider mt={5}/>

      </VStack>
    </ScrollView>
  );
}
