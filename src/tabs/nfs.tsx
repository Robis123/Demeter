import React, { useContext, useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, TextInput, FlatList } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/authContext';
import UserContext from '../context/userContext';
import { collection, getDocs, query, where, doc, getDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase.js";

const NotasScreen = () => {
  const user = useContext(UserContext);
  const [valor, setValor] = useState('');
  const [produtos, setProdutos] = useState([]);

  // Função para adicionar um produto à lista
  const adicionarProduto = () => {
    // Adicione a lógica para adicionar o produto à lista
    // Você pode usar setProdutos([...produtos, { categoria: '', produto: '', quantidade: '', valor }]);
    // Certifique-se de validar os campos antes de adicionar
    console.log('produto adicionado')
  };

  // Função para emitir a nota fiscal (vamos implementar posteriormente)
  const emitirNotaFiscal = () => {
    // Adicione a lógica para emitir a nota fiscal
    // Por enquanto, podemos apenas exibir um log
    console.log('Nota Fiscal emitida:', { valor, produtos });
  };

  // Função para obter os produtos do usuário
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

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Minha Nota Fiscal</Text>
      <Text style={styles.subtitle}>Informe a quantidade e valor do produto que deseja adicionar a nota fiscal:</Text>

      {/* Lista de produtos */}
      <FlatList
        data={produtos}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={styles.produtoContainer}>
            <View style={styles.textContainer}>
              <Text>Categoria: {item.categoria}</Text>
              <Text>Produto: {item.produto}</Text>
              <Text>Quantidade: {item.quantidade}</Text>
            </View>
            <View style={styles.textContainer}>
              <TextInput
                style={styles.input}
                placeholder="Valor"
                keyboardType="numeric"
                value={valor}
                onChangeText={(text) => setValor(text)}
              />
              <TextInput
                style={styles.input}
                placeholder="Quantidade"
                keyboardType="numeric"
                value={valor}
                onChangeText={(text) => setValor(text)}
              />

              {/* Botão de adição de produto */}
              <TouchableOpacity style={styles.addButton} onPress={adicionarProduto}>
                <Ionicons name="add" size={20} color="#fff" />
                <Text style={styles.buttonText}>Adicionar Produto</Text>
              </TouchableOpacity>
            </View>
            {/* Ícone de exclusão (vamos alterar a função depois) */}
            <TouchableOpacity style={styles.deleteButton}>
              <Ionicons name="add" size={20} color="#4FAF5A" />
            </TouchableOpacity>
          </View>
        )}
      />

      {/* Campo de entrada para o valor */}

      {/* Botão para emitir a nota fiscal */}
      <TouchableOpacity style={styles.emitirButton} onPress={emitirNotaFiscal}>
        <Text style={styles.buttonText}>Emitir Nota Fiscal</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#808080',
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
  textContainer: {
    margin: 10,
  },
  deleteButton: {
    marginLeft: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    padding: 10,
    marginBottom: 10,
    width: '80%',
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
  emitirButton: {
    backgroundColor: '#4FAF5A',
    borderRadius: 10,
    padding: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    marginLeft: 10,
  },
});

export default NotasScreen;
