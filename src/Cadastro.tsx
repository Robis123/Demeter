import UserContext from "./UserContext";
import AuthContext from "./AuthContext";
import { StyleSheet, View, Image, Text } from "react-native";
import { Color, Border, FontFamily, FontSize, Padding } from "../GlobalStyles";
import {app, db, getFirestore, collection, addDoc} from "./firebase/firebase.js"
import React from "react";
import {useEffect, useState} from "react";
import { useForm } from "react-hook-form";
import { Button, TextInput } from "react-native-paper";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";



export default function Cadastro() {
  // Essas variáveis aqui são importantes pra mostrar o que o usuário está digitando no campo
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");

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

  const { signOut } = React.useContext(AuthContext);

  const user = React.useContext(UserContext);
  const { register, handleSubmit, setValue } = useForm();

  React.useEffect(() => {
    register(" nome");
    register("cpfCnpj");
    register("telefone");
    register("email");
  }, [register]);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cadastro de dados</Text>
      <TextInput
        style={styles.input}
        label="Nome"
        // Tem que colocar o value aqui 
        value={nome}
        onSubmitEditing={addProdutor}
        onChangeText={(text) => setNome(text)}
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
      <Button style={styles.button} onPress={signOut}>
        Sign Out
      </Button>
    </View>
  );
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
    width: 150,
    height: 65,
    marginBottom: 250,
  },
});
