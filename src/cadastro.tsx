import { Button, TextInput } from "react-native-paper";
import { KeyboardAvoidingView, Platform, Keyboard } from 'react-native';
import { StyleSheet, View, Text, ScrollView } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { addDoc, collection, db } from "./firebase/firebase.js";
import { AuthContext } from './context/authContext';
import { TextInputMask } from 'react-native-masked-text';

export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [inscricaoEstadual, setInscricaoEstadual] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairroDistrito, setBairroDistrito] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [international, setInternational] = useState("");
  const { signOut } = useContext(AuthContext);

  const { register, handleSubmit } = useForm();

  useEffect(() => {
    register("nome");
    register("cpfCnpj");
    register("telefone");
    register("email");
    register("inscricaoEstadual");
    register("endereco");
    register("bairroDistrito");
    register("cep");
    register("cidade");
    register("uf");
  }, [register]);

  const addProdutor = async () => {
    try {
      const docRef = await addDoc(collection(db, "produtores"), {
        nome,
        cpf,
        cnpj,
        telefone,
        email,
        inscricaoEstadual,
        endereco,
        bairroDistrito,
        cep,
        cidade,
        uf
      });

      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
      keyboardVerticalOffset={-254}
    >
      <View style={styles.scrollViewContainer}>
        <Text style={styles.text}>Cadastro de dados</Text>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode='on-drag'
        >
          <View style={styles.innerContainer}>
          <TextInputMask
            style={styles.input}
            type={'custom'}
            options={{
              mask: '*******************'
            }}
            placeholder="Nome"
            value={nome}
            onSubmitEditing={addProdutor}
            onChangeText={(text) => {
              // Limita o texto a 50 caracteres
              if (text.length <= 50) {
                setNome(text);
              }
            }}
            maxLength={50}
          />
          {/* <TextInput
            style={styles.input}
            label="CPF/CNPJ"
            value={cpf}
            onChangeText={(text) => setCpf(text)}
          /> */}
          <TextInputMask
            style={styles.input}
            type={'cnpj'}
            value={cnpj}
            onChangeText={(text) => setCnpj(text)}
            placeholder="CNPJ"
            keyboardType="numeric"
          />
          <TextInputMask
            style={styles.input}
            type={'cel-phone'}
            options={{
              maskType: 'BRL',
              withDDD: true,
              dddMask: '(99)'
            }}
            placeholder="Telefone"
            value={international}
            onSubmitEditing={addProdutor}
            onChangeText={text => {
              setInternational(text);
            }}
          />
          {/* <TextInput
            style={styles.input}
            label="Inscrição Estadual"
            value={inscricaoEstadual}
            onChangeText={(text) => setInscricaoEstadual(text)}
          /> */}
          <TextInputMask
            style={styles.input}
            type={'only-numbers'}
            maxLength={9}
            placeholder="Inscrição Estadual"
            value={inscricaoEstadual}
            onChangeText={(text) => setInscricaoEstadual(text)}
          />
          {/* <TextInput
            style={styles.input}
            label="Endereço"
            value={endereco}
            onChangeText={(text) => setEndereco(text)}
          /> */}
          <TextInputMask
            style={styles.input}
            type={'custom'}
            options={{
              mask: '********************************'
            }}
            placeholder="Endereço"
            value={endereco}
            onChangeText={(text) => setEndereco(text)}
          />
          {/* <TextInput
            style={styles.input}
            label="Bairro ou Distrito"
            value={bairroDistrito}
            onChangeText={(text) => setBairroDistrito(text)}
          /> */}
          <TextInputMask
            style={styles.input}
            type={'custom'}
            options={{
              mask: '********************************'
            }}
            placeholder="Bairro ou Distrito"
            value={bairroDistrito}
            onChangeText={(text) => setBairroDistrito(text)}
          />
          {/* <TextInput
            style={styles.input}
            label="CEP"
            value={cep}
            onChangeText={(text) => setCep(text)}
          /> */}
          <TextInputMask
            style={styles.input}
            type={'zip-code'}
            value={cep}
            onChangeText={(text) => setCep(text)}
            placeholder="CEP"
            keyboardType="numeric"
          />
          {/* <TextInput
            style={styles.input}
            label="Cidade"
            value={cidade}
            onChangeText={(text) => setCidade(text)}
          /> */}
          <TextInputMask
            style={styles.input}
            type={'custom'}
            options={{
              mask: '*******************'
            }}
            placeholder="Cidade"
            value={cidade}
            onChangeText={(text) => setCidade(text)}
          />
          {/* <TextInput
            style={styles.input}
            label="UF"
            value={uf}
            onChangeText={(text) => setUf(text)}
          /> */}
          {/* <TextInput
            style={styles.input}
            label="UF"
            value={uf}
            maxLength={2}
            onChangeText={(text) => setUf(text.toUpperCase())}
          /> */}
          <TextInputMask
            style={styles.input}
            type={'custom'}
            options={{
              mask: 'AA'
            }}
            placeholder="UF"
            value={uf}
            onChangeText={(text) => setUf(text.toUpperCase())}
          />
          <Button
            style={styles.button}
            mode="contained"
            onPress={() => {
              addProdutor();
              navigation.navigate("Tabs");
            }}
          >
            Cadastrar
          </Button>
          <Button style={styles.button} onPress={signOut}>
            Sign Out
          </Button>
        </View>
      </ScrollView>
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
  },
  scrollViewContainer: {
    flex: 1,
    width: '100%',
  },
  innerContainer: {
    width: '100%',
    paddingHorizontal: 16,
    alignItems: 'center',
  },
  text: {
    marginTop: 20,
    marginBottom: 20,
    fontSize: 25,
    fontWeight: "bold",
    textAlign: 'center', // Adicione esta linha
  },
  input: {
    width: "100%",
    marginBottom: 10,
    height: 40,
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  button: {
    width: '100%',
    height: 65,
    marginBottom: 20,
    padding:10,
  },
  scrollView: {
    flex: 1,
    width: '100%',
  },
  scrollViewContent: {
    flexGrow: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});


