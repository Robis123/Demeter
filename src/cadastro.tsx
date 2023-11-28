import { Button, TextInput, RadioButton } from "react-native-paper";
import { KeyboardAvoidingView, Platform, StyleSheet, Keyboard, View, Text, ScrollView } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { addDoc, collection, db } from "./firebase/firebase.js";
import { AuthContext } from './context/authContext';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { TextInputMask } from 'react-native-masked-text';
import { getDocs, query, where } from "firebase/firestore";
import UserContext from "./context/userContext";


export default function Cadastro({ navigation }) {
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cnpj, setCnpj] = useState("");
  const [telefone, setTelefone] = useState("");
  const [email, setEmail] = useState("");
  const [emailGoogle, setEmailGoogle] = useState("");
  const [inscricaoEstadual, setInscricaoEstadual] = useState("");
  const [endereco, setEndereco] = useState("");
  const [bairroDistrito, setBairroDistrito] = useState("");
  const [cep, setCep] = useState("");
  const [cidade, setCidade] = useState("");
  const [uf, setUf] = useState("");
  const [international, setInternational] = useState("");
  const { signOut } = useContext(AuthContext);
  const [tipoUsuario, setTipoUsuario] = useState("");
  const user = React.useContext(UserContext);


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

  const firstLogin = async() => { 
    const q = query(collection(db, "usuarios"), where("email", "==", user.email));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
    // doc.data() is never undefined for query doc snapshots
    console.log(doc.id, " => ",doc.data());
      
    if (doc.exists()){
      const data = doc.data();
      console.log('usuario já cadastrado') 
      if(data.tipoUsuario === 'produtor'){
        console.log('leva pra tela produtor')
        navigation.navigate('Tabs');
        console.log('cu')
      }
      console.log('usuario já cadastrado2s') 
      if(data.tipoUsuario === 'varejista'){
        console.log('leva pra tela varejista')
        navigation.navigate('TabsVarejista');
      }
      else{
        navigation.navigate('Cadastro')
      }
    } else {
      console.log("usuario não cadastrado");
    }
    });
  }

  const addVarejista = async () => {
    try {
      const docRef = await addDoc(collection(db, 'usuarios'), {
        nome,
        cpf,
        cnpj,
        telefone,
        email: user.email,
        inscricaoEstadual,
        endereco,
        bairroDistrito,
        cep,
        cidade,
        uf,
        tipoUsuario
      });
      navigation.navigate('TabsVarejista');
      console.log("Document written with ID: ", docRef.id);
    }catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const addProdutor = async () => {
    try {
      const docRef = await addDoc(collection(db, "usuarios"), {
        nome,
        cpf,
        cnpj,
        telefone,
        email: user.email,
        inscricaoEstadual,
        endereco,
        bairroDistrito,
        cep,
        cidade,
        uf,
        tipoUsuario
      });

      navigation.navigate('Tabs');
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  firstLogin();
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
            <Text style={styles.userTypeText}>Selecione o tipo de usuário:</Text>
            <RadioButton.Group
              onValueChange={(value) => setTipoUsuario(value)}
              value={tipoUsuario}
            >
              <View style={styles.radioButtonContainer}>
                <Text>Produtor</Text>
                <RadioButton value="produtor" />
              </View>
              <View style={styles.radioButtonContainer}>
                <Text>Varejista</Text>
                <RadioButton value="varejista" />
              </View>
            </RadioButton.Group>

            {tipoUsuario === 'produtor' && (
              <>
                <TextInputMask
                  style={styles.input}
                  type={'custom'}
                  options={{
                    mask: '*******************'
                  }}
                  placeholder="Nome"
                  value={nome}
                  onChangeText={(text) => {
                    // Limita o texto a 50 caracteres
                    if (text.length <= 50) {
                      setNome(text);
                    }
                  }}
                  maxLength={50}
                />
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
                <TextInputMask
                  style={styles.input}
                  type={'only-numbers'}
                  maxLength={9}
                  placeholder="Inscrição Estadual"
                  value={inscricaoEstadual}
                  onChangeText={(text) => setInscricaoEstadual(text)}
                />
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
                <TextInputMask
                  style={styles.input}
                  type={'zip-code'}
                  value={cep}
                  onChangeText={(text) => setCep(text)}
                  placeholder="CEP"
                  keyboardType="numeric"
                />
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

                  }}
                >
                  Cadastrar
                </Button>
              </>
            )}
            {tipoUsuario === 'varejista' && (
              <>
                <Button
                  style={styles.button}
                  mode="contained"
                  onPress={() => { addVarejista(); }
                  }
                >
                  Cadastrar
                </Button>
              </>
            )}

            <Button style={styles.button} onPress={signOut}>
              Sign Out
            </Button>
          </View>
        </ScrollView>
      </View>
    </KeyboardAvoidingView>
  );
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
    padding: 10,
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
  userTypeText: { // Adicione esta linha
    marginBottom: 10,
    fontSize: 16,
    fontWeight: "bold",
  },
  radioButtonContainer: { // Adicione esta linha
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },

});
