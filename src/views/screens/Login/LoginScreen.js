import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Checkbox } from "react-native-paper";

export default function LoginScreen({ navigation }) {
  const [loginError, setLoginError] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);



  const handleLogin = () => {
    if (username === "admin" && password === "pass") {
      navigation.navigate("Home");
    } else {
      setLoginError(true);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Hi👋🏼</Text>
      <Text style={styles.title}>Welcome to <Text style={styles.orangeText}>Poplar Homes</Text>🏠</Text>
      {loginError && (
        <Text style={styles.errorText}>Invalid username or password</Text>
      )}
      <TextInput
        style={styles.input}
        placeholder="Username"
        onChangeText={(text) => setUsername(text)}
        value={username}
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          placeholder="Password"
          onChangeText={(text) => setPassword(text)}
          value={password}
          secureTextEntry={!showPassword}
        />
        <TouchableOpacity
          style={styles.iconContainer}
          onPress={() => setShowPassword(!showPassword)}
        >
          <Icon
            name={showPassword ? "eye" : "eye-slash"}
            size={20}
            color="#888"
          />
        </TouchableOpacity>
      </View>
      <View style={styles.checkboxContainer}>
        <View style={styles.checkboxWrapper}>
          <Checkbox
            status={rememberMe ? "checked" : "unchecked"}
            onPress={() => {
              setRememberMe(!rememberMe);
            }}
          />
          <Text style={styles.checkboxText}>Remember Me</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.forgotPasswordText}>Forgot Password</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "left",
  },
  input: {
    height: 40,
    borderColor: "#ccc",
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingLeft: 10,
  },
  passwordContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  iconContainer: {
    position: "absolute",
    right: 0,
    paddingRight: 10,
    height: "80%",
    justifyContent: "center",
  },
  button: {
    backgroundColor: "#FF7400",
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  errorText: {
    color: "red",
    marginBottom: 10,
    textAlign: "center",
  },
  checkboxContainer: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
    justifyContent: "space-between",
  },
  checkboxWrapper: {
    flexDirection: "row",
    alignItems: "center",
  },
  checkboxText: {
    marginBottom: 3,
    left: 0
  },
  forgotPasswordText: {
    color: "blue",
  },
  orangeText: {
    color: '#FF7400',
  },
});
