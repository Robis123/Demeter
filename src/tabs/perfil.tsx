import React, { useContext, useEffect, useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, FlatList, Alert, ImageURISource, ImageRequireSource } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { db } from "../firebase/firebase.js";
import { collection, getDocs, query, where, doc, getDoc, updateDoc } from "firebase/firestore";
import { AuthContext } from '../context/authContext';
import UserContext from "../context/userContext";
import img from '../assets/Morango.png';


const Stack = createNativeStackNavigator();

const PerfilScreen = ({ navigation }) => {
  type ImageSourcePropType = ImageURISource | ImageURISource[] | ImageRequireSource;
  interface ImageURISource {
   
    uri?: string | undefined;
  }
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
          onPress={() => 'https://firebasestorage.googleapis.com/v0/b/demeter-2a73f.appspot.com/o/11.111.1231234-99%2F323494.pdf?alt=media&token=a1bc5baf-bd0e-4018-a64a-dbe1ebb227c4'}
        >
          <Ionicons name="clipboard" size={24} color="#fff" />
          <Text style={styles.buttonText}>Notas</Text>
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
        />
      ) : (
        <Text>Nenhum produto cadastrado.</Text>
      )}
    </View>
  );
};

const NotasScreen = () => (
  <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
    <Text>Notas Screen</Text>
    
    
    {/* Adicione aqui a lógica para mostrar as notas do usuário */}
  </View>
);

const PerfilStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Perfil" component={PerfilScreen} />
    <Stack.Screen name="Produtos" component={ProdutosScreen} />
    <Stack.Screen name="Notas" component={NotasScreen} />
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
});

export default PerfilStack;
