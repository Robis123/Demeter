import UserContext from "./UserContext";
import AuthContext from "./AuthContext";
import { StyleSheet, View, Image, Text } from "react-native";
import { Color, Border, FontFamily, FontSize, Padding } from "../GlobalStyles";

import React from "react";
import { useForm } from "react-hook-form";
import { Button, TextInput } from "react-native-paper";
import {
  GoogleSignin,
  GoogleSigninButton,
} from "@react-native-google-signin/google-signin";

export default function Cadastro() {
  const { signOut } = React.useContext(AuthContext);

  const user = React.useContext(UserContext);
  const { register, handleSubmit, setValue } = useForm();

  React.useEffect(() => {
    register("nome");
    register("cpfCnpj");
    register("telefone");
    register("email");
  }, [register]);

  const onSubmit = (data) => console.log(data);

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Cadastro de dados</Text>
      <TextInput
        style={styles.input}
        label={user.displayName}
        onChangeText={(text) => setValue("nome", text)}
      />
      <TextInput
        style={styles.input}
        label="CPF/CNPJ"
        onChangeText={(text) => setValue("cpfCnpj", text)}
      />
      <TextInput
        style={styles.input}
        label="Telefone"
        onChangeText={(text) => setValue("telefone", text)}
      />
      <TextInput
        style={styles.input}
        label="Email"
        onChangeText={(text) => setValue("email", text)}
      />
      <Button
        style={styles.button}
        mode="contained"
        onPress={handleSubmit(onSubmit)}
      >
        Cadastrar
      </Button>
      <Button style={styles.button} onPress={signOut}>
        Sign Out
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 16,
  },
  image: {
    marginBottom: 20,
    borderRadius: 100,
  },
  text: {
    marginBottom: 100,
    fontSize: 18,
    fontWeight: "bold",
  },
  input: {
    width: "100%",
    marginBottom: 10,
  },
  button: {
    width: 150,
    height: 65,
    marginBottom: 250,
  },
});
