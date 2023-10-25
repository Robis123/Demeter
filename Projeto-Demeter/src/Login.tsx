import React from "react";
import { View, Image, Text, StyleSheet } from "react-native";
import logo from "./assets/logo.png";
import bg from "./assets/bg.png";

export default function Login() {
  return (
    <View style={styles.container}>
      <Image source={bg} style={styles.backgroundImage} />
      <Image source={logo} style={styles.logo} />
      <View style={styles.content}>
        {/* <Text// style={styles.text}>Faça Login em sua conta</Text> */}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  text: {
    marginTop: 180, // Ajuste essa propriedade para mover o texto para baixo
  },
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  backgroundImage: {
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    height: "180%",
  },
  content: {
    alignItems: "center",
  },
  logo: {
    width: 335,
    height: 335,
    top: 140,
    resizeMode: 'contain', // Redimensionar a imagem para caber no contêiner
    marginLeft: 1, // Ajustar a margem esquerda
    marginRight: 1, // Ajustar a margem direita
  },
});
