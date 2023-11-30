import { Button, RadioButton } from "react-native-paper";
import { KeyboardAvoidingView, Platform, StyleSheet, View, Text, ScrollView } from "react-native";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { addDoc, collection, db } from "./firebase/firebase.js";
import { AuthContext } from './context/authContext';
import { TextInputMask } from 'react-native-masked-text';
import { doc, getDocs, query, setDoc, where } from "firebase/firestore";
import UserContext from "./context/userContext";
import {cadastradoSucesso, Toast} from "./utils/alerts";


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
  const { signOut } = useContext(AuthContext);
  const [tipoUsuario, setTipoUsuario] = useState("");
 
 
 
  const user = React.useContext(UserContext);

  

  const firstLogin = async() => { 
    const q = query(collection(db, "usuarios"), where("email", "==", user.email));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0];
        const data = doc.data();

        console.log(doc.id, " => ", data);

        if (data.tipoUsuario === 'produtor') {
          console.log('usuario já cadastrado como produtor');
          navigation.navigate('Tabs');
          return
        } else if (data.tipoUsuario === 'varejista') {
          console.log('usuario já cadastrado como varejista');
          navigation.navigate('TabsVarejista');
          return
        }
      } else {
        console.log("usuario não cadastrado");
        navigation.navigate('Cadastro');
        return
      }
  }

  useEffect(() => {
    // write your code here, it's like componentWillMount
    firstLogin();
    
}, [])





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
        tipoUsuario,
        produtos: [] 
      });
      navigation.navigate('TabsVarejista');
      console.log("Document written with ID: ", docRef.id);
    }catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  const addProdutor = async () => {
    try {
      // Defina o ID personalizado (substitua 'ID_PERSONALIZADO' pelo ID desejado)
      const docRef = await setDoc(doc(db, "usuarios", user.uid), {
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
      console.log("Document written with ID: " + user.uid);
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
                  value={telefone}
                  onSubmitEditing={addProdutor}
                  onChangeText={text => {
                    setTelefone(text);
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
                    cadastradoSucesso();
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
                  onPress={() => { addVarejista(); cadastradoSucesso();}
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
        <Toast/>
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
    width: '45%',
    height: 60,
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
