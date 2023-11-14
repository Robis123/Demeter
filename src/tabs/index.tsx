import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import Ionicons from 'react-native-vector-icons/Ionicons'

import Home from "./home";
import Perfil from "./perfil";
import Nfs from "./consulta";
import React from "react";

const Tab = createBottomTabNavigator();

const screenOptions = {
  tabBarStyle: {
    backgroundColor: '#fff'
  },
  tabBarActiveTintColor: '#4FAF5A',
  tabBarInactiveTintColor: '#000'
}

const tabs = [
  {
    id: 1,
    name: 'Home', 
    component: Home,
    icon: 'home'
  },
  {
    id: 2,
    name: 'NFs', 
    component: Nfs,
    icon: 'calendar'
  },
  {
    id: 3,
    name: 'Perfil', 
    component: Perfil,
    icon: 'person'
  },

]
export default function Tabs() {
  return (
    <Tab.Navigator screenOptions={screenOptions}>
    { tabs.map((tab) => (
      <Tab.Screen
        key={tab.id}
        name={tab.name}
        component={tab.component}
        options={{
          headerShown: false,
          tabBarIcon: ({color, size}) => (<Ionicons name={tab.icon} color={color} size={size}/>),
        }}
      />
    ))}
    </Tab.Navigator>
  );
}
