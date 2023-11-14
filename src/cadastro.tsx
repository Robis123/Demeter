import { Box, Radio, ScrollView } from "native-base";
import { Titulo } from "./components/titulo";
import { EntradaTexto } from "./components/entradaTexto";
import { Botao } from "./components/botao";
import { useEffect, useState } from "react";
import { secoes } from "./utils/cadastroEntradaTexto";
import UserContext from "./context/userContext";
import React from "react";
import { useForm } from "react-hook-form";
import { Button, TextInput } from "react-native-paper";
import { KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { StyleSheet, View, Image, Text } from "react-native";
import { app, db, getFirestore, collection, addDoc } from "./firebase/firebase.js"
import { useContext } from 'react';


export default function Cadastro({ navigation }) {
  const user = React.useContext(UserContext);
  const [numSecao, setNumSecao] = useState(0);
  const [selectedValue, setSelectedValue] = useState(null); // Adicione esta linha


  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

  const { register, handleSubmit, setValue } = useForm();

  React.useEffect(() => {
    register("nome");
    register("cpfCnpj");
    register("telefone");
    register("email");
  }, [register]);


  // Essa função aqui que vai adicionar os elementos em uma coleção do banco de dados, no caso dessa, produtores
  const addProdutor = async () => {

    try {
      const docRef = await addDoc(collection(db, "produtores"), {
        nome: nome,
        cpf: cpf,
        cnpj: cnpj,
        telefone: telefone,
        email: email
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  }

  return (
    <KeyboardAvoidingView
    style={styles.container}
    behavior={Platform.OS === "ios" ? "padding" : "height"}
    enabled
    keyboardVerticalOffset={-254}
  >
    <View style={[styles.container, styles.innerContainer]}>
      <Text style={styles.text}>Cadastro de dados</Text>
      <TextInput
        style={styles.input}
        label="Nome"
        value={nome}
        onSubmitEditing={addProdutor}
        onChangeText={(text) => {
          // Limita o texto a 50 caracteres
          if (text.length <= 50) {
            setNome(text);
          }
        }}
        maxLength={50} // Define o limite de caracteres
      />
      <TextInput
        style={styles.input}
        label="CPF/CNPJ"
      // Não coloquei aqui pq tem q resolver ainda se vai ser cpf e cnpj e um campo só (usando máscaras), 
      // ou separados
      />
      <TextInput
        style={styles.input}
        label="Numero"
        value={formatPhoneNumber(telefone)}
        onSubmitEditing={addProdutor}
        onChangeText={(text) => setTelefone(text)}
        keyboardType="numeric"
      />
      <TextInput
        style={styles.input}
        label="Email"
        value={email}
        onSubmitEditing={addProdutor}
        onChangeText={(text) => setEmail(text)}
      />
      <Button
        style={styles.button}
        mode="contained"
        onPress={addProdutor}
      >
        Cadastrar
      </Button>
      <Button style={styles.button}>
        Sign Out
      </Button>
    </View>
  </KeyboardAvoidingView>
  );
}
function keyboard() {
  const [keyboardHeight, setKeyboardHeight] = useState(0);

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      (event) => {
        // Obtém a altura do teclado do evento
        setKeyboardHeight(event.endCoordinates.height);
      }
    );

    // Remove o listener quando o componente é desmontado
    return () => {
      keyboardDidShowListener.remove();
    };
  }, []);
  console.log(keyboardHeight * (-1))
  return keyboardHeight; // Retorna a altura do teclado
}

function formatPhoneNumber(value) {
  if (!value) return value;
  const phoneNumber = value.replace(/[^\d]/g, '');
  const phoneNumberLength = phoneNumber.length;

  if (phoneNumberLength <= 2) return phoneNumber; // Trata números com até 2 dígitos

  if (phoneNumberLength <= 7) {
    return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}`;
  }

  return `(${phoneNumber.slice(0, 2)}) ${phoneNumber.slice(2, 7)}-${phoneNumber.slice(7, 11)}`;
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  innerContainer: {
    top: 140,
    width: '100%', // Ocupa toda a largura do dispositivo
    paddingHorizontal: 5, // Adiciona um espaçamento nas laterais
    alignItems: 'center',
  },
  image: {
    marginBottom: 20,
    borderRadius: 100,
  },
  text: {
    marginBottom: 100,
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    marginBottom: 10,
  },
  button: {
    width: '100%',
    height: 65,
    marginBottom: 250,
  },
});