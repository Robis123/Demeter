import { HStack, Text, ScrollView, Avatar, VStack} from "native-base";
import { EntradaTexto } from "../components/entradaTexto";
export default function Home() {
  return (
    <VStack flex={1} alignItems='center' p={5}>
        <EntradaTexto label=" " placeholder="Pesquise a categoria"/>
      <ScrollView flex={1}>
          <VStack flex={2} p={5}>
            <HStack>
              <Avatar ml={2} mt={5} mr={5} size='2xl' source={{ uri: 'https://avatars.githubusercontent.com/u/72632169?v=4'}}/>
              <Avatar ml={2} mt={5} size='2xl' source={{ uri: 'https://avatars.githubusercontent.com/u/72632169?v=4'}}/>
            </HStack>
            <HStack>
              <Avatar ml={2} mt={5} mr={5} size='2xl' source={{ uri: 'https://avatars.githubusercontent.com/u/72632169?v=4'}}/>
              <Avatar ml={2} mt={5} size='2xl' source={{ uri: 'https://avatars.githubusercontent.com/u/72632169?v=4'}}/>
            </HStack>
            <HStack>
              <Avatar ml={2} mt={5} mr={5} size='2xl' source={{ uri: 'https://avatars.githubusercontent.com/u/72632169?v=4'}}/>
              <Avatar ml={2} mt={5} size='2xl' source={{ uri: 'https://avatars.githubusercontent.com/u/72632169?v=4'}}/>
            </HStack>
            <HStack>
              <Avatar ml={2} mt={5} mr={5} size='2xl' source={{ uri: 'https://avatars.githubusercontent.com/u/72632169?v=4'}}/>
              <Avatar ml={2} mt={5} size='2xl' source={{ uri: 'https://avatars.githubusercontent.com/u/72632169?v=4'}}/>
            </HStack>
            <HStack>
              <Avatar ml={2} mt={5} mr={5} size='2xl' source={{ uri: 'https://avatars.githubusercontent.com/u/72632169?v=4'}}/>
              <Avatar ml={2} mt={5} size='2xl' source={{ uri: 'https://avatars.githubusercontent.com/u/72632169?v=4'}}/>
            </HStack>
            <HStack>
              <Avatar ml={2} mt={5} mr={5} size='2xl' source={{ uri: 'https://avatars.githubusercontent.com/u/72632169?v=4'}}/>
              <Avatar ml={2} mt={5} size='2xl' source={{ uri: 'https://avatars.githubusercontent.com/u/72632169?v=4'}}/>
            </HStack>

          </VStack>
      </ScrollView>
    </VStack>
  );
}
