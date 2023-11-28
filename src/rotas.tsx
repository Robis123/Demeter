import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { addDoc, collection, db } from "./firebase/firebase.js";
import { AuthContext } from './context/authContext';
import { getAuth, onAuthStateChanged  } from "firebase/auth";
import { TextInputMask } from 'react-native-masked-text';
import { getDocs, query, where } from "firebase/firestore";
import Cadastro from "./cadastro";
import primeirologin from './cadastro';
import Tabs from "./tabs";
import TabsVarejista from './tabsVarejista';
import UserContext from "./context/userContext";



const Tab = createNativeStackNavigator();


export default function Rotas() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen
          name="Cadastro"
          component={Cadastro}
          options={{ headerShown: false }}
        />
        <Tab.Screen
          name="Tabs"
          component={Tabs}
          options={{ headerShown: false }}
        /> 
        <Tab.Screen
          name="TabsVarejista"
          component={TabsVarejista}
          options={{ headerShown: false }}
        /> 
      </Tab.Navigator>
    </NavigationContainer>
  );
}