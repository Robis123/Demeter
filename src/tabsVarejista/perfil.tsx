import React, { useContext } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet,ScrollView, FlatList,KeyboardAvoidingView, Platform, Alert, ImageURISource, ImageRequireSource } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { AuthContext } from '../context/authContext';
import UserContext from "../context/userContext";


const Stack = createNativeStackNavigator();

const PerfilScreen = () => {
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
          onPress={signOut}
        >
          <Ionicons name="log-out" size={24} color="#fff" />
          <Text style={styles.buttonText}>Log Out</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};
const PerfilStack = () => (
  <Stack.Navigator>
    <Stack.Screen name="Perfil" component={PerfilScreen} options={{ headerTransparent: true, headerTitle: '' }} />
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