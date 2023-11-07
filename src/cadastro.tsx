import { Box, Radio, ScrollView } from "native-base";
import { Titulo } from "./components/titulo";
import { EntradaTexto } from "./components/entradaTexto";
import { Botao } from "./components/botao";
import { useState } from "react";
import { secoes } from "./utils/cadastroEntradaTexto";

export default function Cadastro({ navigation }) {
  const [numSecao, setNumSecao] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null); // Adicione esta linha

  function avancarSecao() {
    if (numSecao < secoes.length - 1) {
      setNumSecao(numSecao + 1);
    }
  }

  function voltarSecao() {
    if (numSecao > 0) {
      setNumSecao(numSecao - 1);
    }
  }
  return (
    <ScrollView flex={1}>
      <Titulo alignItems="center" p={5} justifyContent="center">
        {" "}
        {secoes[numSecao].titulo}{" "}
      </Titulo>
      <Box
        mt={1}
        mb={0}
        alignItems="center"
        pr={5}
        pl={5}
        justifyContent="center"
      >
        {secoes[numSecao]?.entradaTexto?.map((entrada) => {
          return (
            <EntradaTexto
              label={entrada.label}
              placeholder={entrada.placeholder}
              key={entrada.id}
            />
          );
        })}
      </Box>
      <Box alignItems="center" justifyContent="center">
        {secoes[numSecao].checkbox.map((checkbox) => {
          return (
            <Radio.Group
              name="myRadioGroup"
              mb={5}
              key={checkbox.id}
              value={selectedValue} // Use o estado selectedValue aqui
              onChange={setSelectedValue} // Adicione esta linha
            >
              <Radio value={checkbox.value}> {checkbox.value} </Radio>

            </Radio.Group>
          );
        })}
      </Box>
      <Box mt={0} alignItems="center" p={5} justifyContent="center">
        {numSecao > 0 && (
          <Botao onPress={() => voltarSecao()} bgColor="gray.400">
            Voltar
          </Botao>
        )}
        {numSecao >= 0 && numSecao < 2 && (
          <Botao onPress={() => avancarSecao()} bgColor="blue.400">
            Avançar
          </Botao>
        )}
        {numSecao >= 2 && (
          <Botao onPress={() => navigation.navigate("Tabs")} bgColor="blue.400">
            Cadastrar
          </Botao>
        )}
      </Box>
    </ScrollView>
  );
}
