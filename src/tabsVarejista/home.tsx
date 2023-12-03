import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, TextInput } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import UserContext from '../context/userContext';
import { collection, getDocs, query, where } from "firebase/firestore";
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { db } from "../firebase/firebase.js";

const Stack = createNativeStackNavigator();

const PerfilProdutoresScreen = ({ navigation }) => {
  const user = React.useContext(UserContext);
  const [produtos, setProdutos] = useState([]);
  const [produtores, setProdutores] = useState([]);
  const [filtroProduto, setFiltroProduto] = useState('');

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

  const getProdutores = async () => {
    try {
      const produtosRef = collection(db, 'usuarios');
      let q;
  
      if (filtroProduto) {
        // Se houver um filtro de produto, filtre por produto e tipo de usuário
        q = query(
          produtosRef,
          where('tipoUsuario', '==', 'produtor'),
          where('produtos', 'array-contains', filtroProduto)
        );
      } else {
        // Se não houver um filtro de produto, apenas filtre por tipo de usuário
        q = query(produtosRef, where('tipoUsuario', '==', 'produtor'));
      }
  
      const querySnapshot = await getDocs(q);
  
      const produtosData = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data();
        produtosData.push(data);
      });
      setProdutores(produtosData);
    } catch (error) {
      console.error("Erro ao obter produtores:", error);
    }
  };
  

  useEffect(() => {
    getProdutores();
  }, [user]);

  useEffect(() => {
    getProdutos();
  }, [user]);

  const renderItem = ({ item }) => (
    <View>
      <View style={styles.cardProdutores}>
        <Text style={styles.text}>Nome: {item.nome}</Text>
        <Text style={styles.text}>Localização: {item.uf}</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => {
            navigation.navigate('ProdutosProdutor', {
              produtor: item,
            });
          }}
        >
          <Ionicons name="chatbubble-ellipses-outline" size={24} color="#fff" />
          <Text style={styles.buttonText}>Conversar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.subtitle}>Pesquise o produto desejado e será filtrado os produtores correspondentes:</Text>

      <TextInput
        style={styles.input}
        placeholder="Digite sua pesquisa..."
        value={filtroProduto}
        onChangeText={(text) => setFiltroProduto(text)}
      />

      <Text style={styles.title}>Produtores:</Text>
      {produtores.length > 0 ? (
        <FlatList
          data={produtores}
          keyExtractor={(item) => item.id}
          renderItem={renderItem}
          showsVerticalScrollIndicator={false}

        />
      ) : (
        <Text>Nenhum produtor cadastrado.</Text>
      )}
    </View>
  );
}

const ProdutorProdutosScreen = ({ route }) => {
  const { produtor } = route.params;
  const [produtosDoProdutor, setProdutosDoProdutor] = useState([]);

  useEffect(() => {
    const getProdutosDoProdutor = async () => {
      try {
        const produtosRef = collection(db, 'usuarios');
        const q = query(produtosRef, where('email', '==', produtor.email));
        const querySnapshot = await getDocs(q);

        const produtosData = [];
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          produtosData.push(...data.produtos);
        });
        setProdutosDoProdutor(produtosData);
      } catch (error) {
        console.error('Erro ao obter produtos do produtor:', error);
      }
    };

    getProdutosDoProdutor();
  }, [produtor]);

  const renderItemProdutos = ({ item }) => (
    <View>
      <View style={styles.cardProdutos}>
        <Text style={styles.text}>Produto: {item.produto}</Text>
        <Text style={styles.text}>Quantidade: {item.quantidade}</Text>
      </View>
    </View>
  );

  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <View style={{ alignItems: 'center', marginTop: 30, borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8, padding: 20}}>
        <Text style={{fontSize: 24, fontWeight: 'bold', textAlign: 'center', marginBottom: 5,}}>Produtor:</Text>
        <Text style={styles.text}>{produtor.nome}</Text>
        <Text style={styles.title}>Contato:</Text>
        <Text style={styles.text}>{produtor.email}</Text>
        <Text style={styles.text}>{produtor.telefone}</Text>
      </View>
      <View style={{ flex: 1, alignItems: 'center' }}>
        <Text style={styles.title}>Produtos:</Text>
          {produtosDoProdutor.length > 0 ? (
            <FlatList
              data={produtosDoProdutor}
              keyExtractor={(item) => item.id}
              renderItem={renderItemProdutos}
              showsVerticalScrollIndicator={false}

            />
          ) : (
            <Text>Nenhum produto cadastrado para este produtor.</Text>
          )}
      </View>
    </View>
  );
};

const VarejistaStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="ListaProdutores" component={PerfilProdutoresScreen} options={{ headerTransparent: true, headerTitle: '' }} />
    <Stack.Screen name="ProdutosProdutor" component={ProdutorProdutosScreen} options={{ headerTransparent: true, headerTitle: '' }} />
  </Stack.Navigator>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'stretch',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    textAlign: 'center',
    marginBottom: 5,
  },
  textContainer: {
    alignItems:'center',
    margin: 10,
  },
  addButton: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#4FAF5A',
    borderRadius: 10,
    width: '80%',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
    fontSize: 18,
  },
  cardProdutos: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 20,
    paddingHorizontal:100,
    width: '100%',
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  cardProdutores: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    width: '90%',
    marginLeft: 20,
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  text: {
    fontSize: 20,
    marginVertical: 2,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: '80%',
    alignSelf: 'center',
  },
  subtitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#808080',
    alignSelf: 'center',
  },
});

export default VarejistaStack;
