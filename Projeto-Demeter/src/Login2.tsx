import { VStack, Image, Text, Box, FormControl, Button } from "native-base";

import bg from "./assets/bg.png";

export default function Login() {
  return (
    <VStack flex={1} alignItems="center" p={5}>
      <Box my="250">
        <Text flex={1} alignItems="center">
          Bem vindo
        </Text>
      </Box>
    </VStack>
  );
}
