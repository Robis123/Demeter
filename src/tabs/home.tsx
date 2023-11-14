import { HStack, Text, ScrollView, Avatar, VStack} from "native-base";
import { EntradaTexto } from "../components/entradaTexto";
import Image1 from "../assets/image1.png";
import Image2 from "../assets/image2.png";
import Image3 from "../assets/image3.png";
import Image4 from "../assets/image4.png";
import Image5 from "../assets/image5.png";
import Image6 from "../assets/image6.png";

export default function Home() {
  return (
    <VStack flex={1} alignItems='center' p={5}>
        <EntradaTexto label=" " placeholder="Pesquise a categoria"/>
      <ScrollView flex={1} showsVerticalScrollIndicator={false}>
          <VStack flex={2} p={5}>
            <HStack>
              <Avatar ml={2} mt={5} mr={5} size='2xl' source={Image1} />
              <Avatar ml={2} mt={5} size='2xl' source={Image2}/>
            </HStack>
            <HStack mt={5}>
              <Avatar ml={2} mt={5} mr={5} size='2xl' source={Image3}/>
              <Avatar ml={2} mt={5} size='2xl' source={Image4}/>
            </HStack>
            <HStack mt={5}>
              <Avatar ml={2} mt={5} mr={5} size='2xl' source={Image5}/>
              <Avatar ml={2} mt={5} size='2xl' source={Image6}/>
            </HStack>
            <HStack mt={5}>
              <Avatar ml={2} mt={5} mr={5} size='2xl'/>
              <Avatar ml={2} mt={5} size='2xl' />
            </HStack>
            <HStack mt={5}>
              <Avatar ml={2} mt={5} mr={5} size='2xl'/>
              <Avatar ml={2} mt={5} size='2xl' />
            </HStack>
            <HStack mt={5}>
              <Avatar ml={2} mt={5} mr={5} size='2xl'/>
              <Avatar ml={2} mt={5} size='2xl' />
            </HStack>

          </VStack>
      </ScrollView>
    </VStack>
  );
}
