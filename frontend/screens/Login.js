import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { login, getUserDetails } from "../api";
import { useNavigation } from "@react-navigation/native";

export default LoginScreen = ({}) => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");

  const nextScreen = () => {
    navigation.navigate("CreateAccount");
  };

  const handEmailChange = (emailText) => {
    setEmail(emailText);
  };
  const handPasswordChange = (pass) => {
    setPassword(pass);
  };

  const handleLogin = async () => {
    try {
      const params = JSON.stringify({
        email: email,
        password: password,
      });

      //const userData = { email, password };
      const response = await login(params);
      if (response) {
        console.log(response.data);
        console.log(response.data.userId);
        console.log("Login Successfull");
        const token = response.data.token;
        const uid = response.data.userId;
        const userId = Number(uid);
        // Fetch user details with the token
        const userDetails = await getUserDetails(token, userId);
        navigation.navigate("UserProfile", { userDetails: userDetails });
      }
    } catch (error) {
      console.error("Login error:", error);
    }
  };

  return (
    <View style={styles.window}>
      <Text style={styles.login}>Login</Text>
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Text style={styles.normalText}>Email</Text>
          <TextInput
            style={styles.input}
            placeholder="email@gmail.com"
            value={email}
            onChangeText={handEmailChange}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.normalText}>Password</Text>
          <TextInput
            style={styles.input}
            secureTextEntry={true}
            value={password}
            onChangeText={handPasswordChange}
          />
        </View>
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.btnText}>Login</Text>
        </TouchableOpacity>
        <View style={styles.lastSection}>
          <Text style={styles.normalText}>New User?</Text>
          <TouchableOpacity onPress={nextScreen}>
            <Text style={[styles.normalText, { color: "red" }]}>
              Create Account
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};
const styles = StyleSheet.create({
  window: {
    flex: 1,
    backgroundColor: "#fff",
  },
  login: {
    marginTop: 100,
    textAlign: "center",
    fontSize: 24,
  },
  container: {
    marginTop: 50,
    width: 350,
    alignSelf: "center",
  },
  inputContainer: {
    gap: 20,
    marginBottom: 30,
  },
  input: {
    backgroundColor: "#F4EEEE",
    height: 50,
    borderRadius: 10,
    paddingLeft: 30,
  },
  button: {
    marginTop: 40,
    width: 200,
    height: 50,
    borderRadius: 8,
    backgroundColor: "#000",
    alignSelf: "center",
    justifyContent: "center",
  },
  btnText: {
    color: "#fff",
    textAlign: "center",
    fontSize: 20,
  },
  lastSection: {
    flexDirection: "row",
    gap: 10,
    alignSelf: "center",
    marginTop: 30,
  },
  normalText: {
    fontSize: 14,
  },
});
