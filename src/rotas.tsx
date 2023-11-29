import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Cadastro from "./cadastro";
import Tabs from "./tabs";
import TabsVarejista from './tabsVarejista';
import { collection, getDocs, query, where } from "firebase/firestore";
import UserContext from "./context/userContext";
import React, { useEffect, useState, useContext } from "react";
import { db } from "./firebase/firebase";

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