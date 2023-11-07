import { VStack, Text, Button } from "native-base";
import { Titulo } from "./components/titulo";

export default function Login() {
  return (
    <VStack flex={1} alignItems="center" p={5} justifyContent="center">
      <Titulo> Faça login em sua conta </Titulo>
    </VStack>
  );
}
