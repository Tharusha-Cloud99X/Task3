import React from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { register, getUserDetails, login } from "../api";

export default CreateAccount = () => {
  const navigation = useNavigation();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [name, setName] = React.useState("");
  const [address, setAddress] = React.useState("");

  const handleNameChange = (name) => {
    setName(name);
  };
  const handleAddressChange = (address) => {
    setAddress(address);
  };
  const handEmailChange = (emailText) => {
    setEmail(emailText);
  };
  const handPasswordChange = (pass) => {
    setPassword(pass);
  };

  const handleSignUp = async () => {
    try {
      const params = JSON.stringify({
        name: name,
        address: address,
        email: email,
        password: password,
      });

      //const userData = { email, password };
      const response = await register(params);
      if (response) {
        handleLogin();
      }
    } catch (error) {
      console.error("Login error:", error);
    }
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
      <Text style={styles.login}>Create Account</Text>
      <View style={styles.container}>
        <SafeAreaView>
          <ScrollView showsVerticalScrollIndicator={false}>
            <View style={styles.inputContainer}>
              <Text style={styles.normalText}>Full Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={handleNameChange}
              />
            </View>
            <View style={styles.inputContainer}>
              <Text style={styles.normalText}>Address</Text>
              <TextInput
                style={styles.input}
                value={address}
                onChangeText={handleAddressChange}
              />
            </View>
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
            <TouchableOpacity style={styles.button} onPress={handleSignUp}>
              <Text style={styles.btnText}>Create Account</Text>
            </TouchableOpacity>
            <View style={styles.lastSection}>
              <Text style={styles.normalText}>Already Have An Account?</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Login")}>
                <Text style={[styles.normalText, { color: "red" }]}>
                  Log In
                </Text>
              </TouchableOpacity>
            </View>
          </ScrollView>
        </SafeAreaView>
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
    marginTop: 80,
    textAlign: "center",
    fontSize: 24,
  },
  container: {
    marginTop: 50,
    width: 350,
    alignSelf: "center",
  },
  inputContainer: {
    gap: 15,
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
