import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Cadastro from "./Cadastro";
import Perfil from './perfil'

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
          name="Perfil"
          component={Perfil}
          options={{ headerShown: false }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
