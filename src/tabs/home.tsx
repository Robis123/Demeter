import { HStack, Text, ScrollView, Avatar, VStack} from "native-base";
import { EntradaTexto } from "../components/entradaTexto";
export default function Home() {
  return (
    <VStack flex={1} alignItems='center' p={5}>
        <EntradaTexto label=" " placeholder="Pesquise a categoria"/>
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
          <VStack flex={2} p={5}>
            <HStack>
              <Avatar ml={2} mt={5} mr={5} size='2xl' />
              <Avatar ml={2} mt={5} size='2xl' />
            </HStack>
            <HStack>
              <Avatar ml={2} mt={5} mr={5} size='2xl' />
              <Avatar ml={2} mt={5} size='2xl' />
            </HStack>
            <HStack>
              <Avatar ml={2} mt={5} mr={5} size='2xl' />
              <Avatar ml={2} mt={5} size='2xl' />
            </HStack>
            <HStack>
              <Avatar ml={2} mt={5} mr={5} size='2xl' />
              <Avatar ml={2} mt={5} size='2xl' />
            </HStack>
            <HStack>
              <Avatar ml={2} mt={5} mr={5} size='2xl' />
              <Avatar ml={2} mt={5} size='2xl' />
            </HStack>
            <HStack>
              <Avatar ml={2} mt={5} mr={5} size='2xl' />
              <Avatar ml={2} mt={5} size='2xl' />
            </HStack>

          </VStack>
      </ScrollView>
    </VStack>
  );
}
