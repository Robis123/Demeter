import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,ScrollView, FlatList,KeyboardAvoidingView, Platform, Alert, Linking } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { db } from "../firebase/firebase.js";
import { collection, getDocs, query, where, doc, getDoc, updateDoc, setDoc } from "firebase/firestore";
import { AuthContext } from '../context/authContext';
import UserContext from "../context/userContext";
import { Button, RadioButton } from "react-native-paper";
import { TextInputMask } from 'react-native-masked-text';
import {cadastradoAtualizadoSucesso, Toast} from "../utils/alerts";
import { useForm } from "react-hook-form";

const Stack = createNativeStackNavigator();

const PerfilScreen = ({ navigation }) => {
  const user = React.useContext(UserContext);
  const { signOut } = useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 20 }}>Perfil</Text>
      
      <View style={styles.profileContainer}>
        <Image source={{ uri: user.photoURL }} style={styles.profileImage} />
        <Text style={styles.displayName}>{user.displayName}</Text>
      </View>
      
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Produtos')}
        >
          <Ionicons name="pricetags" size={24} color="#fff" />
          <Text style={styles.buttonText}>Produtos</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Notas')}>
          <Ionicons name="clipboard" size={24} color="#fff" />
          <Text style={styles.buttonText}>Notas</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('Dados')}
        >
          <Ionicons name="pencil" size={24} color="#fff" />
          <Text style={styles.buttonText}>Alterar Dados</Text>
        </TouchableOpacity>
        
        <TouchableOpacity
          style={styles.button}
          onPress={signOut}
        >
          <Ionicons name="log-out" size={24} color="#fff" />
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ProdutosScreen = () => {
  const user = useContext(UserContext);
  const [produtos, setProdutos] = useState([]);
  const alertRef = React.createRef();

  const images = {
    banana: require('../assets/Banana.png'),
    maca: require('../assets/Maça.png'),
    pera: require('../assets/Pera.png'),
    soja: require('../assets/Soja.png'),
    trigo: require('../assets/Trigo.png'),
    uva: require('../assets/Uva.png'),
    morango: require('../assets/Morango.png'),
    milho: require('../assets/Milho.png'),
    mamão: require('../assets/Mamão.png'),
    lentilha: require('../assets/Lentilha.png'),
    leguminosas: require('../assets/Leguminosas.png'),
    hortaliças: require('../assets/Hortaliças.png'),
    'grão de bico': require('../assets/GrãodeBico.png'),
    feijao: require('../assets/Feijão.png'),
    espinafre: require('../assets/Espinafre.png'),
    ervilha: require('../assets/Ervilha.png'),
    couve: require('../assets/Couve.png'),
    cevada: require('../assets/Cevada.png'),
    cereais: require('../assets/Cereais.png'),
    centeio: require('../assets/Centeio.png'),
    brócolis: require('../assets/Brócolis.png'),
    aveia: require('../assets/Aveia.png'),
    arroz: require('../assets/Arroz.png'),
    amendoim: require('../assets/Amendoim.png'),
    alface: require('../assets/Alface.png'),
    adubo: require('../assets/Adubo.png'),
    'adubo organomineral': require('../assets/AduboOrganomineral.png'),
    'adubo orgânico': require('../assets/AduboOrganico.png'),
    'adubo mineral': require('../assets/AduboMineral.png'),
    acelga: require('../assets/Acelga.png'),
    'muda 1': require('../assets/Muda1.png'),
    'muda 2': require('../assets/Muda2.png'),
    'muda 3': require('../assets/Muda3.png'),
  };

  const getProdutos = async () => {
    try {
      const produtosRef = collection(db, 'usuarios');
      const q = query(produtosRef, where('email', '==', user.email));
      const querySnapshot = await getDocs(q);

      const produtosData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        produtosData.push(...data.produtos);
      });
      setProdutos(produtosData);
    } catch (error) {
      console.error('Erro ao obter produtos:', error);
    }
  };
  useEffect(() => {

    getProdutos();
  }, [user]);
  
  const handleDeleteProduto = async (produtoNome) => {
    try{
      const usuariosRef = doc(db, 'usuarios', user.uid);
      const usuarioDoc = await getDoc(usuariosRef);
      if (usuarioDoc.exists()) {
        const usuarioData = usuarioDoc.data();
        const produtoIndex = usuarioData.produtos.findIndex(produto => produto.produto === produtoNome);
        if (produtoIndex > -1) {
          // Remove o produto do array
          usuarioData.produtos.splice(produtoIndex, 1);
          // Atualiza o documento do usuário
          await updateDoc(usuariosRef, { produtos: usuarioData.produtos });
          // Recarrega os produtos
          getProdutos();
        }
      }
    } catch (error) {
      console.error('Erro ao excluir produto:', error);
    }
  };
  
  

  const confirmDelete = (produtoId) => {
    Alert.alert(
      'Confirmar exclusão', 
      'Tem certeza de que deseja excluir este produto?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {text: 'Excluir', onPress: () => handleDeleteProduto(produtoId)},
      ],
      {cancelable: false}
    );
  };

  const renderItem = ({ item }) => (
    
    <View style={styles.produtoContainer}>
      <Image style={{width: 75, height: 75}} source={images[item.produto.toLowerCase()]} />
      <View style={styles.textContainer}>
        <Text>Categoria: {item.categoria}</Text>
        <Text>Produto: {item.produto}</Text>
        <Text>Quantidade: {item.quantidade}</Text>
      </View>
      <TouchableOpacity onPress={() => confirmDelete(item.produto)} style={styles.deleteButton}>
        <Ionicons name="trash-bin-outline" size={20} color="#4FAF5A" />
      </TouchableOpacity>
    </View>
  ); 
  

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Meus Produtos</Text>
      {produtos.length > 0 ? (
        <FlatList
          data={produtos}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text>Nenhum produto cadastrado.</Text>
      )}
    </View>
  );
};

const NotasScreen = () => {
  const user = useContext(UserContext);
  const [urls, setUrls] = useState([]);

  const getUrls = async () => {
    try {
      const userRef = doc(db, 'usuarios', user.uid);
      const userSnap = await getDoc(userRef);
  
      if (userSnap.exists()) {
        setUrls(userSnap.data().urls);
      }
    } catch (error) {
      console.error('Erro ao obter URLs:', error);
    }
  };
  
  useEffect(() => {
    getUrls();
  }, [user]);

  const renderItem = ({ item, index }) => (
    <View>
      <Text style={styles.text}>Nota Fiscal {index + 1}</Text>
      <TouchableOpacity
        style={styles.button}
        onPress={() => Linking.openURL(item)}
      >
        <Ionicons name="document-text-outline" size={24} color="#fff" />
        <Text style={styles.buttonText}>Abrir Nota Fiscal</Text>
      </TouchableOpacity>
    </View>
  );
  
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minhas Notas Fiscais</Text>
      {urls.length > 0 ? (
        <FlatList
          data={urls}
          keyExtractor={(item, index) => index.toString()}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}
        />
      ) : (
        <Text>Nenhuma nota fiscal cadastrada.</Text>
      )}
    </View>
  );
};
  


const DadosScreen = ({navigation}) => {
  const user = React.useContext(UserContext);
  const { register, handleSubmit } = useForm();
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

  console.log('teste: ', user.tipoUsuario)
  console.log('teste2: ', user.email)
  const attProdutor = async () => {
    try {
      // Obter o documento existente do usuário
      const usuarioDocRef = doc(db, "usuarios", user.uid);
      const usuarioDoc = await getDoc(usuarioDocRef);
  
      if (usuarioDoc.exists()) {
        const usuarioData = usuarioDoc.data();
  
        // Criar um objeto apenas com os campos que você deseja atualizar
        const dadosAtualizados = {
          nome,
          cpf,
          cnpj,
          telefone,
          inscricaoEstadual,
          endereco,
          bairroDistrito,
          cep,
          cidade,
          uf,
        };
  
        // Mesclar os dados existentes com os novos dados
        const dadosCompletos = { ...usuarioData, ...dadosAtualizados };
  
        // Atualizar o documento no Firestore
        await setDoc(usuarioDocRef, dadosCompletos);
  
        navigation.navigate('Tabs');
        console.log("Document updated with ID: " + user.uid);
      }
    } catch (e) {
      console.error("Error updating document: ", e);
    }
  };

  const confirmAtt = () => {
    Alert.alert(
      'Confirmar atualização', 
      'Tem certeza de que deseja atualizar seus dados?',
      [
        {text: 'Cancelar', style: 'cancel'},
        {text: 'Atualizar', onPress: () => {
          attProdutor();
          cadastradoAtualizadoSucesso();
          setTimeout(() => {
            navigation.navigate('Perfil');
          }, 2000);
        },
      },
      ],
      {cancelable: false}
    );
  };

  return(
    // <View></View>
    <KeyboardAvoidingView
      style={styles.containerCadastro}
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      enabled
      keyboardVerticalOffset={-254}
    >
      <View style={styles.scrollViewContainer}>
        <Text style={styles.text}>Atualização de Cadastro</Text>
        <ScrollView
          style={styles.scrollView}
          contentContainerStyle={styles.scrollViewContent}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode='on-drag'
        >
          <View style={styles.innerContainer}>
              <>
                <TextInputMask
                  style={styles.input}
                  type={'custom'}
                  options={{
                    mask: '*******************'
                  }}
                  placeholder="Razão Social ou Nome"
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
                  onSubmitEditing={attProdutor}
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
                  style={styles.buttonCadastro}
                  mode="contained"
                  onPress={() => {
                    confirmAtt();
                  }}
                >
                  <Text style={styles.buttonTextCadastro}>Atualizar</Text>
                </Button>
              </>
            

          </View>
        </ScrollView>
        <Toast/>
      </View>
    </KeyboardAvoidingView>
  );
};
  


const PerfilStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Perfil" component={PerfilScreen} options={{ headerTransparent: true, headerTitle: '' }} />
    <Stack.Screen name="Produtos" component={ProdutosScreen} options={{ headerTransparent: true, headerTitle: '' }} />
    <Stack.Screen name="Notas" component={NotasScreen} options={{ headerTransparent: true, headerTitle: '' }}  />
    <Stack.Screen name="Dados" component={DadosScreen} options={{ headerTransparent: true, headerTitle: '' }} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  profileContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  displayName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  buttonContainer: {
    marginTop: 20,
    width: '80%',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#4FAF5A',
    borderRadius: 10,
    width: '100%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  produtoContainer: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
  lixeiraIcon: {
    marginLeft: 10,
  },
  textContainer: {
    margin: 10,
  },
  deleteButton: {
    marginLeft: 10,
  },
  containerCadastro: {
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
  buttonCadastro: {
    width: '45%',
    height: 60,
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#4FAF5A',
  },
  buttonTextCadastro: {
    color: '#fff',
    fontSize: 20,
    alignItems: 'center',
    justifyContent: 'center',
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

export default PerfilStack;