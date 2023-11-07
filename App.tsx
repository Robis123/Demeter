import { NativeBaseProvider, StatusBar, View, Text } from "native-base";
import { TEMAS } from "./src/estilos/temas";
import Rotas from "./src/rotas";
import 'expo-dev-client';
import { GoogleSignin, GoogleSigninButton } from '@react-native-google-signin/google-signin';
import React, { useState, useEffect } from 'react';
import auth from '@react-native-firebase/auth';
import Login from "./src/login";
import { AuthContext } from './src/context/authContext';
import  UserContext  from './src/context/userContext'

export default function App() {

  type User = {
    displayName: string;
    photoURL: string;
    // include other properties as needed
  };

  GoogleSignin.configure({
    webClientId: '221312520191-u7n22gjkci5o8u99ng14faaaapsg26gs.apps.googleusercontent.com',
  });

  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();

  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }

  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  const onGoogleButtonPress = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    const user_sign_in = auth().signInWithCredential(googleCredential);
    user_sign_in.then ((user) => {
      console.log(user);
    })
    .catch((error) => {
      console.log(error);
    })
  }

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
    } catch(error){
      console.error(error);
    }
  }

  if (initializing) return null;


  if (!user) {
    return(
      <NativeBaseProvider theme={TEMAS}>
      <StatusBar backgroundColor={TEMAS.colors.gray[300]} />
      <Login />
      <GoogleSigninButton
        style={{
          width: 300,
          height: 65,
          marginBottom: 250,
          marginLeft: 45,
          top: 75,
        }}
        onPress={onGoogleButtonPress}
      />
    </NativeBaseProvider>
    )
  }
  return (
    <UserContext.Provider value={user}>
      <AuthContext.Provider value={{ signOut }}>
        <NativeBaseProvider theme={TEMAS}>
          <StatusBar backgroundColor={TEMAS.colors.blue[300]} />
          <Rotas />
        </NativeBaseProvider>
      </AuthContext.Provider>
    </UserContext.Provider>
  );
}
