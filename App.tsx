<<<<<<< HEAD
import Login from "./src/Login";
import UserContext from "./src/UserContext";
import AuthContext from "./src/AuthContext";
import Cadastro from "./src/Cadastro";
import { NativeBaseProvider, StatusBar } from "native-base";
import "expo-dev-client";
import auth from "@react-native-firebase/auth";
import React, { useState, useEffect } from "react";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

import { TEMAS } from "./src/estilos/temas";

export default function App() {
  type User = {
    displayName: string;
    photoURL: string;
    // include other properties as needed
  };
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  GoogleSignin.configure({
    webClientId:
      "102409683902-hgv4s6o0j2e1ab34s7gv0qvpg5otj6dg.apps.googleusercontent.com",
  });

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
    user_sign_in
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };

  if (initializing) return null;
  if (!user) {
    return (
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
    );
  }
  return (
    <NativeBaseProvider theme={TEMAS}>
      <StatusBar backgroundColor={TEMAS.colors.green[500]} />
      <UserContext.Provider value={user}>
        <AuthContext.Provider value={{ signOut }}>
          <Cadastro />
        </AuthContext.Provider>
      </UserContext.Provider>
    </NativeBaseProvider>
  );
}
=======
import Login from "./src/Login";
import UserContext from "./src/UserContext";
import AuthContext from "./src/AuthContext";
import Cadastro from "./src/Cadastro";
import { NativeBaseProvider, StatusBar } from "native-base";
import "expo-dev-client";
import auth from "@react-native-firebase/auth";
import React, { useState, useEffect } from "react";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

import { TEMAS } from "./src/estilos/temas";

export default function App() {
  type User = {
    displayName: string;
    photoURL: string;
    // include other properties as needed
  };
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState<User | null>(null);

  GoogleSignin.configure({
    webClientId:
      "102409683902-hgv4s6o0j2e1ab34s7gv0qvpg5otj6dg.apps.googleusercontent.com",
  });

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
    user_sign_in
      .then((user) => {
        console.log(user);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signOut = async () => {
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
    } catch (error) {
      console.error(error);
    }
  };

  if (initializing) return null;
  if (!user) {
    return (
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
    );
  }
  return (
    <NativeBaseProvider theme={TEMAS}>
      <StatusBar backgroundColor={TEMAS.colors.green[500]} />
      <UserContext.Provider value={user}>
        <AuthContext.Provider value={{ signOut }}>
          <Cadastro />
        </AuthContext.Provider>
      </UserContext.Provider>
    </NativeBaseProvider>
  );
}
>>>>>>> 686f5f2b3d9f3f4b5965717d9fafde7c48a7eb06
